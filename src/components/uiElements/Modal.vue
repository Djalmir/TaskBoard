<template>
	<div class="modalWrapper">
		<transition name="fade">
			<div class="modalShadow" v-if="showing" @click="$emit('close')"></div>
		</transition>
		<transition name="grow">
			<div class="modal" ref="modal" v-if="showing" @keydown.escape="$emit('close')" tabindex="0">
				<header class="modalHeader">
					<slot name="header"></slot>
				</header>
				<section>
					<slot></slot>
				</section>
				<footer class="modalFooter" ref="modalFooter">
					<slot name="footer"></slot>
				</footer>
				<Button class="secondary closeModalBt" @click="$emit('close')">
					<Icon class="x" :size="1.5" />
				</Button>
			</div>
		</transition>
	</div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const showing = ref(false)
const message = inject('Message').value

const modal = ref()
const modalFooter = ref()
// const observer = ref()

const sectionPadding = computed(() => {
	let showingHeader = modal.value?.querySelector('.modalHeader').children.length
	let showingFooter = modal.value?.querySelector('.modalFooter').children.length
	return `${ showingHeader ? '51px' : '17px' } 17px ${ showingFooter ? '69px' : '17px' } 17px`
})

function show() {
	message.closeAll()
	document.body.click()
	showing.value = true
	setTimeout(() => {
		footerStyles()
	}, 0)
	setTimeout(() => {
		let element = modal.value.querySelector('section input', 'section textarea', 'section select', 'section button')
		if (element) {
			element.focus()
		}
		else {
			modal.value.focus()
		}
	}, 200)
}

// function initObserver() {
// 	let config = {
// 		childList: true
// 	}
// 	observer.value = new MutationObserver(() => {
// 		footerStyles()
// 	})
// 	observer.value.observe(modalFooter.value, config)
// }

function footerStyles() {
	Array.from(modalFooter.value?.children).forEach((child) => {
		child.style.flex = '1'
	})
}

function close() {
	message.closeAll()
	document.body.click()
	showing.value = false
}

defineExpose({
	show,
	close
})

</script>

<style scoped>
.modalWrapper {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: grid;
	place-items: center;
	z-index: 3;
	pointer-events: none;
}

.modalShadow {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: var(--dark-bg1-transparent);
	backdrop-filter: blur(2px);
	pointer-events: all;
}

.light-theme .modalShadow {
	background: var(--light-bg1-transparent);
}

.modal {
	position: relative;
	width: 77%;
	max-width: 500px;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	border-radius: .3rem;
	pointer-events: all;
}

.light-theme .modal {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.modal .modalHeader:has(*) {
	width: 100%;
	padding: 7px 17px;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	backdrop-filter: blur(5px);
	border-radius: .3rem .3rem 0 0;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg1-transparent));
	box-shadow: var(--light-box-shadow);
	z-index: 1;
}

.light-theme .modal .modalHeader {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg1-transparent));
}

.modal section {
	padding: v-bind(sectionPadding);
	width: 100%;
	max-height: 90vh;
	overflow: auto;
}

.modal .modalFooter:has(*) {
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	display: flex;
	gap: 7px;
	padding: 7px 17px 17px;
	backdrop-filter: blur(5px);
	border-radius: 0 0 .3rem .3rem;
	background: linear-gradient(145deg, var(--dark-bg3-transparent), var(--dark-bg1-transparent));
	box-shadow: var(--dark-box-shadow);
}

.light-theme .modal .modalFooter {
	background: linear-gradient(145deg, var(--light-bg3-transparent), var(--light-bg1-transparent));
	box-shadow: var(--light-box-shadow);
}

.closeModalBt {
	position: absolute;
	top: 0;
	right: 0;
	padding: 2px;
	transform: translate(17%, -17%);
	display: grid;
	place-items: center;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--danger-light);
	z-index: 1;
}

.light-theme .closeModalBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}
</style>./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue