<template>
	<Modal ref="modal" id="cardModal" @close="close">
		<template v-slot:header>
			<b>{{ editing ? 'Editar' : 'Novo' }} Card</b>
		</template>

		<Input v-model="title" label="Título" class="input" @focus="message.closeByField('title')" @keydown.enter.stop="handleEnterKey" />

		<Textarea v-model="description" label="Descrição" class="input" style="resize: vertical;" @keydown.enter.stop="handleEnterKey" />

		<div class="todos">
			<legend v-if="todos.length">Todos</legend>
			<ul class="todosList">
				<Todo v-for="todo in todos" :key="todo" :todo="todo" @removeTodo="removeTodo" @newTodo="addTodo" />
			</ul>
			<Button @click="addTodo" class="flat addItemButton">
				<Icon class="check-square" />
				<span>Adicionar Todo</span>
			</Button>
		</div>

		<fieldset>
			<legend v-if="images.length">Imagens</legend>
			<Carousel class="carousel" ref="carousel">
				<div v-for="image in images" :key="image" class="slideWrapper">
					<div class="slide" @mouseenter="image.mouseIn = true" @mouseleave="image.mouseIn = false">
						<img :src="image.src" alt="task image" class="image" />
						<Input v-if="image.file" placeholder="Legenda" v-model="legends[image.file.name]" class="legendInput" @click.stop @keydown.stop />
						<Input v-else placeholder="Legenda" v-model="image.legend" class="legendInput" @click.stop @keydown.stop />
						<Button class="rmImgButton" @click.stop="images.splice(images.indexOf(image), 1)" v-if="image.mouseIn">
							<Icon class="trash-2" :size="1.15" />
						</Button>
					</div>
				</div>
			</Carousel>
			<input type="file" ref="filePicker" id="filePicker" accept="image/*" multiple hidden @change="addImages" />
			<Button @click="filePicker.click()" class="flat addItemButton">
				<Icon class="image" />
				<span>Adicionar Imagens</span>
			</Button>
		</fieldset>

		<Input id="searchInput" ref="searchInput" type="search" class="input" label="Atribuído a" placeholder="Nome ou email" v-model="search" autocomplete="off" />
		<DropDown :list="foundUsers" ref="dropDown" class="searchResultList" />
		<div id="assignedList">
			<UserBadge v-for="user in assignedTo" :key="user._id" :user="user" class="userBadge" @click="profileModal.show(user)" />
		</div><br />

		<legend v-if="comments.length">Comentários</legend>
		<ul class="commentsList" v-if="comments.length && !generatingBody">
			<li v-for="comment in comments" :key="comment" @mouseenter="comment.mouseIn = true" @mouseleave="comment.mouseIn = false">
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
			<Textarea placeholder="Comentar" v-model="newComment" class="commentInput" @keypress.enter.stop="addComment" />
			<Button type="submit" class="flat commentButton" @click="addComment">
				<Icon class="send" :size="1" />
			</Button>
		</div>

		<template v-slot:footer>
			<Button class="secondary" @click="close(true)">Cancelar</Button>
			<Button v-if="editing" @click="editCard">Atualizar</Button>
			<Button v-else @click="createCard">Criar</Button>
		</template>
	</Modal>
	<ProfileModal ref="profileModal">
		<Button class="danger" @click="removeAssigning">Remover</Button>
	</ProfileModal>
</template>

<script setup>
import { ref, inject, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Textarea from '@/components/formElements/Textarea.vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import DropDown from '@/components/uiElements/DropDown.vue'
import Carousel from '@/components/uiElements/Carousel.vue'
import ProfileModal from '@/components/uiElements/ProfileModal.vue'
import UserBadge from '@/components/uiElements/UserBadge.vue'
import Todo from '@/components/viewElements/Board/Todo.vue'
import taskboardApi from '@/services/taskboardApi'

const store = useStore()
const modal = ref()
const route = useRoute()
const Dialog = inject('Dialog').value
const message = inject('Message').value
const filePicker = ref(null)
const carousel = ref()
const searchInput = ref()
const dropDown = ref()
const profileModal = ref()

const boardId = computed(() => route.params.boardId)
const props = defineProps({
	members: {
		type: Array
	}
})
const list = ref(null)

const cardId = ref(null)
const title = ref('')
const description = ref('')
const todos = ref([])
const images = ref([])
const legends = ref({})
const foundUsers = ref([])
const assignedTo = ref([])
const comments = ref([])
const newComment = ref('')
const commentBeforeEdition = ref('')
const generatingBody = ref(false)

const editing = ref(false)

const emit = defineEmits(['cardCreated', 'cardEdited'])

const search = ref('')
let searchTimer
watch(search, () => {
	clearTimeout(searchTimer)
	dropDown.value.hide()
	searchTimer = setTimeout(() => {
		if (!search.value)
			return

		foundUsers.value = props.members
			.filter(u => u.name.toLowerCase().includes(search.value.toLowerCase()) || u.email.toLowerCase().includes(search.value.toLowerCase()))
			.reduce((arr, user) => {
				if (!assignedTo.value.find(u => u._id === user._id)) {
					arr.push({
						leftComponent: 'Image',
						rounded: true,
						src: user.profilePictureUrl,
						size: 2,
						alt: 'User Avatar',
						label: user.name,
						action: () => {
							assignedTo.value.push(user)
							dropDown.value.hide()
							search.value = ''
							foundUsers.value = []
						}
					})
				}
				return arr
			}, [])
		setTimeout(() => {
			if (foundUsers.value.length) {
				dropDown.value?.show(modal.value.$el.querySelector('#searchInput'), 'left')
			}
		}, 0)
	}, 500)
})

const inputWidth = computed(() => {
	return searchInput.value?.$el.offsetWidth + 'px'||0
})

function show(cardList, card) {
	list.value = cardList
	if (card) {
		const { _id, title: cardTitle, description: cardDescription, todos: cardTodos } = JSON.parse(JSON.stringify(card))
		cardId.value = _id
		title.value = cardTitle
		description.value = cardDescription || ''
		todos.value = cardTodos.map((todo) => {
			return {
				...todo,
				canEdit: true
			}
		})
		let imgs = card.images.map((img, index) => {
			return {
				...img,
				src: card.imageUrls[index].src
			}
		})
		images.value = imgs
		assignedTo.value = card.assignedTo ? JSON.parse(JSON.stringify(card.assignedTo)) : []
		comments.value = card.comments ? JSON.parse(JSON.stringify(card.comments)) : []
		editing.value = true
	}
	else
		editing.value = false
	modal.value.show()
	setTimeout(() => {
		if (images.value.length) {
			let aux = images.value
			images.value = []
			setTimeout(() => {
				images.value = aux
			}, 0)
		}
	}, 300)
}

function addTodo() {

	todos.value.push({
		todo: '',
		done: false,
		editing: true,
		canEdit: true
	})

	setTimeout(() => {
		let lastTodo = modal.value.$el.querySelector('.todosList .todo:last-child .todoInput input')
		if (lastTodo) {
			lastTodo.editing = true
			setTimeout(() => {
				lastTodo.focus()
			}, 0)
		}
	}, 0)
}

function removeTodo(todo) {
	todos.value.splice(todos.value.indexOf(todo), 1)
}

function addImages(e) {
	images.value = [...images.value, ...Array.from(e.target.files).reduce((arr, curr) => {
		if (curr.type.startsWith('image'))
			return [...arr, {
				src: URL.createObjectURL(curr),
				file: curr
			}]
	}, [])]
	e.target.value = ''
}

function removeAssigning() {
	assignedTo.value.splice(assignedTo.value.indexOf(profileModal.value.user), 1)
	profileModal.value.close()
}

function addComment(e) {
	if (e.shiftKey)
		return
	if (newComment.value) {
		comments.value.push({
			user: {
				_id: store.state.userProfile._id,
				name: store.state.userProfile.name,
				profilePicture: store.state.userProfile.profilePicture,
				profilePictureUrl: store.state.userProfile.profilePicture
			},
			text: newComment.value
		})
		newComment.value = ''
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

	comment.editing = false
}


async function removeComment(comment) {
	if (await Dialog.confirm(`Deseja mesmo excluir este comentário?`)) {
		comments.value.splice(comments.value.indexOf(comment), 1)
	}
}

function generateBody() {
	generatingBody.value = true
	let body = new FormData()
	body.append('board', boardId.value)
	body.append('list', list.value._id || list.value)
	body.append('title', title.value)
	body.append('description', description.value)
	body.append('todos', JSON.stringify(todos.value.filter((td) => td.todo).map((todo) => {
		return {
			todo: todo.todo,
			done: todo.done
		}
	})))
	images.value.map((img) => {
		if (img._id) {
			body.append('keepImages', JSON.stringify(img))
		}
		else {
			body.append('images', img.file)
			body.append('legends', legends.value[img.file.name])
		}
	})

	comments.value.map((comment) => {
		if (typeof comment.user === 'object')
			comment.user = comment.user._id
	})

	body.append('comments', JSON.stringify(comments.value))
	body.append('assignedTo', JSON.stringify(assignedTo.value))
	return body
}

function handleEnterKey(e) {
	if (e.shiftKey)
		return

	if (editing.value)
		editCard()
	else
		createCard()

	e.preventDefault()
}

function createCard() {
	if (!title.value)
		return message.show({ error: 'Por favor, insira um título para o Card' })

	let body = generateBody()

	taskboardApi.createCard(body)
		.then((res) => {
			generatingBody.value = false
			emit('cardCreated', res.data)
			close(true)
		})
}

function editCard() {
	if (!title.value)
		return message.show({ error: 'Por favor, insira um título para o Card' })

	let body = generateBody()
	body.append('cardId', cardId.value)

	taskboardApi.updateCard(body)
		.then((res) => {
			generatingBody.value = false
			emit('cardEdited', res.data)
			close(true)
		})
}

function close(clear) {
	if (clear || editing.value) {
		title.value = ''
		description.value = ''
		todos.value = []
		images.value = []
		legends.value = {}
		search.value = ''
		assignedTo.value = []
		comments.value = []
	}
	modal.value.close()
}

defineExpose({ show })

</script>

<style scoped>
b {
	font-size: 1.2rem;
	font-weight: bold;
	display: block;
}

.input {
	width: 100%;
}

ul.todosList {
	list-style: none;
	margin-top: 7px;
}

ul.todosList li {
	display: flex;
	align-items: center;
	gap: 7px;
	border-radius: .3rem;
	padding: 3px 7px;
	cursor: pointer;
}

ul.todosList li>* {
	margin: 0;
}

fieldset:has(legend) {
	margin: 17px 0 0;
}

legend {
	font-size: .9rem;
	padding-left: 7px;
	white-space: nowrap;
	font-weight: bold;
}

button.addItemButton {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 7px;
	color: var(--primary);
	margin: 7px auto;
}

.carousel {
	margin-top: 7px;
	position: relative;
}

.slideWrapper {
	place-items: center;
	position: relative;
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

.rmImgButton {
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(50%, -50%);
	padding: 7px;
	display: grid;
	place-items: center;
	z-index: 1;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--danger-light);
}

.legendInput {
	width: 100%;
	margin: 7px 0 0;
}

.light-theme .rmImgButton {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}

#searchInput {
	margin-top: 17px;
}

.searchResultList {
	width: v-bind(inputWidth);
}

#assignedList {
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

.commentsList {
	margin: 3px 0;
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

.commentInput {
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

footer {
	display: flex;
	gap: 17px;
	flex-wrap: wrap;
	margin-top: 33px;
}

footer>* {
	flex: 1;
}
</style>