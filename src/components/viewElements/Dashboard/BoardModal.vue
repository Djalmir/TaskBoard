<template>
	<Modal ref="modal" @close="close" @keypress.enter="() => editing ? updateBoard() : createBoard()">

		<template v-slot:header>
			<b>{{ editing ? 'Editar' : 'Novo' }} TaskBoard</b>
		</template>

		<Input class="input" label="Nome" placeholder="máx. 33 caracteres" v-model="name" maxlength="33" autocomplete="off" @focus="message.closeByField('name')" />

		<hr>

		<Input id="searchInput" type="search" class="input" label="Compartilhado com" placeholder="Email do convidado" v-model="search" autocomplete="off" />
		<span v-if="alreadyInBoard" id="alreadyInBoard">Este usuário já está nesse TaskBoard.</span>
		<span v-else-if="showInviteMsg" id="inviteMsg">Este email não está cadastrado no TaskBoard. <br /><a href="#" @click="showInviteModal">Clique aqui para enviar um convite</a>.</span>
		<DropDown :list="foundUsers" ref="dropDown" class="searchResultList" />
		<div id="sharingList">
			<UserBadge v-for="user in sharingWith" :key="user._id" :user="user" class="userBadge" @click="profileModal.show(user)" />
		</div>
		<div v-if="invitedUsers.length" id="invitedList">
			<b style="display: block; margin: 33px 0 7px; font-size: .9rem; padding-left: 7px; white-space: nowrap; font-weight: bold;">Convidados</b>
			<!-- <UserBadge v-for="user in invitedUsers" :key="user.email" :user="user" class="userBadge" @click="profileModal.show(user)" /> -->
			<div class="invited" v-for="user in invitedUsers" :key="user.email">
				<span>{{ user.name ? user.name + ' - ' : '' }} {{ user.email }}</span>
				<Button class="danger rmInvite" @click="removeInvitedUser(user)">Remover</Button>
			</div>
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
	<InviteModal ref="inviteModal" @filledInvitation="filledInvitation" />
</template>

<script setup>
import { ref, watch, computed, onMounted, onBeforeUnmount, inject } from 'vue'
import { useStore } from 'vuex'
import authApi from '@/services/authApi.js'
import taskboardApi from '@/services/taskboardApi'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import DropDown from '@/components/uiElements/DropDown.vue'
import UserBadge from '@/components/uiElements/UserBadge.vue'
import ProfileModal from '@/components/uiElements/ProfileModal.vue'
import InviteModal from '@/components/viewElements/Dashboard/InviteModal.vue'

const store = useStore()

const modal = ref()
const dropDown = ref()
const profileModal = ref()
const inviteModal = ref()
const message = inject('Message').value
const dialog = inject('Dialog').value

const editing = ref(false)
const boardId = ref('')
const name = ref('')
const sharingWith = ref([])
const invitedUsers = ref([])
const foundUsers = ref([])
const showInviteMsg = ref(false)
const search = ref('')
const alreadyInBoard = computed(() => store.state.userProfile.email == search.value || sharingWith.value.find(u => u.email == search.value))
let searchTimer
watch(search, () => {
	showInviteMsg.value = false
	clearTimeout(searchTimer)
	dropDown.value.hide()
	searchTimer = setTimeout(() => {
		if (!search.value || !isValidEmail(search.value))
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
				else
					showInviteMsg.value = true
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
		const { _id, name: boardName, sharedWith, invitedUsers: invitedList } = JSON.parse(JSON.stringify(board))
		boardId.value = _id
		name.value = boardName
		sharingWith.value = sharedWith
		invitedUsers.value = invitedList
		editing.value = true
	}
	else
		editing.value = false
	invitedUsers.value.map(u => u.invited = true)
	modal.value.show()
	setTimeout(() => {
		updateInputWidth()
	}, 300)
}

function isValidEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	return re.test(String(email).toLowerCase())
}

function showInviteModal() {
	inviteModal.value.show(search.value)
}

function filledInvitation(name, email) {
	invitedUsers.value.push({ name, email })
	search.value = ''
	setTimeout(() => {
		message.show({ success: `O quadro será compartilhado automaticamente assim que ${ name ? name : 'o(a) convidado(a)' } criar uma conta.` })
	}, 200)
}

async function removeInvitedUser(user) {
	if (await dialog.confirm('<b>Tem certeza que deseja remover este convidado?</b> <br/> Será preciso mandar um novo email para convidá-lo novamente.')) {
		invitedUsers.value.splice(invitedUsers.value.indexOf(user), 1)
	}
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
	taskboardApi.createBoard({
		name: name.value,
		sharedWith: sharingWith.value.map(u => u._id),
		invitedUsers: invitedUsers.value
	})
		.then((res) => {
			emit('boardCreated', {
				_id: res.data._id,
				name: name.value,
				sharedWith: sharingWith.value,
				invitedUsers: invitedUsers.value
			})
		})
		.then(() => {
			if (invitedUsers.value.length) {
				invitedUsers.value.map((user) => {
					if (!user.invited)
						authApi.sendInvitationEmail({ email: user.email, name: user.name })
				})
			}
		})
		.finally(() => {
			close()
		})
}

function updateBoard() {
	if (!name.value)
		return message.show({ error: 'Por favor, insira um nome para o TaskBoard', field: 'name' })
	taskboardApi.updateBoard({
		boardId: boardId.value,
		name: name.value,
		sharedWith: sharingWith.value.map(u => u._id),
		invitedUsers: invitedUsers.value
	})
		.then((res) => {
			emit('boardEdited', {
				_id: res.data._id,
				name: name.value,
				sharedWith: sharingWith.value,
				invitedUsers: invitedUsers.value
			})
		})
		.then(() => {
			if (invitedUsers.value.length) {
				invitedUsers.value.map((user) => {
					if (!user.invited)
						authApi.sendInvitationEmail({ email: user.email, name: user.name })
				})
			}
		})
		.finally(() => {
			close()
		})
}

function close() {
	boardId.value = ''
	name.value = ''
	search.value = ''
	foundUsers.value = []
	sharingWith.value = []
	invitedUsers.value = []

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

#alreadyInBoard {
	display: block;
	text-align: center;
	font-size: .85em;
	margin: -11px 0 17px 0;
	color: var(--danger);
}

#inviteMsg {
	display: block;
	text-align: center;
	font-size: .85em;
	margin: -11px 0 17px 0;
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

.invited {
	padding: 7px;
	display: flex;
	justify-content: space-between;
	border-radius: .3rem;
}

.invited:hover {
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
}

.light-theme .invited:hover {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.rmInvite {
	padding: 3px 7px;
}
</style>