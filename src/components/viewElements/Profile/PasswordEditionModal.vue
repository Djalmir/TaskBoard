<template>
	<Modal ref="modal" @close="close">

		<template v-slot:header>
			<b>Alterar senha</b>
		</template>

		<Input class="input" label="Senha atual" type="password" v-model="currentPassword" @keypress.enter="updatePassword" />
		<Input class="input" label="Nova senha" type="password" v-model="newPassword" @keypress.enter="updatePassword" />
		<Input class="input" label="Confirmar nova senha" type="password" v-model="confirmNewPassword" @keypress.enter="updatePassword" />

		<template v-slot:footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button type="submit" @click="updatePassword">Confirmar</Button>
		</template>

	</Modal>
</template>

<script setup>
import { ref } from 'vue'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import { dispatchEvent } from '@/utils/events.js'
import authApi from '@/services/authApi.js'

const modal = ref()

const currentPassword = ref('')
const newPassword = ref('')
const confirmNewPassword = ref('')

function show() {
	modal.value.show()
}

function updatePassword() {
	if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value)
		return dispatchEvent('showMessage', { error: 'Preencha todos os campos' })
	if (newPassword.value != confirmNewPassword.value)
		return dispatchEvent('showMessage', { error: 'As senhas não correspondem' })
	authApi.updateProfile({
		password: currentPassword.value,
		newPassword: newPassword.value
	})
		.then(() => {
			dispatchEvent('showMessage', { success: 'Senha alterada com sucesso!' })
			close()
		})
}

function close() {
	currentPassword.value = ''
	newPassword.value = ''
	confirmNewPassword.value = ''

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

b {
	font-size: 1.2rem;
	font-weight: bold;
}

.input {
	width: 100%;
}
</style>