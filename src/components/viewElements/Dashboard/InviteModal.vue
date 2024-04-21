<template>
	<Modal ref="modal" @close="close">

		<template v-slot:header>
			<b id="title">Convidar colaborador</b>
		</template>

		<Input class="input" label="Nome" type="text" v-model="name" @keypress.enter.stop="sendInviteEmail" />
		<Input class="input" id="email" label="Email" type="email" v-model="email" @keypress.enter.stop="sendInviteEmail" />

		<template v-slot:footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button type="submit" @click="sendInviteEmail">Enviar convite</Button>
		</template>

	</Modal>
</template>

<script setup>
import { ref, inject } from 'vue'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import authApi from '@/services/authApi.js'

const modal = ref()
const message = inject('Message').value
const name = ref('')
const email = ref('')
const emit = defineEmits(['filledInvitation'])

function show(mail) {
	email.value = mail || ''
	modal.value.show()
}

function sendInviteEmail() {
	if (!email.value)
		return message.show({ error: 'O campo email é obrigatório', field: 'email' })

	emit('filledInvitation', name.value, email.value)
	close()

}

function close() {
	name.value = ''
	email.value = ''

	modal.value.close()
}

defineExpose({
	show
})

</script>

<style scoped>
form {
	background: transparent;
	box-shadow: none;
	width: 100%;
	height: 100%;
	padding: 0;
	margin: 0;
}

.input {
	width: 100%;
}
</style>