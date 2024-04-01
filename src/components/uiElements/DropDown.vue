<template>
	<transition name="dropDownAnimation">
		<div v-if="showing" :class="`dropdown ${props.class}`" ref="dropdown">
			<ul>
				<li v-for="item in reducedList" @click="item.action">
					<div v-if="item.leftComponent">
						<Icon v-if="item.leftComponent == 'Icon'" :class="item.class" :size="item.size" :rounded="item.rounded" />
						<div v-else-if="item.leftComponent == 'Image'">
							<Image v-if="item.src" :src="item.src" :size="item.size" :alt="item.alt" :rounded="item.rounded" />
							<Icon v-else class="user" :size="item.size" :rounded="item.rounded" />
						</div>
						<Switch v-else-if="item.leftComponent == 'Switch'" v-model="item.vModel" :leftIcon="item.leftIcon" :rightIcon="item.rightIcon" />
					</div>
					<span style="flex: 1;">{{ item.label }}</span>
					<div v-if="item.rightComponent">
						<Icon v-if="item.rightComponent == 'Icon'" :class="item.class" :size="item.size" :rounded="item.rounded" />
						<div v-else-if="item.rightComponent == 'Image'">
							<Image v-if="item.src" :src="item.src" :size="item.size" :alt="item.alt" :rounded="item.rounded" />
							<Icon v-else class="user" :size="item.size" :rounded="item.rounded" />
						</div>
						<Switch v-else-if="item.rightComponent == 'Switch'" v-model="item.vModel" :leftIcon="item.leftIcon" :rightIcon="item.rightIcon" />
					</div>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script setup>
import { ref } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'
import Image from '@/components/uiElements/Image.vue'
import Switch from '@/components/formElements/Switch.vue'

const dropdown = ref()
const props = defineProps(['list', 'class'])
const showing = ref(false)
const target = ref(null)
const transformOrigin = ref('top left')

// const details = ref([])
const reducedList = ref([])

async function reduceList() {
	return await props.list.reduce((arr, curr) => {
		if (curr.vIf || curr.vIf === undefined) {
			// if (details.value[arr.length] && curr.action) {
			// 	let dets = details.value[arr.length]
			// 	arr.push({
			// 		...curr,
			// 		action: () => curr.action.apply(null, [dets]),
			// 	})
			// }
			// else
			arr.push(curr)
		}
		return arr
	}, [])
}

function toggleShowing(targetEl, align) {/*, det*/
	showing.value = !showing.value
	if (showing.value) {
		show(targetEl, align)/*, det*/
	}
	else {
		hide()
	}
}

async function show(targetEl, align) {/*, det*/
	// if (det)
	// 	details.value = det
	target.value = targetEl
	transformOrigin.value = `top ${ align }`
	reducedList.value = await reduceList()
	showing.value = true
	setTimeout(() => {
		updatePosition(targetEl, align)
		document.addEventListener('click', hideIfOutside)
		window.addEventListener('resize', () => updatePosition(targetEl, align))
		document.addEventListener('scroll', () => updatePosition(targetEl, align))
	}, 0)
}

function updatePosition(targetEl, align) {
	let coordinates = targetEl.getBoundingClientRect()
	if (dropdown.value) {
		dropdown.value.style.top = coordinates.y + coordinates.height + 3 + 'px'
		dropdown.value.style.left = coordinates.x - (align == 'right' ? (dropdown.value.offsetWidth - coordinates.width) : align == 'center' ? dropdown.value.offsetWidth / 2 : 0) + 'px'
	}
}

function hideIfOutside(e) {
	if (!dropdown.value?.contains(e.target)) {
		hide()
	}
}

function hide() {
	reducedList.value = []
	showing.value = false
	document.removeEventListener('click', hideIfOutside)
	window.removeEventListener('resize', updatePosition)
	document.removeEventListener('scroll', updatePosition)
}

defineExpose({ toggleShowing, show, hide, showing, target })
</script>

<style scoped>
.dropdown {
	position: fixed;
	left: -1000px;
	top: -1000px;
	/* width: 90%; */
	/* max-width: 220px; */
	min-width: 220px;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg2));
	list-style: none;
	padding: 7px 0;
	border-radius: .3rem;
	box-shadow: var(--dark-box-shadow);
	display: flex;
	flex-direction: column;
	z-index: 1;
	transition: transform .2s, opacity .2s;
	transform-origin: v-bind(transformOrigin);
}

.light-theme .dropdown {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg2));
	box-shadow: var(--light-box-shadow);
}

li {
	padding: 7px 17px;
	cursor: pointer;
	display: flex;
	gap: 7px;
	align-items: center;
	justify-content: space-between;
	color: var(--dark-font1);
	user-select: none;
}

.light-theme li {
	color: var(--light-font2);
}

li:hover {
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
}

.light-theme li:hover {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
}

li:active {
	filter: brightness(.8);
}

.dropDownAnimation-enter-from,
.dropDownAnimation-leave-to {
	opacity: 0;
	transform: scale(0);
}
</style>./Icon.vue./Image.vue./Icon.vue./Image.vue./Icon.vue./Image.vue./Icon.vue./Image.vue