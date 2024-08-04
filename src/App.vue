<template>
	<MainMenu ref="mainMenu" @toggleTheme="changeTheme">
		<div v-if="store.state.userProfile">
			<MenuItem label="Dashboard" icon="home" pathName="Dashboard" />
			<div class="boards">
				<b v-if="boards.myBoards?.length">
					<Icon class="layout" /> - Meus TaskBoards
				</b>
				<MenuItem v-for="board in boards.myBoards" :key="board._id" :label="board.name" pathName="Board" :pathParams="{ boardId: board._id }" />
				<b v-if="boards.sharedWithMe?.length">
					<Icon class="send" /> - Compartilhados comigo
				</b>
				<MenuItem v-for="board in boards.sharedWithMe" :key="board._id" :label="board.name" pathName="Board" :pathParams="{ boardId: board._id }" />
			</div>
		</div>
	</MainMenu>
	<Header @toggleTheme="changeTheme" />
	<router-view />
	<Dialog ref="dialog" />
	<Message ref="message" />
</template>

<script setup>
import { onMounted, ref, computed, provide, onBeforeUnmount } from 'vue'
import Header from '@/components/uiElements/Header.vue'
import MainMenu from '@/components/uiElements/MainMenu.vue'
import MenuItem from '@/components/uiElements/MenuItem.vue'
import Dialog from '@/components/uiElements/Dialog.vue'
import Message from '@/components/uiElements/Message.vue'
import Icon from '@/components/uiElements/Icon.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const mainMenu = ref()
const dialog = ref()
provide('Dialog', dialog)
const message = ref()
provide('Message', message)
const prefersDark = ref(window.matchMedia("(prefers-color-scheme: dark)"))
const boards = computed(() => store.state.boards)

onMounted(() => {
	document.addEventListener('showMessage', showMessage)
	document.addEventListener('confirm', confirm)
	document.addEventListener('keydown', keyDown)
	if (!prefersDark.value.matches) {
		changeTheme()
	}
	prefersDark.value.addEventListener('change', e => {
		if (store.state.darkTheme !== e.matches) {
			changeTheme()
		}
	})
	document.addEventListener('logout', () => {
		store.dispatch('setUserProfile', null)
		router.push({ name: 'Home' })
	})

	fetch('https://api.razion.app.br/auth/access', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			app: location.host,
			user: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile'))._id : null,
			browser: navigator.userAgent,
			language: navigator.language,
			// geolocation: geolocation
		})
	})
})

function showMessage(msg) {
	message.value.show(msg.detail)
}

function changeTheme() {
	store.dispatch('toggleTheme')
	setTimeout(() => {
		if (store.state.darkTheme) {
			document.documentElement.classList.replace('light-theme', 'dark-theme')
			document.querySelector("[name=theme-color]").setAttribute("content", "#242424")
			document.querySelector("link[rel='icon']").setAttribute("href", "/logo.svg")
		}
		else {
			document.documentElement.classList.replace('dark-theme', 'light-theme')
			document.querySelector("[name=theme-color]").setAttribute("content", "#dddddd")
			document.querySelector("link[rel=icon]").setAttribute("href", "/white-logo.svg")
		}
	}, 0)
}

function keyDown(e) {
	switch (e.key) {
		case 'Escape':
			message.value?.closeAll()
			dialog.value?.close()
			mainMenu.value?.close()
			break
	}
}

onBeforeUnmount(() => {
	document.removeEventListener('showMessage', showMessage)
	document.removeEventListener('confirm', confirm)
	document.removeEventListener('keydown', keyDown)
})
</script>

<style scoped>
.boards {
	padding: 7px;
	margin: 17px 0;
}

.boards b {
	display: block;
	margin: 17px 0 7px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 5px;
	color: var(--light-font1);
	user-select: none;
}
</style>
