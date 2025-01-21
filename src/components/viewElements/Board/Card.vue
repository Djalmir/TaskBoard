<template>
	<div :id="card._id" :class="`card ${dragging ? 'dragging' : ''}`" ref="cardEl" @mousemove="card.mouseIn = true" @touchstart="card.mouseIn = true" @mouseleave="card.mouseIn = false; mouseDown = false" @mouseenter.stop.prevent="mouseEnter" @mouseup="mouseDown = false" @touchend="mouseDown = false">
		<header @mousedown.stop.prevent="startDragging" @touchstart.stop.prevent="startDragging">
			<b>{{ card.title }}</b>
			<Button v-if="!draggingCard && card.mouseIn" class="optionsBt" @mousedown.stop @touchstart.stop @click.stop="(e) => showCardDropdown(e.target, card)">
				<Icon class="more-vertical" :size="1.2" />
			</Button>
		</header>
		<hr v-if="card.description" />
		<section v-if="card.description || card.assignedTo">
			<p class="description">{{ card.description }}</p>
			<div class="assignedToListWrapper" :style="`${showingFooter ? 'bottom: 2px' : 'bottom: -22px'};`">
				<div v-for="user in card.assignedTo" :key="`${card._id}-${user._id}`">
					<Image v-if="user.profilePictureUrl" class="user" :src="user.profilePictureUrl" alt="user avatar" rounded :size="1.5" @click.stop.prevent="profileModal.show(user)" @mousedown.stop @touchstart.stop />
					<Icon v-else class="user" :size="1.5" rounded @click.stop.prevent="profileModal.show(user)" @mousedown.stop @touchstart.stop />
				</div>
			</div>
		</section>
		<footer :style="`opacity: ${showingFooter ? 1 : 0};`">
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
								<span class="legend" v-if="image.legend">
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
								<Textarea placeholder="Editar comentario" v-model="comment.text" class="commentInput" @keypress.enter.stop="(e) => editComment(e, comment)" />
								<div>
									<Button type="submit" class="commentButton" @click="editComment(null, comment)">
										<Icon class="edit" :size="1" />
									</Button>
									<Button class="secondary commentButton" @click="cancelCommentEditing(comment)">
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
								<Button class="flat actionBt" @click="startCommentEditing(comment)">
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
import { useStore } from 'vuex'
import Tabs from '@/components/uiElements/Tabs.vue'
import Carousel from '@/components/uiElements/Carousel.vue'
import Textarea from '@/components/formElements/Textarea.vue'
import Button from '@/components/uiElements/Button.vue'
import Image from '@/components/uiElements/Image.vue'
import Icon from '@/components/uiElements/Icon.vue'
import { dispatchEvent } from '@/utils/events.js'
import Todo from '@/components/viewElements/Board/Todo.vue'
import UserBadge from '@/components/uiElements/UserBadge.vue'
import taskboardApi from '@/services/taskboardApi'

const store = useStore()
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
let mouseDown = false
const showingFooter = computed(() => (!dragging.value && props.card.mouseIn) || cardTabs.value?.showingContent)
const commentBeforeEdition = ref('')

watch(dragging, () => {
	if (dragging.value) {
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

onMounted(() => {
	window.addEventListener('mouseup', stopDragging)
	window.addEventListener('touchend', stopDragging)
	if (!sessionStorage.getItem('mountingBoard')) {
		let newCard = document.getElementById(`card-${props.card._id}`)
		newCard.addEventListener('animationend', () => {
			newCard.classList.remove('createdCard')
		})
		newCard.classList.add('createdCard')
	}
})

function showCardDropdown(target, card) {
	emit('showCardDropdown', target, card.list, card)
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
	if (e.shiftKey)
		return
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

function startCommentEditing(comment) {
	comment.editing = true
	commentBeforeEdition.value = comment.text
}

function cancelCommentEditing(comment) {
	comment.text = commentBeforeEdition.value
	comment.editing = false
}

function editComment(e, comment) {
	if (e?.shiftKey)
		return
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
	mouseDown = true
	draggingTimer.value = setTimeout(() => {
		if (mouseDown) {
			listBeforeDragging.value = props.lists.find(l => l.cards.find(c => c._id == props.card._id))
			indexBeforeDragging.value = listBeforeDragging.value.cards.findIndex(c => c._id == props.card._id)
			store.dispatch('board/setDraggingCard', {
				...props.card,
				e: e
			})
			setTimeout(() => {
				drag(e)
			}, 0)
		}
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
			draggingShadow.value.style.left = `${(e.clientX || e.touches[e.touches.length - 1].clientX) - xOffset}px`
			draggingShadow.value.style.top = `${(e.clientY || e.touches[e.touches.length - 1].clientY) - yOffset}px`
		}
		catch { }
	}
}

function stopDragging() {
	if (draggingCard.value?._id == props.card._id) {
		dispatchEvent('moveCard')
	}
}

onBeforeUnmount(() => {
	window.removeEventListener('mouseup', stopDragging)
	window.removeEventListener('touchend', stopDragging)
})

</script>

<style scoped>
.card {
	border-radius: .3rem;
	margin: 7px 0 0;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	color: var(--dark-font1);
	box-shadow: var(--dark-box-shadow);
}

.light-theme .card {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	color: var(--light-font2);
	box-shadow: var(--light-box-shadow);
}

header {
	padding: 7px;
	font-weight: bold;
	position: relative;
	width: 100%;
	cursor: move;
}

header b {
	flex: 1;
	padding: 3px;
	display: block;
	width: calc(100% - 23px);
}

.optionsBt {
	border-radius: 50%;
	padding: 3px;
	display: grid;
	place-items: center;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--dark-font1);
	position: absolute;
	top: 7px;
	right: 7px;
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
	white-space: pre-wrap;
	position: relative;
}

.description {
	padding-bottom: 24px;
	overflow-wrap: break-word;
	max-height: 25vh;
	overflow: auto;
	pointer-events: all;
}

footer {
	padding: 4px;
}

ul.todosList {
	list-style: none;
	padding: 3px;
	max-height: 25vh;
	overflow: auto;
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
	place-items: center;
	position: relative;
	height: fit-content;
}

.slide {
	width: 100%;
	position: relative;
}

.slide .image {
	width: 100%;
	max-height: calc(100% - 45px);
	border-radius: .3rem;
	aspect-ratio: 16 / 9;
	object-fit: contain;
}

.legend {
	display: block;
	width: 100%;
	margin: 7px 0 0;
	text-align: center;
	max-height: 77px;
	overflow: auto;
}

.commentsTab {
	padding: 7px;
	max-height: 25vh;
	overflow: auto;
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
	position: absolute;
	right: 7px;
	display: flex;
	justify-content: flex-end;
	overflow: visible;
	margin-top: 7px;
	padding: 0 7px;
	transition: .2s;
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
	border: 1px solid var(--dark-bg4-transparent);
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

.createdCard {
	position: relative;
	overflow: hidden;
}

.createdCard:after {
	content: '';
	position: absolute;
	top: 0%;
	left: 0%;
	width: 300%;
	height: 300%;
	background: linear-gradient(145deg, transparent 30%, var(--dark-bg4) 50%, transparent 70%);
	opacity: .7;
	border-radius: .3rem;
	animation: createdCard 1.7s linear 1;
	pointer-events: none;
}

.light-theme .createdCard:after {
	background: linear-gradient(145deg, transparent 30%, var(--light-bg4) 50%, transparent 70%);
}

@keyframes createdCard {
	0% {
		transform: translate(-100%, -100%);
	}

	100% {
		transform: translate(100%, 100%);
	}
}
</style>