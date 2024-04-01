<template>
	<div :class="`menuItemWrapper ${showingSubmenu ? 'showingSubMenu' : ''}`" v-if="vIf">
		<div :class="`menuItem ${activeRoute ? 'active' : ''}`" @click="itemClick">
			<div v-if="image" class="pictureInnerWrapper">
				<Image :src="image" alt="item picture" :size="2.5" />
			</div>
			<Icon v-if="icon" :class="icon" :size="1.5" />
			<b>{{ label }}</b>
			<Icon v-if="submenu" class="chevron-down" :size="1.5" />
			<Switch v-else-if="rightComponent == 'Switch'" v-model="vModel" :leftIcon="leftIcon" :rightIcon="rightIcon" />
		</div>
		<transition name="submenuAnim">
			<div v-if="showingSubmenu" class="submenu">
				<MenuItem v-for="item in submenu" :vIf="item.vIf" :key="item.label" v-model="item.vModel" :image="item.image" :icon="item.icon" :label="item.label" :pathName="item.pathName" :pathParams="item.pathParams" :submenu="item.submenu" :style="item.style" :rightComponent="item.rightComponent" :leftIcon="item.leftIcon" :rightIcon="item.rightIcon" :action="item.action" />
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Icon from '@/components/uiElements/Icon.vue'
import Image from '@/components/uiElements/Image.vue'
import Switch from '@/components/formElements/Switch.vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
	icon: String,
	image: String,
	label: {
		type: String,
		required: true
	},
	submenu: Array,
	action: Function,
	pathName: String,
	pathParams: Object,
	rightComponent: String,
	leftIcon: String,
	rightIcon: String,
	modelValue: {
		type: [Boolean, String, Number, Object]
	},
	vIf: {
		type: [Boolean, Object],
		default: true
	}
})

const vModel = ref(props.modelValue)

const activeRoute = computed(() => {
	return route.name === props.pathName && route.params?.boardId === props.pathParams?.boardId
})

const showingSubmenu = ref(false)

const chevronRotation = computed(() => {
	return showingSubmenu.value ? '180deg' : '0deg'
})

function itemClick() {
	props.action ? props.action() : props.pathName ? router.push({ name: props.pathName, params: props.pathParams }) : props.submenu && (showingSubmenu.value = !showingSubmenu.value)
}

</script>

<style scoped>
.menuItemWrapper {
	display: flex;
	flex-direction: column;
	gap: 3px;
	margin: 3px 0;
	user-select: none;
	border-radius: .3rem;
}

.menuItemWrapper.showingSubMenu {
	/* background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1)); */
	background: #00000020;
}

.light-theme .menuItemWrapper.showingSubMenu {
	/* background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1)); */
	background: #ffffff40;
}

.menuItem {
	padding: 7px 17px;
	display: flex;
	align-items: center;
	gap: 7px;
	cursor: pointer;
	/* transition: .2s; */
	color: var(--light-font2);
	border-radius: .3em;
}


.menuItem:hover {
	background: var(--dark-bg1-transparent);
	color: var(--dark-font1);
	filter: brightness(1.1);
}

.light-theme .menuItem:hover {
	background: var(--light-bg1-transparent);
	color: var(--light-font1);
}

.menuItem:active {
	filter: brightness(.8);
}

.menuItem.active {
	background: var(--dark-bg1-transparent);
	color: var(--primary-light);
}

.light-theme .menuItem.active {
	background: var(--light-bg2-transparent);
	color: var(--primary);
}

.pictureInnerWrapper {
	border-radius: 50%;
	display: grid;
	place-items: center;
	overflow: hidden;
	box-shadow: var(--dark-box-shadow);
}

.light-theme .pictureInnerWrapper {
	box-shadow: var(--light-box-shadow);
}

.menuItem b {
	flex: 1;
}

.chevron-down {
	transition: .2s;
	transform: rotate(v-bind(chevronRotation));
}

.submenu {
	border-radius: .3rem;
	margin: 7px 0 7px 33px;
	padding: 3px;
	/* background: linear-gradient(145deg, var(--dark-bg2-transparent), var(--dark-bg1-transparent)); */
	/* box-shadow: inset 0 0 3px #00000080; */
}

/* .light-theme .submenu {
	background: linear-gradient(145deg, var(--light-bg2-transparent), var(--light-bg1-transparent));
	box-shadow: inset 0 0 3px #00000040;
} */

.submenuAnim-enter-active,
.submenuAnim-leave-active {
	transform-origin: top;
	transition: .2s;
}

.submenuAnim-enter-from,
.submenuAnim-leave-to {
	transform: scaleY(0);
}
</style>./Icon.vue./Image.vue./Icon.vue./Image.vue./Icon.vue./Image.vue./Icon.vue./Image.vue