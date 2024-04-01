<template>
	<Button class="pillButton" @click="action" @mouseenter="mouseIn = true" @mouseleave="mouseIn = false">
		<Icon :class="`${icon} icon`" :size="2.5" />
		<transition name="growFromRight">
			<b v-if="mouseIn" ref="b">
				<slot>{{ label }}</slot>
			</b>
		</transition>
	</Button>
</template>

<script setup>
import { ref, computed } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps({
	label: {
		type: String
	},
	action: {
		type: Function
	},
	icon: {
		type: String,
		default: 'plus'
	}
})

const mouseIn = ref(false)
const b = ref()
const labelWidth = computed(() => {
	return `${ b.value?.innerText.length || 0 }ch`
})

</script>

<style scoped>
.pillButton {
	border-radius: 5em;
	color: var(--dark-font1);
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	display: flex;
	align-items: center;
	padding: 2px;
	z-index: 1;
	font-size: 1.2rem;
	overflow: hidden;
}

.pillButton .icon {
	background: linear-gradient(145deg, var(--primary-light), var(--primary));
	color: var(--dark-font2);
	stroke: var(--dark-font2);
	border-radius: 50%;
	padding: 7px;
	box-shadow: var(--dark-box-shadow);
}

.light-theme .pillButton {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
	color: var(--light-font2);
}

.pillButton:hover {
	filter: brightness(1.2);
}

.pillButton:active {
	box-shadow: var(--inset-dark-box-shadow);
	filter: brightness(.8);
}

.pillButton b {
	transform: scale(.75);
}

.light-theme .pillButton:active {
	box-shadow: var(--inset-light-box-shadow);
}

.growFromRight-enter-active,
.growFromRight-leave-active {
	transition: .15s linear;
}

.growFromRight-enter-from,
.growFromRight-leave-to {
	width: 0;
}

.growFromRight-enter-to,
.growFromRight-leave-from {
	width: v-bind(labelWidth);
}
</style>./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue