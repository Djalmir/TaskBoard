<template>
	<section>
		<AuthBox @loggedIn="login" @signedUp="signup" />
	</section>
</template>

<script setup>
import { onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AuthBox from '@/components/uiElements/AuthBox.vue'
const store = useStore()
const router = useRouter()
const message = inject('Message').value

onMounted(() => {
	if (store.state.userProfile) {
		router.push({ name: 'Dashboard' })
	}
})

async function login(data, welcomeBack = true) {
	let userProfile = data
	store.dispatch('setUserProfile', userProfile)
	await router.push({ name: 'Dashboard' })
		.then(() => {
			if (welcomeBack) {
				message.show({ success: `Olá, ${ data.name.split(' ')[0] }! Que bom te ver de novo! 😊` })
			}
		})
}

function signup(data) {
	login(data, false)
		.then(() => {
			message.show({ success: `Boas vindas, ${ data.name.split(' ')[0] }! É muito bom ter você conosco! 😊` })
		})
}

</script>

<style scoped>
section {
	width: 90%;
	margin: 0 auto;
	display: grid;
	place-items: center;
	padding: 130px 17px;
	gap: 17px;
}
</style>