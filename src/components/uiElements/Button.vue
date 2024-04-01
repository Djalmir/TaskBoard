<template>
	<button :disabled="loading" ref="self" :class="class" v-bind="$attrs">
		<div v-if="loading && type == 'submit'" style="display: grid; place-items: center;">
			<Icon class="loader" />
		</div>
		<slot v-else></slot>
	</button>
</template>

<script setup>
import { ref, computed } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const self = ref()
const props = defineProps({
	type: {
		type: String
	},
	class: {
		type: String,
		default: 'primary'
	}
})

const linearGradient = computed(() => {
	const styleClasses = ['primary', 'secondary', 'danger', 'success']
	let classList = props.class.split(' ')
	let className = classList.find(c => styleClasses.includes(c)) || 'primary'
	return `linear-gradient(145deg, var(--${ className }-light), var(--${ className }))`
})

const loading = ref(false)

document.addEventListener('setLoading', (e) => {
	if (props.type == 'submit' && (document.activeElement == self.value || !e.detail))
		loading.value = e.detail ? true : false
})
</script>

<style scoped>
button {
	width: fit-content;
	background: v-bind(linearGradient);
	color: var(--dark-font2);
	padding: .5rem 1rem;
	border-radius: .3rem;
	cursor: pointer;
	box-shadow: var(--dark-box-shadow);
	user-select: none;
	white-space: nowrap;
	font-weight: bold;
}

button:hover {
	filter: brightness(1.2);
	box-shadow: var(--hover-dark-box-shadow);
}

button:active {
	filter: brightness(.8);
	box-shadow: var(--inset-dark-box-shadow);
}

button:disabled {
	opacity: .5;
	cursor: not-allowed;
	pointer-events: none;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
}

.light-theme button:disabled {
	background: linear-gradient(145deg, var(--dark-bg4), var(--dark-bg2));
}

button.outline {
	background: transparent;
	color: var(--dark-font1);
}

.light-theme button.outline {
	color: var(--light-font2);
}

button.flat {
	background: transparent;
	color: var(--dark-font1);
	box-shadow: none;
}

.light-theme button.flat {
	color: var(--light-font2);
}

/* .light-theme button {
	background-color: var(--secondary);
	color: var(--dark-font1);
	box-shadow: var(--light-box-shadow);
}

.light-theme button:hover {
	filter: brightness(1.2);
	box-shadow: var(--hover-light-box-shadow);
}

.light-theme button:active {
	filter: brightness(.8);
	box-shadow: var(--inset-light-box-shadow);
} */
</style>./Icon.vue./Icon.vue./Icon.vue./Icon.vue