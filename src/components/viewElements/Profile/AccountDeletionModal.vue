<template>
	<Modal ref="modal" @close="close">

		<template v-slot:header>
			<b id="title">Excluir conta</b>
		</template>

		<p>
			<b style="color:var(--danger-light)">Atenção:</b><br />
			Esta ação não poderá ser desfeita.
		</p>
		<p>
			Ao prosseguir, <b>todos</b> os seus dados, de <b>todas</b> as aplicações da <b>Razion</b> serão excluídos.
		</p>

		<Input class="input" label="Informe sua senha para prosseguir." type="password" v-model="password" @keypress.enter="deleteAccount" />

		<template v-slot:footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button type="submit" class="danger" @click="deleteAccount">Deletar minha conta</Button>
		</template>

	</Modal>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Modal from '@/components/uiElements/Modal.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import { dispatchEvent } from '@/utils/events.js'
import authApi from '@/services/authApi.js'

const store = useStore()
const router = useRouter()
const modal = ref()

const password = ref('')

function show() {
	modal.value.show()
}

function deleteAccount() {
	if (!password.value)
		return dispatchEvent('showMessage', { error: 'Informe sua senha.' })

	authApi.deleteAccount({
		password: password.value
	})
		.then(() => {
			store.dispatch('setUserProfile', null)
			router.replace({ name: 'Home' })
				.then(() => {
					dispatchEvent('showMessage', { success: 'Conta excluída com sucesso!' })
				})
		})
}

function close() {
	password.value = ''

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

b#title {
	font-size: 1.2rem;
	font-weight: bold;
}

p {
	margin: 17px 3px;
}

.input {
	margin-top: 33px;
	width: 100%;
}
</style>