<template>
	<div :class="`carousel ${props.class || ''}`" ref="carousel">
		<div class="carouselUi" v-show="slides.length">
			<Icon class="chevron-left" :size="2" @click="scrollTo(--currentSlide)" />
			<Icon class="chevron-right" :size="2" @click="scrollTo(++currentSlide)" />
		</div>
		<div class="carouselScroll" ref="scroller" v-show="slides.length">
			<div class="carouselSlidesWrapper" ref="carouselSlidesWrapper" @click="fullScreen = !fullScreen">
				<slot></slot>
			</div>
		</div>
	</div>
	<transition name="grow">
		<div :class="`fullScreenCarousel ${props.class || ''}`" ref="fullScreenCarousel" v-show="fullScreen" tabindex="0" @keydown.escape="(e) => { if (fullScreen) fullScreen = false; e.stopPropagation(); e.preventDefault(); }" @keydown="handleKeyDown">
			<div class="carouselUi">
				<Icon class="chevron-left" :size="2" @click="scrollTo(--currentSlide)" />
				<Icon class="chevron-right" :size="2" @click="scrollTo(++currentSlide)" />
			</div>
			<div class="fullScreenCarouselScroll" ref="fullScreenscroller">
				<div class="fullScreenCarouselSlidesWrapper" ref="fullScreenCarouselSlidesWrapper" @click="fullScreen = !fullScreen">
					<slot></slot>
				</div>
			</div>
		</div>
	</transition>
</template>

<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps({
	class: {
		type: String
	}
})

const carousel = ref()
const fullScreenCarousel = ref()
const scroller = ref()
const fullScreenscroller = ref()
const carouselSlidesWrapper = ref()
const fullScreenCarouselSlidesWrapper = ref()
const slides = ref([])
const fullScreenSlides = ref([])
const currentSlide = ref(0)
const observer = ref()
const inViewObserver = ref()
const fullScreen = ref(false)
const parentWidth = ref(`${ carousel.value?.parentElement.offsetWidth || 0 }px`)
const slideWidth = ref(`${ carousel.value?.parentElement.offsetWidth * .75 || 0 }px`)

watch(fullScreen, () => {
	setTimeout(() => {
		scrollTo(currentSlide.value, 'smooth')
		fullScreenCarousel.value?.focus()
	}, 250)
})

onMounted(() => {
	initObservers()
	window.addEventListener('resize', resizeSlides)
	resizeSlides()
})

function initObservers() {
	let config = {
		childList: true
	}
	observer.value = new MutationObserver(() => {
		resizeSlides()
	})
	observer.value.observe(carouselSlidesWrapper.value, config)
	observer.value.observe(fullScreenCarouselSlidesWrapper.value, config)

	config = {
		root: document.documentElement
	}

	inViewObserver.value = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				resizeSlides()
			}
		})
	})

	inViewObserver.value.observe(carousel.value, config)
}

function handleChildrenChanged() {
	slides.value = carouselSlidesWrapper.value ? Array.from(carouselSlidesWrapper.value.children) : []
	if (!slides.value.length) {
		if (fullScreen.value)
			fullScreen.value = false
		return
	}
	slides.value.map((slide) => {
		slide.style = `
			width: ${ slideWidth.value };
			height: calc(100% - 33px);
			aspect-ratio: 16/9;
		`
	})
	setTimeout(() => {
		scrollTo(currentSlide.value, 'auto')
	}, 0)
	fullScreenSlides.value = fullScreenCarouselSlidesWrapper.value ? Array.from(fullScreenCarouselSlidesWrapper.value.children) : []
	fullScreenSlides.value.map((slide) => {
		slide.style = `
			width: ${ window.innerWidth }px;
			height: calc(100dvh - 33px);
			overflow: auto;
		`
	})
}

function scrollTo(index, behavior = 'smooth') {

	if (!slides.value.length)
		return

	if (index < 0) {
		index = 0
	}
	else if (index >= slides.value.length) {
		index = slides.value.length - 1
	}

	setTimeout(() => {
		if (carousel.value) {
			currentSlide.value = index
			let carouselBoundings = carousel.value.getBoundingClientRect()
			let wrapperBoundings = carouselSlidesWrapper.value.getBoundingClientRect()
			let slideBoundings = Array.from(carouselSlidesWrapper.value.children)[index].getBoundingClientRect()

			scroller.value.scrollTo({
				top: 0,
				left: slideBoundings.x - wrapperBoundings.x - (carouselBoundings.width - slideBoundings.width) / 2,
				behavior
			})

			setTimeout(() => {
				if (fullScreenCarouselSlidesWrapper.value) {
					let fsWrapperBoundings = fullScreenCarouselSlidesWrapper.value.getBoundingClientRect()
					let fsSlideBoundings = Array.from(fullScreenCarouselSlidesWrapper.value.children)[index].getBoundingClientRect()

					fullScreenscroller.value.scrollTo({
						top: 0,
						left: fsSlideBoundings.x - fsWrapperBoundings.x - (window.innerWidth - fsSlideBoundings.width) / 2,
						behavior
					})
				}
			}, 0)
		}
	}, 0)

}

function handleKeyDown(e) {
	switch (e.key) {
		case 'ArrowLeft':
			scrollTo(--currentSlide.value)
			break
		case 'ArrowRight':
			scrollTo(++currentSlide.value)
			break
	}
}

function resizeSlides() {
	parentWidth.value = `${ carousel.value?.parentElement.offsetWidth || 0 }px`
	slideWidth.value = `${ carousel.value?.parentElement.offsetWidth * .75 || 0 }px`
	handleChildrenChanged()
}

defineExpose({
	fullScreen
})

</script>

<style scoped>
.carousel {
	position: 'relative';
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	pointer-events: none;
	display: grid;
	place-items: center;
	backdrop-filter: blur(5px);
	z-index: 2;
}

.carouselScroll {
	max-width: v-bind(parentWidth);
	overflow: hidden;
	padding: 17px 0;
	pointer-events: all;
}

.fullScreenCarouselScroll {
	max-width: 100vw;
	overflow: hidden;
	padding: 17px 0;
	pointer-events: all;
}

.carouselSlidesWrapper {
	width: fit-content;
	display: flex;
	gap: 33px;
	padding: 0 25vw;
}

.fullScreenCarouselSlidesWrapper {
	width: fit-content;
	display: flex;
	gap: 15vw;
	padding: 0 25vw;
}

.carouselUi {
	position: absolute;
	inset: 0;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: var(--dark-font1);
	stroke: var(--dark-font1);
	pointer-events: all;
}

.light-theme .carouselUi {
	color: var(--light-font1);
	stroke: var(--light-font1);
}

.carouselUi>* {
	z-index: 1;
	cursor: pointer;
	transform-origin: center;
	padding: 17px 7px;
	box-sizing: content-box;
	user-select: none;
	transition: .1s;
	border-radius: .3rem;
}

.carouselUi>*:hover {
	transform: scale(1.25);
	background: var(--dark-bg2-transparent);
}

.light-theme .carouselUi>*:hover {
	background: var(--light-bg2-transparent);
}

.carouselUi>*:active {
	transform: scale(1);
}

.fullScreenCarousel {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-height: 100dvh;
	pointer-events: none;
	backdrop-filter: blur(5px);
}

.grow-enter-active,
.grow-leave-active {
	transition: .2s ease;
}

.grow-enter-from,
.grow-leave-to {
	opacity: 0;
}
</style>./Icon.vue./Icon.vue./Icon.vue./Icon.vue