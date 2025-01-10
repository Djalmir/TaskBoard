<template>
	<div class="tabs">
		<header ref="header">
			<nav>
				<Button v-for="selector in tabSelectors" :key="selector.id" :class="`${currentTab == selector.id ? showingContent ? 'active' : 'flat' : 'flat'} selector`" @click.stop="showTab(selector.id)" @mousedown.stop>
					<Icon v-if="selector.icon" :class="selector.icon" :size=".95"/>
					<span v-if="selector.title">{{ selector.title }}</span>
				</Button>
			</nav>
		</header>
		<transition name="growDown">
			<section ref="section" v-show="showingContent">
				<slot></slot>
			</section>
		</transition>
	</div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const header = ref()
const section = ref()
const observer = ref()
const showingContent = ref(false)

const tabSelectors = ref([])
const currentTab = ref(null)
watch(currentTab, (n, o) => {

	let oldTab = section.value.querySelector(`[tab-id=${ o }]`)
	if (oldTab) {
		oldTab.classList.remove('active')
		oldTab.style.display = 'none'
	}

	let newTab = section.value.querySelector(`[tab-id=${ n }]`)
	newTab.classList.add('active')
	newTab.style.display = 'block'
})

onMounted(() => {
	initObserver()
	setTabs()
})

function initObserver() {
	let config = {
		childList: true
	}

	observer.value = new MutationObserver(() => {
		setTabs()
	})
	observer.value.observe(section.value, config)
}

function setTabs() {
	let tabs = Array.from(section.value.querySelectorAll('[tab-id]'))
	if (!tabs.length)
		return console.error('No tabs found. Each tab must have a [tab-id] attribute.')

	tabSelectors.value = tabs.map((tab) => {
		tab.style.display = 'none'
		return {
			id: tab.getAttribute('tab-id'),
			icon: tab.getAttribute('tab-icon'),
			title: tab.getAttribute('tab-title')
		}
	})
	currentTab.value = tabSelectors.value[0].id
}

function showTab(id) {
	if (currentTab.value == id) {
		showingContent.value = !showingContent.value
	}
	else {
		currentTab.value = id
		showingContent.value = true
	}
}

defineExpose({
	showingContent
})

</script>

<style scoped>
header {
	width: 100%;
	overflow: auto;
	padding: 0 11px;
}

nav {
	display: flex;
	align-items: center;
}

nav .selector,
nav .selector:hover,
nav .selector:active {
	flex: 1;
	max-width: 240px;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 7px;
	padding: 3px 5px;
	border-radius: .5rem .5rem 0 0;
	box-shadow: none;
	color: var(--dark-font1);
	/* stroke: var(--dark-font1); */
}

.light-theme nav .selector {
	color: var(--light-font1);
	/* stroke: var(--light-font1); */
}

nav .selector.active {
	background: var(--dark-bg3-transparent);
	color: var(--primary-light);
	position: relative;
}

.light-theme nav .selector.active {
	background: var(--light-bg3-transparent);
	color: var(--primary-light);
}

nav .selector.active:before {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 50% 0;
	box-shadow: 0 5px 0 0 var(--dark-bg3-transparent);
	transform: translateX(-100%);
	pointer-events: none;
}

.light-theme nav .selector.active:before {
	box-shadow: 0 5px 0 0 var(--light-bg3-transparent);
}

nav .selector.active:after {
	content: '';
	position: absolute;
	right: 0;
	bottom: 0;
	width: .5rem;
	height: .5rem;
	border-radius: 0 0 0 50%;
	box-shadow: 0 5px 0 0 var(--dark-bg3-transparent);
	transform: translateX(100%);
	pointer-events: none;
}

.light-theme nav .selector.active:after {
	box-shadow: 0 5px 0 0 var(--light-bg3-transparent);
}

nav .selector:hover,
nav .selector.active:hover,
nav .selector:active,
nav .selector.active:active {
	color: var(--primary);
}

section {
	border-radius: .3rem;
	background: var(--dark-bg3-transparent);
}

.light-theme section {
	background: var(--light-bg3-transparent);
}

.growDown-enter-active,
.growDown-leave-active {
	transition: .1s;
	transform-origin: top;
}

.growDown-enter-from,
.growDown-leave-to {
	transform: scaleY(0);
}
</style>./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue