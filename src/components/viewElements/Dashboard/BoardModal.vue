<template>
	<Modal ref="modal" @close="close" @keypress.enter="() => editing ? updateBoard() : createBoard()">

		<template v-slot:header>
			<b>{{ editing ? 'Editar' : 'Novo' }} TaskBoard</b>
		</template>

		<Input class="input" label="Nome" v-model="name" autocomplete="off" @focus="message.closeByField('name')" />

		<hr>

		<Input id="searchInput" type="search" class="input" label="Compartilhado com" placeholder="Nome ou email" v-model="search" autocomplete="off" />
		<DropDown :list="foundUsers" ref="dropDown" class="searchResultList" />
		<div id="sharingList">
			<UserBadge v-for="user in sharingWith" :key="user._id" :user="user" class="userBadge" @click="profileModal.show(user)" />
		</div>

		<template v-slot:footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button v-if="editing" type="submit" @click="updateBoard">Atualizar</Button>
			<Button v-else type="submit" @click="createBoard">Criar</Button>
		</template>

	</Modal>
	<ProfileModal ref="profileModal">
		<Button class="danger" @click="removeSharing">Remover</Button>
	</ProfileModal>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount, inject } from 'vue'
import { useStore } from 'vuex'
import { authApi } from 'RazionServices'
import taskboardApi from '@/services/taskboardApi'
import { Modal, Input, Button, DropDown } from 'RazionComponents'
import UserBadge from '@/components/uiElements/UserBadge.vue'
import ProfileModal from '@/components/uiElements/ProfileModal.vue'

const store = useStore()

const modal = ref()
const dropDown = ref()
const profileModal = ref()
const message = inject('Message').value

const editing = ref(false)
const boardId = ref('')
const name = ref('')
const sharingWith = ref([])
const foundUsers = ref([])
const search = ref('')
let searchTimer
watch(search, () => {
	clearTimeout(searchTimer)
	dropDown.value.hide()
	searchTimer = setTimeout(() => {
		if (!search.value)
			return
		authApi.searchProfile({ search: search.value })
			.then((res) => {
				foundUsers.value = res.data.reduce((arr, user) => {
					if (user._id !== store.state.userProfile._id && !sharingWith.value.find(u => u._id === user._id)) {
						arr.push(
							{
								leftComponent: 'Image',
								rounded: true,
								src: user.profilePictureUrl,
								size: 2,
								alt: 'User Avatar',
								label: user.name,
								action: () => {
									sharingWith.value.push(user)
									dropDown.value.hide()
									search.value = ''
									foundUsers.value = []
								}
							},
						)
					}
					return arr
				}, [])
			})
			.then(() => {
				if (foundUsers.value.length) {
					dropDown.value?.show(document.querySelector('#searchInput'), 'left')
				}
			})
	}, 500)
})

const inputWidth = ref(0)

const emit = defineEmits(['boardCreated', 'boardEdited'])

onMounted(() => {
	window.addEventListener('resize', updateInputWidth)
})

function show(board) {
	if (board) {
		const { _id, name: boardName, sharedWith } = JSON.parse(JSON.stringify(board))
		boardId.value = _id
		name.value = boardName
		sharingWith.value = sharedWith
		editing.value = true
	}
	else
		editing.value = false
	modal.value.show()
	setTimeout(() => {
		updateInputWidth()
	}, 300)
}

function updateInputWidth() {
	const input = document.querySelector('#searchInput')
	if (input) {
		inputWidth.value = input.getBoundingClientRect().width + 'px'
	}
}

function removeSharing() {
	sharingWith.value.splice(sharingWith.value.indexOf(profileModal.value.user), 1)
	profileModal.value.close()
}

function createBoard() {
	if (!name.value)
		return message.show({ error: 'Por favor, insira um nome para o TaskBoard', field: 'name' })
	taskboardApi.createBoard({ name: name.value, sharedWith: sharingWith.value.map(u => u._id) })
		.then((res) => {
			emit('boardCreated', {
				_id: res.data._id,
				name: name.value,
				sharedWith: sharingWith.value
			})
			close()
		})
}

function updateBoard() {
	if (!name.value)
		return message.show({ error: 'Por favor, insira um nome para o TaskBoard', field: 'name' })
	taskboardApi.updateBoard({ boardId: boardId.value, name: name.value, sharedWith: sharingWith.value.map(u => u._id) })
		.then((res) => {
			emit('boardEdited', {
				_id: res.data._id,
				name: name.value,
				sharedWith: sharingWith.value
			})
			close()
		})
}

function close() {
	boardId.value = ''
	name.value = ''
	sharingWith.value = []
	foundUsers.value = []
	search.value = ''

	dropDown.value?.hide()

	modal.value.close()
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateInputWidth)
})

defineExpose({
	show
})

</script>

<style scoped>
b {
	font-size: 1.2rem;
	font-weight: bold;
}

.input {
	width: 100%;
}

.searchResultList {
	width: v-bind(inputWidth);
}

#sharingList {
	display: flex;
	justify-content: space-evenly;
	gap: 7px;
	flex-wrap: wrap;
	margin: 7px 7px 17px;
}

.userBadge {
	flex: 1;
	padding: 7px;
	border-radius: .3rem;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	cursor: pointer;
	min-width: 193px;
}

.light-theme .userBadge {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.userBadge:hover {
	filter: brightness(1.2);
}

.userBadge:active {
	filter: brightness(0.9);
	box-shadow: var(--inset-dark-box-shadow);
}

.light-theme .userBadge:active {
	box-shadow: var(--inset-light-box-shadow);
}
</style>