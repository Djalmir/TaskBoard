<template>
	<transition name="mainMenuShadowFade">
		<div id="mainMenuShadow" v-if="showing" @click="close"></div>
	</transition>
	<transition name="slideFromLeft">
		<div id="mainMenu" v-if="showing">
			<div id="mainMenuInnerWrapper">
				<nav v-if="showDefaultMenu" class="topMenu">
					<MenuItem v-for="item in topMenuItems" :vIf="item.vIf" :key="item.label" v-model="item.vModel" :image="item.image" :icon="item.icon" :label="item.label" :action="item.action" :pathName="item.pathName" :submenu="item.submenu" :style="item.style" :rightComponent="item.rightComponent" :leftIcon="item.leftIcon" :rightIcon="item.rightIcon" />
				</nav>
				<nav id="appMenu">
					<slot>
					</slot>
				</nav>
				<nav v-if="showDefaultMenu && userProfile" class="bottomMenu">
					<MenuItem v-for="item in bottomMenuItems" :vIf="item.vIf" :key="item.label" v-model="item.vModel" :image="item.image" :icon="item.icon" :label="item.label" :action="item.action" :pathName="item.pathName" :submenu="item.submenu" :style="item.style" :rightComponent="item.rightComponent" :leftIcon="item.leftIcon" :rightIcon="item.rightIcon" />
				</nav>
			</div>
		</div>
	</transition>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import MenuItem from '@/components/uiElements/MenuItem.vue'
import { dispatchEvent } from '@/utils/events.js'

const store = useStore()

const props = defineProps({
	showDefaultMenu: {
		type: Boolean,
		default: true
	}
})

const storeUserProfile = computed(() => {
	return store.state.userProfile
})
watch(storeUserProfile, () => {
	userProfile.value = storeUserProfile.value
})

const userProfile = ref(store.state.userProfile)

const storeDarkTheme = computed(() => {
	return store.state.darkTheme
})
watch(storeDarkTheme, () => {
	darkTheme.value = storeDarkTheme.value
})

const darkTheme = ref(store.state.darkTheme)
const emit = defineEmits(['toggleTheme'])

const topMenuItems = computed(() => {
	return [
		{
			vIf: userProfile.value,
			label: store.state.userProfile?.name || '',
			image: store.state.userProfile?.profilePicture || '',
			submenu: [
				{
					label: 'Perfil',
					icon: 'user',
					pathName: 'Profile'
				},
				settingsMenu
			]
		},
		{
			vIf: !userProfile.value,
			...settingsMenu
		}
	]
})

const settingsMenu = {
	label: 'Preferências',
	icon: 'sliders',
	submenu: [
		{
			label: 'Tema',
			rightComponent: 'Switch',
			leftIcon: 'moon',
			rightIcon: 'sun',
			vModel: darkTheme,
			action: () => {
				emit('toggleTheme')
			}
		}
	]
}

const bottomMenuItems = [
	{
		label: 'Sair',
		icon: 'logout',
		action: () => {
			dispatchEvent('logout')
		},
		style: {
			textAlign: 'center',
		}
	}
]

const showing = computed(() => {
	return store.state.showingMenu
})

function close() {
	if (showing.value)
		store.dispatch('toggleMenu')
}

defineExpose({
	close
})

</script>

<style scoped>
#mainMenuShadow {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: var(--dark-bg1-transparent);
	backdrop-filter: blur(5px);
	z-index: 2;
}

.light-theme #mainMenuShadow {
	background: var(--light-bg1-transparent);
}

#mainMenu {
	position: fixed;
	top: 0;
	left: 0;
	width: 90vw;
	max-width: 420px;
	height: 100lvh;
	z-index: 2;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
}

.light-theme #mainMenu {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

#mainMenuInnerWrapper {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
	pointer-events: none;
}

#appMenu {
	/* position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100dvh; */
	/* padding: 133px 7px; */
	padding: 33px 7px;
	overflow-y: auto;
	pointer-events: all;
}

.topMenu,
.bottomMenu {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	pointer-events: all;
	z-index: 1;

	padding: 54px 7px 3px;
	-webkit-mask-image: -webkit-linear-gradient(to bottom, black 85%, transparent 100%);
	-webkit-mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
	mask-image: linear-gradient(to bottom, black 85%, transparent 100%);
	backdrop-filter: blur(5px);
}

.bottomMenu {
	margin-top: auto;
	padding: 3px 7px 7px;
	mask-image: linear-gradient(to top, black 71%, transparent 100%);
}

.mainMenuShadowFade-enter-active,
.mainMenuShadowFade-leave-active {
	transition: all .3s ease;
	transition-delay: .25s;
}

.mainMenuShadowFade-enter-from,
.mainMenuShadowFade-leave-to {
	opacity: 0;
	/* backdrop-filter: blur(0px); */
}

.mainMenuShadowFade-enter-to,
.mainMenuShadowFade-leave-from {
	opacity: 1;
	/* backdrop-filter: blur(5px); */
}

.slideFromLeft-enter-active,
.slideFromLeft-leave-active {
	transition: all .3s ease;

}

.slideFromLeft-enter-from,
.slideFromLeft-leave-to {
	transform: translateX(-100%);
}
</style>