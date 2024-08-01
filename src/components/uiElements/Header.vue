<template>
	<div id="appHeader">
		<div id="mainMenuBtWrapper" :class="showingMenu ? 'active' : ''">
			<Button id="mainMenuBt" @click="toggleMenu">
				<svg id="menuSVG" ref="menuSVG" viewBox="0 0 32 32">
					<g style="stroke-width:6; stroke-linecap:round;">
						<line x1="3" y1="3" x2="29" y2="3">
							<animate class="showAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="3" to="18" dur=".3s" fill="freeze" />
							<animate class="showAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="3" to="13" dur=".3s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="10" to="3" dur=".3s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="13" to="3" dur=".3s" fill="freeze" />
						</line>
						<line x1="3" y1="13" x2="29" y2="13" />
						<line x1="3" y1="23" x2="29" y2="23">
							<animate class="showAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="3" to="18" dur=".3s" fill="freeze" />
							<animate class="showAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="23" to="13" dur=".3s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="10" to="3" dur=".3s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="13" to="23" dur=".3s" fill="freeze" />
						</line>
					</g>
				</svg>
			</Button>
		</div>
		<header>
			<h1>{{ title }}</h1>
			<transition name="fade">
				<Icon v-if="loading" class="settings loader" :size="2" />
			</transition>
			<div style="margin-left: auto; display: flex; gap: 17px">
				<Button class="headerBt" @click="e => { dropdown.toggleShowing(e.target, 'right') }">
					<Icon class="more-vertical" :size="1.25" style="pointer-events: none;" />
				</Button>
			</div>
		</header>
	</div>
	<DropDown :list="dropdownList" ref="dropdown" style="z-index:4" />
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from 'vuex'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'
import DropDown from '@/components/uiElements/DropDown.vue'
import { dispatchEvent } from '@/utils/events.js'

const store = useStore()
const userProfile = computed(() => { return store.state.userProfile })

const title = computed(() => store.state.title)
const loading = ref(false)

const storeDarkTheme = computed(() => {
	return store.state.darkTheme
})
watch(storeDarkTheme, () => {
	darkTheme.value = storeDarkTheme.value
})

const darkTheme = ref(store.state.darkTheme)
const emit = defineEmits(['toggleTheme'])

const menuSVG = ref()
const dropdown = ref()
const dropdownList = ref([
	{
		label: 'Tema',
		rightComponent: 'Switch',
		leftIcon: 'moon',
		rightIcon: 'sun',
		vModel: darkTheme,
		action: () => {
			emit('toggleTheme')
		}
	},
	{
		vIf: userProfile,
		label: 'Sair',
		rightComponent: 'Icon',
		class: 'logout',
		size: 1.25,
		action: () => {
			dispatchEvent('logout')
			document.body.click()
		}
	}
])

const showingMenu = computed(() => {
	return store.state.showingMenu
})
watch(showingMenu, () => {
	if (showingMenu.value) {
		setTimeout(() => {
			let animationElements = Array.from(document.querySelectorAll('.showAnimation'))
			animationElements.map((element) => {
				element.beginElement()
			})
			menuSVG.value.style.transform = "rotateZ(180deg)"
		}, 0)
	}
	else {
		setTimeout(() => {
			let animationElements = Array.from(document.querySelectorAll('.hideAnimation'))
			animationElements.map((element) => {
				element.beginElement()
			})
			menuSVG.value.style.transform = "rotateZ(0deg)"
		}, 0)
	}
})

const headerPadding = computed(() => {
	return showingMenu.value ? '7px 17px' : '7px 17px 7px 0'
})

const headerTransition = computed(() => {
	return showingMenu.value ? '0' : '.3s ease-in'
})

onMounted(() => {
	document.addEventListener('setLoading', setLoading)
})

function setLoading(e) {
	loading.value = e.detail
}

function toggleMenu() {
	store.dispatch('toggleMenu')
}

onBeforeUnmount(() => {
	document.removeEventListener('setLoading', setLoading)
})

</script>

<style scoped>
#appHeader {
	display: flex;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg2-transparent));
	backdrop-filter: blur(5px);
	box-shadow: var(--dark-box-shadow);
	z-index: 2;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
}

.light-theme #appHeader {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg2-transparent));
	box-shadow: var(--light-box-shadow);
}


#mainMenuBtWrapper {
	display: flex;
	justify-content: flex-end;
	width: 51px;
	max-width: 420px;
	transition: .3s ease;
}

#mainMenuBtWrapper.active {
	width: 90vw;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg2));
	box-shadow: 1px 0 2px #00000080;
}

.light-theme #mainMenuBtWrapper.active {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg2));
}

#mainMenuBt {
	display: grid;
	place-items: center;
	background: transparent;
	color: var(--light-font2);
	stroke: var(--light-font2);
	box-shadow: none;
	transition: .2s;
}

#mainMenuBt:active {
	transform: scale(.8);
}

#menuSVG {
	width: 17px;
	height: 17px;
	transition: .4s;
}

header {
	width: 100%;
	padding: v-bind(headerPadding);
	display: flex;
	align-items: center;
	gap: 7px;
	transition: v-bind(headerTransition);
}

h1 {
	font-size: 1.5rem;
	margin: 0;
	background: linear-gradient(to bottom, var(--light-bg1)0%, var(--dark-bg4)95%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	filter: drop-shadow(1px 1px 0 var(--dark-bg1));
	user-select: none;
	white-space: nowrap;
	max-width: calc(100vw - 85px);
	overflow: auto;
}

.light-theme h1 {
	background: linear-gradient(to bottom, var(--dark-bg4)0%, var(--light-bg1)95%);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	filter: drop-shadow(1px 1px 0 var(--dark-bg4));
}

.headerBt {
	border-radius: 50%;
	width: 32px;
	height: 32px;
	display: grid;
	place-items: center;
	padding: 0;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg2));
}

.light-theme .headerBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg2));
	color: var(--light-font2);
}

.loader {
	color: var(--primary);
	background: radial-gradient(circle at center, var(--dark-bg1) 40%, var(--primary) 100%);
	border-radius: 50%;
	padding: 3px;
	position: absolute;
	top: 7px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 99999;
	box-shadow: 0 0 2px 1px #00000080;
}

.light-theme .loader {
	background: radial-gradient(circle at center, var(--light-bg1) 40%, var(--primary) 100%);
	box-shadow: 0 0 2px 1px #00000040;
}
</style>