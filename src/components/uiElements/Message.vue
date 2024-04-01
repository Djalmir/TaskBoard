<template>
	<transition-group tag="div" class="messageWrapper" name="messageAnimation">
		<div v-for="message in messages" ref="msgsRef" :key="message" :class="`${message.success ? 'success' : 'error'} message`">
			<slot>
				{{ message.success || message.error }}
			</slot>
			<Button class="closeBt" @click="closeMessage(message)">
				<Icon class="x" :size="1.25" />
			</Button>
		</div>
	</transition-group>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Button from '@/components/uiElements/Button.vue'
import Icon from '@/components/uiElements/Icon.vue'

const messages = ref([])
const msgsRef = ref()

onMounted(() => {
	document.addEventListener('closeAllMessages', closeAll)
})

function show(msg) {
	let alertingMessages = messages.value.filter(m => m.field == msg.field && (m.success == msg.success || m.error == msg.error))
	alertingMessages.map((m) => {
		m.alert()
	})
	if (!alertingMessages.length) {
		messages.value.push({
			...msg,
			alert: () => {
				let alertingMessage = msgsRef.value.find(m => m.innerText == msg.success || m.innerText == msg.error)
				if (alertingMessage) {
					function rmAnim() {
						alertingMessage.removeEventListener('animationend', rmAnim)
						alertingMessage.classList.remove('alerting')
					}
					alertingMessage.addEventListener('animationend', rmAnim)
					alertingMessage.classList.add('alerting')
					if (navigator.vibrate)
						navigator.vibrate([100, 10, 150])
				}
			}
		})

		//autoclose after 10 seconds
		setTimeout(() => {
			closeMessage(messages.value[messages.value.length - 1])
		}, 10000)
	}
}

function closeMessage(message) {
	messages.value.splice(messages.value.indexOf(message), 1)
}

function closeByField(field) {
	messages.value = messages.value.filter(m => m.field != field)
}

function closeAll() {
	messages.value = []
}

onBeforeUnmount(() => {
	document.removeEventListener('closeAllMessages', closeAll)
})

defineExpose({
	show,
	closeByField,
	closeAll
})

</script>

<style scoped>
.messageWrapper {
	position: fixed;
	top: 51px;
	right: 0;
	z-index: 3;
	pointer-events: none;
	padding: 7px;
}

.message {
	display: flex;
	gap: 17px;
	align-items: center;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
	border-radius: .3em;
	padding: 7px;
	padding-left: 17px;
	margin: 7px;
	margin-left: auto;
	width: fit-content;
	pointer-events: all;
	font-weight: bold;
}

.light-theme .message {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.message.success {
	color: var(--success-light);
}

.light-theme .message.success {
	color: var(--success);
}

.message.error {
	color: var(--danger-light);
}

.light-theme .message.error {
	color: var(--danger);
}

.closeBt {
	padding: 3px;
	border-radius: .3em;
	display: grid;
	place-items: center;
	vertical-align: middle;
	background: linear-gradient(145deg, var(--dark-bg3), var(--dark-bg1));
	color: var(--light-font2);
}

.light-theme .closeBt {
	background: linear-gradient(145deg, var(--light-bg3), var(--light-bg1));
}

.messageAnimation-enter-active {
	transition: all .2s ease-out;
}

.messageAnimation-leave-active {
	transition: all .2s ease-in;
}

.messageAnimation-enter-from,
.messageAnimation-leave-to {
	transform: translateX(150%);
}

.message.alerting {
	animation: messageAlert .2s linear 1;
}

@keyframes messageAlert {
	0% {
		transform: rotateZ(-5deg);
	}

	25% {
		transform: rotateZ(5deg);
	}

	50% {
		transform: rotateZ(-5deg);
	}

	75% {
		transform: rotateZ(5deg);
	}

	100% {
		transform: rotateZ(0deg);
	}
}
</style>./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue./Button.vue./Icon.vue