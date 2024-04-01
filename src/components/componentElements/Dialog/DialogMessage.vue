<template>
	<div class="messageDialog" @focus="confirmBtFocus" @keydown.escape="$emit('close')">
		<Button class="closeBt" @click="$emit('close')">
			<Icon class="x" :size="1.5" />
		</Button>
		<section ref="messageSection"></section>
		<footer>
			<Button class="confirmBt" @click="$emit('close')">Ok</Button>
		</footer>
	</div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps(['message', 'success', 'error'])
const msg = computed(() => {
	return props.message
})
const messageSection = ref()
watch(msg, () => {
	messageSection.value.innerHTML = msg.value
})

onMounted(() => {
	messageSection.value.innerHTML = msg.value
})

function confirmBtFocus() {
	document.querySelector('.confirmBt').focus()
}
</script>

<style scoped>
.messageDialog {
	width: 90%;
	max-width: 480px;
	height: fit-content;
	min-height: 180px;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	position: fixed;
	top: 33px;
	border-radius: .4rem;
	box-shadow: var(--dark-box-shadow);
	display: flex;
	flex-direction: column;
}

.light-theme .messageDialog {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.closeBt {
	position: absolute;
	top: 0px;
	right: 0px;
	transform: translate(17%, -17%);
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--danger-light);
	padding: 2px;
	display: grid;
	place-items: center;
}

.light-theme .closeBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}

section {
	flex: 1;
	margin: 27px 13px 13px;
	overflow: auto;
}

footer {
	padding: 13px;
	display: flex;
	flex-direction: row-reverse;
}

.confirmBt {
	flex: .25;
}
</style>