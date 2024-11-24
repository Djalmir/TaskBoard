<template>
	<div class="spinnerTextWrapper" ref="textContainer" @mouseenter="setScrolling" @touchstart="setScrolling" @mouseleave="stopScrolling" @touchend="stopScrolling">
		<div class="spinnerTextInnerWrapper" ref="text">
			<slot></slot>
		</div>
	</div>
</template>

<script setup>
import {ref, onBeforeUnmount} from 'vue'

const textContainer = ref()
const text = ref()
const startingTimer = ref()
const timer = ref()
const currentScroll = ref(0)

function setScrolling() {
	clearTimeout(startingTimer.value)
	clearTimeout(timer.value)
	startingTimer.value = setTimeout(() => {
		if (textContainer.value?.scrollWidth > textContainer.value?.offsetWidth) {
			text.value.style.padding = '0 105% 0 0'
			timer.value = setInterval(() => {
				updateScroll()
			}, 16)
		}
	}, 250)
}

function updateScroll() {
	if (textContainer.value?.scrollWidth > textContainer.value?.offsetWidth) {
		currentScroll.value = currentScroll.value + 1
		if (currentScroll.value + textContainer.value.offsetWidth >= text.value.offsetWidth) {
			text.value.style.padding = '0 105%'
			currentScroll.value = 0
		}
		textContainer.value.scrollTo({left: currentScroll.value})
	}
}

function stopScrolling() {
	if (textContainer.value?.scrollWidth > textContainer.value?.offsetWidth) {
		clearTimeout(startingTimer.value)
		clearTimeout(timer.value)
		currentScroll.value = 0
		text.value.style.padding = '0 105% 0 0'
		textContainer.value.scrollTo({left: 0, behavior: 'smooth'})
	}
}

onBeforeUnmount(() => {
	clearInterval(timer.value)
})
</script>

<style scoped>
.spinnerTextWrapper {
	width: 100%;
	overflow: hidden;
}

.spinnerTextInnerWrapper {
	width: fit-content;
	padding: 0;
	white-space: nowrap;
}
</style>