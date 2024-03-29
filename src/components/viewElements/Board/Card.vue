<template>
	<div :id="card._id" :class="`card ${dragging ? 'dragging' : ''}`" ref="cardEl" @mousemove="card.mouseIn = true" @mousedown.stop.prevent="startDragging" @touchstart.stop.prevent="(e) => { card.mouseIn = true; startDragging(e) }" @mouseleave="card.mouseIn = false" @mouseenter.stop.prevent="mouseEnter" @touchmove.stop.prevent="mouseEnter">
		<header>
			<b>{{ card.title }}</b>
			<Button v-if="!draggingCard && card.mouseIn" class="optionsBt" @mousedown.stop @touchstart.stop @click.stop="(e) => showCardDropdown(e.target, card)">
				<Icon class="more-vertical" :size="1.2" />
			</Button>
		</header>
		<hr v-if="card.description" />
		<section v-if="card.description || card.assignedTo">
			{{ card.description }}
			<div class="assignedToListWrapper">
				<div v-for="user in card.assignedTo" :key="`${card._id}-${user._id}`">
					<Image v-if="user.profilePictureUrl" class="user" :src="user.profilePictureUrl" alt="user avatar" rounded :size="1.5" @click.stop.prevent="profileModal.show(user)" @mousedown.stop @touchstart.stop />
					<Icon v-else class="user" :size="1.5" rounded @click.stop.prevent="profileModal.show(user)" @mousedown.stop @touchstart.stop />
				</div>
			</div>
		</section>
		<footer v-if="(!draggingCard && !draggingList && card.mouseIn) || cardTabs?.showingContent">
			<Tabs ref="cardTabs" @click.stop @mousedown.stop @touchstart.stop>
				<div v-if="card.todos?.length" tab-icon="check-square" tab-id="todosTab"><!--tab-title="Todos"-->
					<ul class="todosList">
						<Todo v-for="todo in card.todos" :key="todo" :todo="todo" @removeTodo="removeTodo(todo)" @editTodo="editTodo" /><!-- @newTodo="addTodo"-->
					</ul>
				</div>
				<div v-if="card.images?.length" tab-icon="image" tab-id="imagesTab" class="carouselTab"><!--tab-title="Imagens"-->
					<Carousel class="carousel" ref="carousel">
						<div v-for="image in card.imageUrls" :key="image" class="slideWrapper">
							<div class="slide" @mouseenter="image.mouseIn = true" @mouseleave="image.mouseIn = false">
								<img :src="image.src" alt="task image" class="image" />
								<span class="legend">
									{{ image.legend }}
								</span>
							</div>
						</div>
					</Carousel>
				</div>
				<div tab-icon="message-square" tab-id="commentsTab" class="commentsTab"><!--tab-title="Comentários"-->
					<ul class="commentsList">
						<li v-for="comment in card.comments" :key="comment" @mouseenter="comment.mouseIn = true" @mouseleave="comment.mouseIn = false">
							<UserBadge :user="comment.user" style="font-weight: bold;" />
							<div v-if="comment.editing" class="commentEditor">
								<Textarea placeholder="Editar comentario" v-model="comment.text" class="commentInput" @keypress.enter.stop="editComment(comment)" />
								<div>
									<Button type="submit" class="commentButton" @click="editComment(comment)">
										<Icon class="edit" :size="1" />
									</Button>
									<Button class="secondary commentButton" @click="comment.editing = false">
										<Icon class="x" :size="1" />
									</Button>
								</div>
							</div>
							<p v-else>
								{{ comment.text }}
							</p>
							<div class="commentActions" v-if="comment.mouseIn && comment.user._id === store.state.userProfile._id && !comment.editing">
								<Button class="flat actionBt" @click="removeComment(comment)">
									<Icon class="trash-2" :size="1.15" />
								</Button>
								<Button class="flat actionBt" @click="comment.editing = true">
									<Icon class="edit" :size="1.15" />
								</Button>
							</div>
						</li>
					</ul>
					<div class="newComment">
						<Textarea placeholder="Comentar" v-model="card.newComment" class="commentInput" @keypress.enter.stop="addComment" />
						<Button type="submit" class="flat commentButton" @click="addComment">
							<Icon class="send" :size="1" />
						</Button>
					</div>
				</div>
			</Tabs>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, watch, inject, onMounted, onBeforeUnmount } from 'vue'
import { Store, useStore } from 'vuex'
import { Tabs, Carousel, Textarea, Button, Image, Icon } from 'RazionComponents'
import { dispatchEvent } from 'RazionUtils'
import Todo from '@/components/viewElements/Board/Todo.vue'
import UserBadge from '@/components/uiElements/UserBadge.vue'
import taskboardApi from '@/services/taskboardApi'

const store = useStore()
const draggingList = computed(() => store.state.board.draggingList)
const draggingCard = computed(() => store.state.board.draggingCard)

const cardEl = ref()
const cardTabs = ref()
const carousel = ref()
const Dialog = inject('Dialog').value
const Message = inject('Message').value
const profileModal = inject('profileModal').value

const props = defineProps({
	lists: Object,
	card: Object
})
const emit = defineEmits(['showCardDropdown'])
const dragging = computed(() => store.state.board.draggingCard?._id == props.card?._id)
const draggingShadow = computed(() => store.state.board.draggingShadow)
const listBeforeDragging = ref(null)
const indexBeforeDragging = ref(null)
const draggingTimer = ref(null)
let xOffset, yOffset

watch(dragging, () => {
	if (dragging.value) {
		window.addEventListener('mouseup', stopDragging)

		let e = draggingCard.value.e

		xOffset = (e.clientX || e.touches[0].clientX) - cardEl.value.getBoundingClientRect().left
		yOffset = (e.clientY || e.touches[0].clientY) - cardEl.value.getBoundingClientRect().top

		let draggingShadow = cardEl.value.cloneNode(true)
		draggingShadow.style = cardEl.value.style
		draggingShadow.style.height = cardEl.value.offsetHeight + 'px'
		draggingShadow.style.width = cardEl.value.offsetWidth + 'px'
		draggingShadow.style.position = 'absolute'
		draggingShadow.style.pointerEvents = 'none'
		draggingShadow.style.zIndex = '100'
		document.body.appendChild(draggingShadow)
		store.dispatch('board/setDraggingShadow', draggingShadow)
		document.body.style.userSelect = 'none'
		document.body.style.cursor = 'grabbing'
		window.addEventListener('mousemove', drag)
		window.addEventListener('touchmove', drag)
	}
	else {

		if (draggingShadow.value) {
			window.removeEventListener('mouseup', stopDragging)
			draggingShadow.value.remove()
			store.dispatch('board/setDraggingShadow', null)
		}
		document.body.style.userSelect = 'auto'
		document.body.style.cursor = 'default'
		window.removeEventListener('mousemove', drag)
		window.removeEventListener('touchmove', drag)
	}
})

let mouseInTimer
watch(() => props.card.mouseIn, () => {
	clearTimeout(mouseInTimer)
	mouseInTimer = setTimeout(() => {
		props.card.mouseIn = false
	}, 3000)
})

const fullScreenCarousel = computed(() => {
	return carousel.value?.fullScreen
})
const imgFit = computed(() => {
	return carousel.value?.fullScreen ? 'contain' : 'cover'
})
const wrapperPadding = computed(() => {
	return carousel.value?.fullScreen ? '7px 77px' : '0'
})

const wrapperDisplay = ref(window.innerWidth < window.innerHeight ? 'grid' : 'auto')
const slideHeight = ref(carousel.value?.fullScreen && window.innerWidth > window.innerHeight ? 'calc(100% - 33px)' : 'unset')
const slideMargin = ref(`calc(50% - ${ slideHeight.value } / 2)`)

watch(fullScreenCarousel, () => {
	updateStyles()
})

onMounted(() => {
	window.addEventListener('resize', updateStyles)
})

function showCardDropdown(target, card) {
	emit('showCardDropdown', target, card.list, card)
}

function updateStyles() {
	if (carousel.value) {
		wrapperDisplay.value = window.innerWidth < window.innerHeight ? 'grid' : 'auto'
		slideHeight.value = carousel.value.fullScreen && window.innerWidth > window.innerHeight ? 'calc(100% - 33px)' : 'unset'
		slideMargin.value = `calc(50% - ${ slideHeight.value } / 2)`
	}
}

function editTodo() {
	taskboardApi.updateCard({
		cardId: props.card._id,
		todos: props.card.todos
	})
		.then((res) => {
			props.card.todos = res.data.todos
		})
}

async function removeTodo(todo) {
	if (await Dialog.confirm('Tem certeza que deseja remover esta tarefa?')) {
		props.card.todos.splice(props.card.todos.indexOf(todo), 1)
		editTodo()
	}
}

function addComment(e) {
	if (props.card.newComment) {
		if (!props.card.comments)
			props.card.comments = []
		props.card.comments.push({
			user: store.state.userProfile._id,
			text: props.card.newComment
		})
		taskboardApi.updateCard({
			cardId: props.card._id,
			comments: props.card.comments
		})
			.then((res) => {
				props.card.newComment = ''
				props.card.comments = res.data.comments
			})
	}
}

function editComment(comment) {
	if (!comment.text)
		return Message.show({ error: 'O comentário não pode estar vazio' })

	taskboardApi.updateCard({
		cardId: props.card._id,
		comments: props.card.comments
	})
		.then((res) => {
			comment.editing = false
			props.card.comments = res.data.comments
		})
}

async function removeComment(comment) {
	if (await Dialog.confirm(`Deseja mesmo excluir este comentário?`)) {
		props.card.comments.splice(props.card.comments.indexOf(comment), 1)
		taskboardApi.updateCard({
			cardId: props.card._id,
			comments: props.card.comments
		})
			.then((res) => {
				props.card.comments = res.data.comments
			})
	}
}

function startDragging(e) {
	clearTimeout(draggingTimer.value)
	draggingTimer.value = setTimeout(() => {
		listBeforeDragging.value = props.lists.find(l => l.cards.find(c => c._id == props.card._id))
		indexBeforeDragging.value = listBeforeDragging.value.cards.findIndex(c => c._id == props.card._id)
		store.dispatch('board/setDraggingCard', {
			...props.card,
			e: e
		})
	}, 150)
}

function mouseEnter() {
	if (draggingCard.value && draggingCard.value._id != props.card._id) {
		dispatchEvent('changeCardsPositions', props.card._id)
	}
}

function drag(e) {
	if (draggingShadow.value) {
		try {
			draggingShadow.value.style.left = `${ (e.clientX || e.touches[e.touches.length - 1].clientX) - xOffset }px`
			draggingShadow.value.style.top = `${ (e.clientY || e.touches[e.touches.length - 1].clientY) - yOffset }px`
		}
		catch {}
	}
}

function stopDragging() {
	let currentList = props.lists.find(l => l.cards.find(c => c._id == props.card._id))
	if (listBeforeDragging.value._id != currentList._id || indexBeforeDragging.value != currentList.cards.findIndex(c => c._id == props.card._id)) {
		dispatchEvent('moveCard')
	}
	else
		store.dispatch('board/setDraggingCard', null)
}

onBeforeUnmount(() => {
	window.removeEventListener('resize', updateStyles)
})

</script>

<style scoped>
.card {
	border-radius: .3rem;
	margin: 7px 0 0;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	color: var(--dark-font1);
	box-shadow: var(--dark-box-shadow);
	/* min-height: 71px; */
}

.light-theme .card {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	color: var(--light-font2);
	box-shadow: var(--light-box-shadow);
}

header {
	padding: 7px;
	font-weight: bold;
	display: flex;
	align-items: center;
}

header b {
	flex: 1;
	padding: 3px;

}

.optionsBt {
	border-radius: 50%;
	padding: 3px;
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

hr {
	border: 1px solid var(--dark-bg2);
}

.light-theme hr {
	border: 1px solid var(--light-bg2);
}

section {
	padding: 7px;
}

footer {
	padding: 4px;
}

ul.todosList {
	list-style: none;
	padding: 3px;
}

.carouselTab {
	border-radius: .3rem;
	overflow: hidden;
}

.carousel {
	margin-top: 7px;
	position: relative;
}

.slideWrapper {
	padding: v-bind(wrapperPadding);
	display: v-bind(wrapperDisplay);
	place-items: center;
	position: relative;
}

.slide {
	width: 100%;
	height: v-bind(slideHeight);
	margin-top: v-bind(slideMargin);
	position: relative;
}

.slide .image {
	width: 100%;
	max-height: calc(100% - 45px);
	border-radius: .3rem;
	aspect-ratio: 16 / 9;
	object-fit: v-bind(imgFit);
}

.legend {
	display: block;
	width: 100%;
	margin: 7px 0 0;
	text-align: center;
}

.commentsTab {
	padding: 7px;
}

.commentsList {
	list-style: none;
}

.commentsList li {
	font-size: .9rem;
	background: var(--dark-bg1-transparent);
	padding: 7px;
	border-radius: .3rem;
	margin: 0 0 7px;
	position: relative;
}

.light-theme .commentsList li {
	background: var(--light-bg1-transparent);
}

.commentsList li p {
	margin: 3px 23px;
}

.commentsList li .commentActions {
	position: absolute;
	top: 7px;
	right: 7px;
	display: flex;
	flex-direction: column;
	gap: 7px;
}

.commentEditor {
	margin: 7px 0;
	display: flex;
	flex-direction: column;
	gap: 7px;
}

.commentEditor div {
	display: flex;
	gap: 7px;
}

.commentEditor div>* {
	flex: 1;
}

.newComment {
	display: flex;
	gap: 3px;
}

.commentsTab .commentInput {
	margin: 0;
	min-width: 0;
	width: 100%;
	resize: vertical;
}

.commentButton {
	display: grid;
	place-items: center;
	padding: 3px;
	min-width: 37px;
}

.actionBt {
	cursor: pointer;
	padding: 1px;
	display: grid;
	place-items: center;
	border-radius: 0;
}

.actionBt:first-of-type,
.light-theme .actionBt:first-of-type {
	color: var(--danger-light);
}

.assignedToListWrapper {
	display: flex;
	justify-content: flex-end;
	overflow: visible;
	margin-top: 7px;
	padding: 0 7px;
}

.assignedToListWrapper>* {
	margin: 0 -7px 0 0;
	border-radius: 50%;
	transition: .2s;
	transform-origin: center;
	cursor: pointer;
	border: 1px solid var(--light-bg1-transparent);
	box-shadow: var(--dark-box-shadow);
}

.light-theme .assignedToListWrapper>* {
	border: 1px solid var(--dark-bg1-transparent);
	box-shadow: var(--light-box-shadow);
}

.assignedToListWrapper>*:hover {
	z-index: 1;
	transform: scale(1.1);
}

.dragging {
	opacity: .3;
	pointer-events: none;
}
</style>