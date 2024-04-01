<template>
	<div class="dialogWrapper" :style="{ pointerEvents: showing ? 'all' : 'none' }">
		<transition name="fade">
			<div class="dialogShadow" v-if="showing" @click="close"></div>
		</transition>
		<transition name="roll">
			<DialogMessage id="messageDialog" class="dialog" v-if="showing == 'message'" :message="message" @close="close" tabindex="0" :style="messageStyle" />
			<Confirm id="confirmDialog" class="dialog" v-else-if="showing == 'confirm'" :message="message" @accept="res(true); close()" @close="close" tabindex="0" />
		</transition>
	</div>
</template>

<script setup>
import { ref, computed, inject } from 'vue'
import DialogMessage from '@/components/componentElements/Dialog/DialogMessage.vue'
import Confirm from '@/components/componentElements/Dialog/Confirm.vue'
import { dispatchEvent } from '@/utils/events.js'

const showing = ref(null)
const message = ref(null)
const res = ref(null)

const messageType = ref(null)

const messageStyle = computed(() => {
	if (messageType.value != 'message')
		return { boxShadow: `3px 3px 3px ${ messageType.value == 'error' ? '#be000040' : '#25e94c40' }` }
})

function showMessage(msg) {
	document.body.click()
	dispatchEvent('closeAllMessages')
	showing.value = 'message'
	messageType.value = msg.success ? 'success' : msg.error ? 'error' : 'message'
	message.value = msg.success || msg.error || msg.message
	setTimeout(() => {
		document.querySelector('#messageDialog').focus()
	}, 200)
}


function confirm(msg) {
	document.body.click()
	dispatchEvent('closeAllMessages')
	return new Promise((resolve, reject) => {
		showing.value = 'confirm'
		message.value = msg
		res.value = resolve
		setTimeout(() => {
			document.querySelector('#confirmDialog').focus()
		}, 200)
	})
}

function close() {
	showing.value = null
	message.value = null
	if (document.querySelector('#modal'))
		document.querySelector('#modal section input').focus()
}

defineExpose({
	showMessage,
	confirm,
	close
})

</script>

<style scoped>
.dialogWrapper {
	position: fixed;
	inset: 0;
	display: grid;
	place-items: center;
	z-index: 5;
}

.dialogShadow {
	width: 100%;
	height: 100vh;
	background: var(--dark-bg1-transparent);
	backdrop-filter: blur(2px);
}


.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
	transition: ease-in .2s;
}

.roll-enter-from,
.roll-leave-to {
	transform: translateY(-200%);
}

.roll-enter-active,
.roll-leave-active {
	transition: ease-in .3s;
}
</style>