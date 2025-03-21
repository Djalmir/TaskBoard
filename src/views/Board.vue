<template>
	<section ref="section" @mousedown="startDragScrolling" @mousemove="dragScroll" @mouseup="stopDragScrolling" @mouseleave="stopDragScrolling">
		<List v-for="list in lists" class="boardList" :id="`list-${list._id}`" :key="list._id" :lists="lists" :list="list" @showListDropdown="showDropdown" @changeListsPositions="changeListsPositions" @updateListsPositions="updateListsPositions" @showCardModal="showCardModal(list, null)" @showCardDropdown="showDropdown" @moveCardToList="moveCardToList" />
	</section>
	<PillButton id="newListBt" @click="listModal.show()">Nova Lista</PillButton>
	<DropDown ref="dropDown" :list="dropDownList" />
	<ListModal ref="listModal" @listCreated="listCreated" @listRenamed="listRenamed" />
	<CardModal ref="cardModal" :members="[owner, ...sharedWith]" @cardCreated="cardCreated" @cardEdited="cardEdited" />
	<ProfileModal ref="profileModal" />
</template>

<script setup>
import { ref, watch, onMounted, inject, provide, computed, onBeforeUnmount, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import PillButton from '@/components/uiElements/PillButton.vue'
import DropDown from '@/components/uiElements/DropDown.vue'
import ListModal from '@/components/viewElements/Board/ListModal.vue'
import CardModal from '@/components/viewElements/Board/CardModal.vue'
import ProfileModal from '@/components/uiElements/ProfileModal.vue'
import List from '@/components/viewElements/Board/List.vue'
import taskboardApi from '@/services/taskboardApi'

const store = useStore()
const route = useRoute()
const boardId = ref(route.params.boardId)

const profileModal = ref()
provide('profileModal', profileModal)

const dropDown = ref()
const listModal = ref()
const cardModal = ref()
const message = inject('Message').value
const Dialog = inject('Dialog').value
const section = ref()

const name = ref('')
const owner = ref({})
const sharedWith = ref([])
const lists = ref([])
const dropDownList = ref([])

const dragScrolling = computed(() => store.state.board.dragScrolling)

watch(() => route.params.boardId, () => {
	boardId.value = route.params.boardId
	name.value = ''
	owner.value = {}
	sharedWith.value = []
	lists.value = []
	getBoardDetails()
})

onMounted(() => {
	getBoardDetails()
	document.addEventListener('moveCard', moveCard)
	document.addEventListener('changeCardsPositions', changeCardsPositions)
	document.addEventListener('mousemove', updateMousePosition)
})

function getBoardDetails() {
	sessionStorage.setItem('mountingBoard', true)
	taskboardApi.getBoardDetails(boardId.value)
		.then((res) => {
			name.value = res.data.board.name
			store.dispatch('setTitle', res.data.board.name)
			owner.value = res.data.board.owner
			sharedWith.value = res.data.board.sharedWith
			lists.value = res.data.lists
		})
		.finally(() => {
			sessionStorage.removeItem('mountingBoard')
		})
}

function showDropdown(target, list, card) {
	if (dropDown.value.showing) {
		dropDown.value.hide()
		if (target !== dropDown.value.target)
			return setTimeout(() => {
				showDropdown(target, list, card)
			}, 100)
		return
	}
	dropDownList.value = [
		{
			leftComponent: 'Icon',
			class: 'edit',
			size: 1.15,
			label: card ? 'Editar' : 'Renomear',
			action: () => card ? showCardModal(list, card) : listModal.value.show(list)
		},
		{
			vIf: card !== undefined,
			leftComponent: 'Icon',
			class: 'copy',
			size: 1.15,
			label: 'Duplicar',
			action: () => duplicateCard(card)
		},
		{
			leftComponent: 'Icon',
			class: 'trash',
			size: 1.15,
			label: 'Excluir',
			action: async () => {
				if (await Dialog.confirm(`Deseja mesmo excluir ${card ? 'o card' : 'a lista'} <b style='font-size: 1.2em;'>${card ? card.title : list.name}</b>?`)) {
					if (card) {
						taskboardApi.deleteCard(card._id)
							.then(() => {
								cardRemoved(card)
							})
					}
					else {
						taskboardApi.deleteList(list._id)
							.then(() => {
								listRemoved(list)
							})
					}
				}
			}
		}
	]
	nextTick(() => {
		dropDown.value.toggleShowing(target, 'right')
	})
}

function listCreated(list) {
	lists.value.push(list)
	nextTick(() => {
		section.value.scrollTo({ left: section.value.scrollWidth, behavior: 'smooth' })
	})
}

function listRenamed(list) {
	lists.value.splice(lists.value.findIndex(l => l._id === list._id), 1, list)
	nextTick(() => {
		message.show({ success: 'Lista renomeada com sucesso!' })
	})
}

function listRemoved(list) {
	lists.value.splice(lists.value.findIndex(l => l._id === list._id), 1)
	nextTick(() => {
		message.show({ success: 'Lista excluida com sucesso!' })
	})
}

function changeListsPositions(targetId) {
	let draggingList = store.state.board.draggingList
	let draggingListIndex = lists.value.findIndex(l => l._id === draggingList)
	let targetIndex = lists.value.findIndex(l => l._id === targetId)

	draggingList = lists.value.find(l => l._id == draggingList)
	if (draggingListIndex < targetIndex) {
		lists.value.splice(targetIndex + 1, 0, draggingList)
		lists.value.splice(draggingListIndex, 1)
	}
	else {
		lists.value.splice(draggingListIndex, 1)
		lists.value.splice(targetIndex, 0, draggingList)
	}
}

function updateListsPositions() {
	taskboardApi.updateBoard({
		boardId: boardId.value,
		listsOrder: lists.value.reduce((arr, curr) => {
			arr.push(curr._id)
			return arr
		}, [])
	})
}

function cardCreated(card) {
	let list = lists.value.find(l => l._id === card.list)
	list.cards.push(card)
	nextTick(() => {
		document.querySelector(`#list-${list._id} section`).scrollTo({ top: document.querySelector(`#list-${list._id} section`).scrollHeight, behavior: 'smooth' })
	})
}

function duplicateCard(card) {

	function generateBody(card) {
		let body = new FormData()
		body.append('board', boardId.value)
		body.append('list', card.list)
		body.append('title', card.title)
		body.append('description', card.description)
		body.append('todos', JSON.stringify(card.todos.map((todo) => {
			return {
				todo: todo.todo,
				done: todo.done
			}
		})))
		card.images.map((img) => {
			body.append('copyImages', JSON.stringify(img))
		})
		body.append('comments', JSON.stringify(card.comments))
		body.append('assignedTo', JSON.stringify(card.assignedTo))
		body.append('duplicateIndex', lists.value.find(l => l._id === card.list).cards.findIndex(c => c._id === card._id) + 1)
		return body
	}

	let body = generateBody(card)
	taskboardApi.createCard(body)
		.then((res) => {
			let list = lists.value.find(l => l._id === card.list)
			list.cards.splice(list.cards.findIndex(c => c._id === card._id) + 1, 0, res.data)
			dropDown.value.toggleShowing()
			nextTick(() => {
				document.querySelector(`#list-${list._id} section #card-${card._id}`).scrollIntoView({ behavior: 'smooth', block: 'center' })
			})
		})
}

function cardRemoved(card) {
	lists.value.find(l => l._id === card.list).cards.splice(lists.value.find(l => l._id === card.list).cards.findIndex(c => c._id === card._id), 1)
}

function cardEdited(card) {
	lists.value.find(l => l._id === card.list).cards.splice(lists.value.find(l => l._id === card.list).cards.findIndex(c => c._id === card._id), 1, card)
}

function startDragScrolling(e) {
	if (!store.state.board.draggingList && e.clientX)
		store.dispatch('board/setDragScrolling', {
			startX: e.clientX
		})
}

function dragScroll(e) {
	if (dragScrolling.value && !store.state.board.draggingList) {
		store.dispatch('board/setDragScrolling', {
			...store.state.board.dragScrolling,
			x: e.clientX
		})

		let diff = store.state.board.dragScrolling.x - store.state.board.dragScrolling.startX
		if (diff < 0)
			diff *= -1
		if (diff > 10) {
			section.value.scrollLeft -= store.state.board.dragScrolling.x - store.state.board.dragScrolling.startX
			store.dispatch('board/setDragScrolling', {
				...store.state.board.dragScrolling,
				startX: store.state.board.dragScrolling.x
			})
		}

	}
}

function stopDragScrolling() {
	store.dispatch('board/setDragScrolling', null)
}

const mousePosition = ref({ x: undefined, y: undefined })

function updateMousePosition(e) {
	mousePosition.value = { x: e.clientX, y: e.clientY }
}

const autoScrolling = ref(false)

watch(() => store.state.board.draggingList, (dragging) => {
	if (dragging && !autoScrolling.value) {
		autoScroll()
	}
})

watch(() => store.state.board.draggingCard, (dragging) => {
	if (dragging && !autoScrolling.value) {
		autoScroll()
	}
})

function autoScroll() {
	autoScrolling.value = true
	let halfWidth = window.innerWidth / 2
	let neutralZone = .5
	let diff = mousePosition.value.x - halfWidth
	let scrollSpeed = diff / 70
	if (diff > halfWidth * neutralZone || diff < halfWidth * -neutralZone) {
		section.value.scrollLeft += scrollSpeed
	}
	if (store.state.board.draggingList || store.state.board.draggingCard) {
		requestAnimationFrame(autoScroll)
	}
	else
		autoScrolling.value = false
}

function showCardModal(list, card) {
	cardModal.value.show(list, card)
}

let fromList, toList
function moveCardToList({ from, to }) {
	let draggingCard = lists.value.find(l => l._id == from).cards.find(c => c._id == store.state.board.draggingCard._id)
	fromList = lists.value.find(l => l._id == from)
	fromList.cards.splice(fromList.cards.findIndex(c => c._id == draggingCard._id), 1)
	fromList.cardsOrder.splice(fromList.cardsOrder.findIndex(c => c == draggingCard._id), 1)
	toList = lists.value.find(l => l._id == to)
	if (!toList.cards)
		toList.cards = []
	toList.cards.unshift(draggingCard)
}

function changeCardsPositions(e) {
	let targetId = e.detail
	let draggingCard = store.state.board.draggingCard
	let list = lists.value.find(l => l.cards.find(c => c._id == targetId))

	if (!list.cards.find(c => c._id == draggingCard._id))
		return

	fromList = list
	toList = list
	let draggingCardIndex = list.cards.findIndex(c => c._id === draggingCard._id)
	let targetIndex = list.cards.findIndex(c => c._id === targetId)

	if (draggingCardIndex < targetIndex) {
		list.cards.splice(targetIndex + 1, 0, draggingCard)
		list.cards.splice(draggingCardIndex, 1)
	}
	else {
		list.cards.splice(draggingCardIndex, 1)
		list.cards.splice(targetIndex, 0, draggingCard)
	}

	nextTick(() => {
		lists.value.filter(l => l._id != list._id && l.cards.find(c => c._id == draggingCard._id)).map(l => {
			l.cards.splice(l.cards.findIndex(c => c._id == draggingCard._id), 1)
		})
	})
}

function moveCard() {
	let draggingCard = store.state.board.draggingCard
	if (!draggingCard)
		return
	if (!toList)
		toList = lists.value.find(l => l._id == draggingCard.list)
	taskboardApi.moveCard({
		board: boardId.value,
		fromList: draggingCard.list,
		toList: toList._id,
		card: draggingCard._id,
		index: toList.cards.findIndex(c => c._id === draggingCard._id)
	})
	nextTick(() => {
		toList.cards.find(c => c._id == draggingCard._id).list = toList._id
		store.dispatch('board/setDraggingCard', null)
	})
}

onBeforeUnmount(() => {
	store.dispatch('setTitle', 'TaskBoard')
	document.removeEventListener('moveCard', moveCard)
	document.removeEventListener('changeCardsPositions', changeCardsPositions)
	document.removeEventListener('mousemove', updateMousePosition)
})
</script>

<style scoped>
#newListBt {
	position: fixed;
	top: 68px;
	right: 17px;
}

section {
	padding: 67px 133px 17px 17px;
	min-height: 100dvh;
	display: flex;
	gap: 17px;
	overflow-y: hidden;
	overflow-x: auto;
	transition: .5s;
}

section::-webkit-scrollbar {
	height: 7px;
}
</style>