<template>
	<div :id="list._id" :class="`list ${dragging ? 'dragging' : ''}`" ref="listEl" @mousedown.stop.prevent="startDragging" @touchstart.stop.prevent="startDragging" @mouseup="mouseDown = false" @touchend="mouseDown = false">
		<header>
			<b>{{ list.name }}</b>
			<Button class="optionsBt" @mousedown.stop @touchstart.stop @click.stop="(e) => showListDropdown(e.target, list)">
				<Icon class="more-vertical" :size="1.5" />
			</Button>
		</header>
		<section>
			<div class="cardsWrapper" ref="cardsWrapper">
				<Card v-for="card in list.cards" :key="card._id" :lists="lists" :card="card" @showCardDropdown="showCardDropdown" />
			</div>
		</section>
		<footer>
			<Button class="addCardBt" @mousedown.stop @touchstart.stop @click.stop="$emit('showCardModal')">
				<Icon class="plus" :size="1.7" />
				<span>Novo Card</span>
			</Button>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Card from '@/components/viewElements/Board/Card.vue'

const store = useStore()
const draggingList = computed(() => store.state.board.draggingList)
const draggingCard = computed(() => store.state.board.draggingCard)

const listEl = ref()

const props = defineProps({
	lists: Object,
	list: Object
})
const emit = defineEmits(['showListDropdown', 'showCardDropdown', 'showCardModal', 'changeListsPositions', 'updateListsPositions', 'moveCardToList'])

const dragging = ref(false)
const draggingShadow = ref(null)
const indexBeforeDragging = ref(null)
const draggingTimer = ref(null)
let xOffset, yOffset
let mouseDown = false

watch(dragging, () => {
	store.dispatch('board/setDraggingList', dragging.value?._id)
	if (dragging.value) {
		window.addEventListener('mouseup', stopDragging)
		window.addEventListener('touchend', stopDragging)

		let e = dragging.value.e
		let boundings = listEl.value.getBoundingClientRect()

		xOffset = (e.clientX || e.touches[0].clientX) - boundings.left
		yOffset = (e.clientY || e.touches[0].clientY) - boundings.top

		draggingShadow.value = listEl.value.cloneNode(true)
		draggingShadow.value.style = listEl.value.style
		draggingShadow.value.style.height = listEl.value.offsetHeight + 'px'
		draggingShadow.value.style.position = 'absolute'
		draggingShadow.value.style.pointerEvents = 'none'
		draggingShadow.value.style.zIndex = '100'
		document.body.appendChild(draggingShadow.value)
		document.body.style.userSelect = 'none'
		document.body.style.cursor = 'grabbing'

	}
	else {
		window.removeEventListener('mouseup', stopDragging)
		window.removeEventListener('touchend', stopDragging)

		if (draggingShadow.value)
			draggingShadow.value.remove()
		document.body.style.userSelect = 'auto'
		document.body.style.cursor = 'default'
	}
})

const cardsWrapper = ref()

const listHeight = ref(cardsWrapper.value ? cardsWrapper.value.offsetHeight + 123 + 'px' : 0)
const observer = ref()

onMounted(() => {
	initObserver()
	listHeight.value = cardsWrapper.value ? cardsWrapper.value.offsetHeight + 123 + 'px' : 0
	window.addEventListener('mousemove', drag)
	window.addEventListener('touchmove', drag)
})

function initObserver() {
	let config = {
		childList: true,
		subtree: true,
		attributes: true,
	}

	observer.value = new MutationObserver(() => {
		listHeight.value = cardsWrapper.value ? cardsWrapper.value.offsetHeight + 123 + 'px' : 0
	})

	observer.value.observe(listEl.value, config)
}

function showListDropdown(target, list) {
	emit('showListDropdown', target, list)
}

function showCardDropdown(a, b, c) {
	emit('showCardDropdown', a, b, c)
}

function startDragging(e) {
	clearTimeout(draggingTimer.value)
	mouseDown = true
	draggingTimer.value = setTimeout(() => {
		if (mouseDown) {
			if (e.button == 0 || e.touches) {
				indexBeforeDragging.value = props.lists.findIndex(l => l._id === props.list._id)
				dragging.value = { _id: props.list._id, e }
			}
		}
	}, 150)
}

function stopDragging() {
	if (indexBeforeDragging.value != props.lists.findIndex(l => l._id === props.list._id))
		emit('updateListsPositions')
	setTimeout(() => {
		dragging.value = false
	}, 0)
}

function mouseEnter() {
	if (draggingList.value && draggingList.value != props.list._id) {
		emit('changeListsPositions', props.list._id)
	}
	if (draggingCard.value && !props.list.cards.find(c => c._id == draggingCard.value._id)) {
		emit('moveCardToList', {
			from: props.lists.find(l => l.cards.find(c => c._id == draggingCard.value._id))._id,
			to: props.list._id
		})
	}
}

function drag(e) {
	if (draggingList.value || draggingCard.value) {
		if (draggingList.value == listEl.value.id) {
			try {
				draggingShadow.value.style.left = `${ (e.clientX || e.touches[e.touches.length - 1].clientX) - xOffset }px`
				draggingShadow.value.style.top = `${ (e.clientY || e.touches[e.touches.length - 1].clientY) - yOffset }px`
			}
			catch {}
		}
		else {
			let elementsFromPoint = e.touches?.length ? document.elementsFromPoint(e.touches[e.touches.length - 1].clientX, e.touches[e.touches.length - 1].clientY) : document.elementsFromPoint(e.clientX, e.clientY)
			if (elementsFromPoint.find(el => el.id == listEl.value.id)) {
				mouseEnter()
			}
		}
	}
}

onBeforeUnmount(() => {
	observer.value?.disconnect()
	window.removeEventListener('mousemove', drag)
	window.removeEventListener('touchmove', drag)
})

</script>

<style scoped>
.list {
	border-radius: .3rem;
	width: 260px;
	min-width: 260px;
	height: v-bind(listHeight);
	min-height: 117px;
	max-height: calc(100dvh - 95px);
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg2));
	box-shadow: var(--dark-box-shadow);
	user-select: none;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
	position: relative;
}

.light-theme .list {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg2));
	box-shadow: var(--light-box-shadow);
	color: var(--light-font2);
}

.list header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 7px;
	position: sticky;
	top: 0;
	left: 0;
	width: 100%;
	padding: 7px;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg1-transparent));
	box-shadow: var(--light-box-shadow);
	backdrop-filter: blur(5px);
	z-index: 1;
}

.light-theme .list header {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg1-transparent));
}

.list header b {
	flex: 1;
	padding: 0 7px;
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

section {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	max-height: 100%;
	margin: 7px 0 17px;
	padding: 48px 7px 67px;
	overflow: auto;
}

footer {
	position: sticky;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 7px;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg1-transparent));
	box-shadow: var(--dark-box-shadow);
	backdrop-filter: blur(5px);
	z-index: 1;
}

.light-theme footer {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg1-transparent));
	box-shadow: var(--light-box-shadow);
}

.addCardBt {
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	color: var(--dark-font1);
	border-radius: .3rem;
	width: 100%;

	position: relative;
	display: flex;
	align-items: center;
	/* gap: 7px; */
	padding: 0;
	overflow: hidden;
}

.light-theme .addCardBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	color: var(--light-font2);
}

.addCardBt .plus {
	background: linear-gradient(145deg, var(--primary-light), var(--primary));
	color: var(--light-font1);
	stroke: var(--light-font1);
	border-radius: .3rem 0 0 .3rem;
	/* box-shadow: inherit; */
	/* position: absolute;
	top: 0;
	left: 0;
	width: 35px;
	height: 100%; */
	padding: 3px;
}

.addCardBt:active .plus {
	box-shadow: inherit;
}

.light-theme .addCardBt .plus {
	color: var(--dark-font2);
	stroke: var(--dark-font2);
}

.addCardBt span {
	flex: 1;
	font-size: .9rem;
	text-align: center;
}

.addCardBt>* {
	pointer-events: none;
}

.dragging {
	opacity: .3;
	pointer-events: none;
}
</style>