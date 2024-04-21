<template>
	<PillButton id="newBoardBt" :action="() => boardModal.show()">Novo TaskBoard</PillButton>
	<section>
		<div class="my-boards" v-if="myBoards.length">
			<h2>
				<Icon class="layout" :size="2" /> - Meus TaskBoards
			</h2>
			<div class="boards">
				<div v-for="board in myBoards" :key="board._id">
					<router-link :to="{ name: 'Board', params: { boardId: board._id } }" class="board">
						<div class="boardHeader">
							<b style="flex: 1;">{{ board.name }}</b>
						</div>
						<div v-if="board.sharedWith?.length" class="sharingList">
							<span>Compartilhado com:</span>
							<!-- <UserBadge v-for="user in board.sharedWith" :key="`${board._id}-${user._id}`" :user="user" /> -->
							<div class="sharingListWrapper">
								<div v-for="user in board.sharedWith" :key="`${board._id}-${user._id}`">
									<Image v-if="user.profilePictureUrl" class="user" :src="user.profilePictureUrl" alt="user avatar" rounded :size="2.25" @click.prevent="profileModal.show(user)" />
									<Icon v-else class="user" :size="2.5" rounded @click.prevent="profileModal.show(user)" />
								</div>
							</div>
						</div>
					</router-link>
					<Button class="optionsBt" @click.prevent="(e) => showDropdown(e.target, board)"><!--@click.prevent="(e) => dropDown.toggleShowing(e.target, 'right', [board, board])"-->
						<Icon class="more-vertical" :size="1.5" />
					</Button>
				</div>
			</div>
		</div>

		<div class="shared-boards" v-if="sharedWithMe.length">
			<h2>
				<Icon class="send" :size="2" /> - Compartilhados comigo
			</h2>
			<div class="boards">
				<div v-for="board in sharedWithMe" :key="board._id">
					<router-link :to="{ name: 'Board', params: { boardId: board._id } }" class="board">
						<div class="boardHeader">
							<b style="flex: 1;">{{ board.name }}</b>
							<Image v-if="board.owner.profilePictureUrl" class="user" :src="board.owner.profilePictureUrl" alt="user avatar" rounded :size="2.5" @click.prevent="profileModal.show(board.owner)" />
							<Icon v-else class="user" :size="2.5" rounded @click.prevent="profileModal.show(board.owner)" />
						</div>
						<div v-if="board.sharedWith?.filter(user => user._id !== store.state.userProfile?._id).length" class="sharingList">
							<span>Compartilhado com:</span>
							<!-- <UserBadge v-for="user in board.sharedWith" :key="`${board._id}-${user._id}`" :user="user" /> -->
							<div class="sharingListWrapper">
								<div v-for=" user in board.sharedWith.filter(user => user.id !== store.state.userProfile?._id) " :key="`${board._id}-${user._id}`">
									<Image v-if="user.profilePictureUrl" class="user" :src="user.profilePictureUrl" alt="user avatar" rounded :size="2.25" @click.prevent="profileModal.show(user)" />
									<Icon v-else class="user" :size="2" @click.prevent="profileModal.show(user)" />
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</div>
		</div>
	</section>
	<BoardModal ref="boardModal" @boardCreated="boardCreated" @boardEdited="boardEdited" />
	<ProfileModal ref="profileModal" />
	<DropDown ref="dropDown" :list="boardsDropdownList" />
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import taskboardApi from '@/services/taskboardApi'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Image from '@/components/uiElements/Image.vue'
import DropDown from '@/components/uiElements/DropDown.vue'
import PillButton from '@/components/uiElements/PillButton.vue'
import ProfileModal from '@/components/uiElements/ProfileModal.vue'
import BoardModal from '@/components/viewElements/Dashboard/BoardModal.vue'

const store = useStore()
const Dialog = inject('Dialog').value
const message = inject('Message').value

const boardModal = ref()
const profileModal = ref()
const dropDown = ref()

const myBoards = ref([])
const boardsDropdownList = ref([])
const sharedWithMe = ref([])

onMounted(() => {
	taskboardApi.listBoards()
		.then((res) => {
			myBoards.value = res.data.myBoards
			sharedWithMe.value = res.data.sharedBoards
			updateStoreBoards()
		})
})

function updateStoreBoards() {
	store.dispatch('setBoards', {
		myBoards: myBoards.value,
		sharedWithMe: sharedWithMe.value
	})
}

function showDropdown(target, board) {
	if (dropDown.value.showing) {
		dropDown.value.hide()
		if (target !== dropDown.value.target)
			return setTimeout(() => {
				showDropdown(target, board)
			}, 200)
		return
	}
	boardsDropdownList.value = [
		{
			leftComponent: 'Icon',
			class: 'edit',
			size: 1.15,
			label: 'Editar',
			action: () => boardModal.value.show(board)
		},
		{
			leftComponent: 'Icon',
			class: 'trash',
			size: 1.15,
			label: 'Excluir',
			action: async () => {
				if (await Dialog.confirm(`Deseja mesmo excluir o TaskBoard <b style='font-size: 1.2em;'>${ board.name }</b>?`)) {
					taskboardApi.deleteBoard(board._id)
						.then(() => {
							boardRemoved(board)
						})
				}
			}
		}
	]
	setTimeout(() => {
		dropDown.value.toggleShowing(target, 'right')
	}, 0)
}

function boardCreated(board) {
	myBoards.value.push(board)
	setTimeout(() => {
		updateStoreBoards()
	}, 0)
}

function boardEdited(board) {
	myBoards.value.splice(myBoards.value.findIndex(b => b._id === board._id), 1, board)
	setTimeout(() => {
		message.show({ success: 'Edições salvas com sucesso!' })
		updateStoreBoards()
	}, 0)
}

function boardRemoved(board) {
	myBoards.value.splice(myBoards.value.findIndex(b => b._id === board._id), 1)
	setTimeout(() => {
		message.show({ success: 'TaskBoard excluido com sucesso!' })
		updateStoreBoards()
	}, 0)
}

</script>

<style scoped>
#newBoardBt {
	position: fixed;
	top: 68px;
	right: 17px;
}

section {
	padding: 130px 0;
	min-height: 100dvh;
	display: flex;
	flex-direction: column;
	gap: 71px;
	align-items: center;
	overflow-y: auto;
}

.my-boards,
.shared-boards {
	width: 90vw;
	max-width: 970px;
}

h2 {
	display: flex;
	align-items: center;
	gap: 5px;
	margin: 7px 7px 17px;
}

.boards {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 17px;
	padding-bottom: 3px;
}

.boards>div {
	position: relative;
	display: flex;
}

.board {
	flex: 1;
	padding: 7px;
	height: 141px;
	border-radius: .3rem;
	text-decoration: none;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	color: var(--dark-font2);
	overflow: hidden;
}

.light-theme .board {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
	color: var(--light-font2);
}

.board:hover {
	filter: brightness(1.2);
}

.board:active {
	filter: brightness(0.9);
	box-shadow: var(--inset-dark-box-shadow);
}

.light-theme .board:active {
	box-shadow: var(--inset-light-box-shadow);
}

.boardHeader {
	display: flex;
	align-items: center;
	gap: 7px;
	flex-wrap: wrap;
}

.board b {
	display: block;
	margin: 7px;
	max-width: calc(100% - 48px);
}

.optionsBt {
	position: absolute;
	top: 7px;
	right: 7px;
	border-radius: 50%;
	padding: 5px;
	display: grid;
	place-items: center;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--dark-font1);
}

.light-theme .optionsBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	color: var(--light-font2);
}

.optionsBt>* {
	pointer-events: none;
}

.sharingList {
	border-top: 2px solid var(--dark-bg2);
	/* margin: 17px 0 0; */
	padding: 7px;
	position: absolute;
	width: 100%;
	bottom: 0;
	left: 0;
}

.light-theme .sharingList {
	border-top: 2px solid var(--light-bg1);
}

.user {
	box-shadow: var(--dark-box-shadow);
	margin: 0;
}

.light-theme .user {
	box-shadow: var(--light-box-shadow);
}

.sharingList>span {
	display: block;
	font-size: .9rem;
	color: var(--dark-font1);
}

.light-theme .sharingList>span {
	color: var(--light-font1);
}

.sharingListWrapper {
	display: flex;
	overflow: auto;
	padding: 9px;
}

.sharingListWrapper>* {
	margin-right: -7px;
	transition: .2s;
	border-radius: 50%;
	border: 1px solid var(--light-bg1-transparent);
	box-shadow: var(--dark-box-shadow);
}

.light-theme .sharingListWrapper>* {
	border: 1px solid var(--dark-bg4-transparent);
	box-shadow: var(--light-box-shadow);
}

.sharingListWrapper>*:hover {
	transform: scale(1.1);
	z-index: 1;
}
</style>