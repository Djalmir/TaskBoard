<template>
	<form action="javascript:void(0)" @submit="login">
		<div>
			<h2>Login</h2>
			<Input class="input" type="email" label="Email" v-model="email" @focus="message.closeByField('email')" />
			<Input class="input" type="password" label="Senha" v-model="password" @focus="message.closeByField('password')" />
			<Button class="submitBt" type="submit">Entrar</Button>
			<span class="link">
				<b>Ainda não tem uma conta Razion?</b><br />
				<a href="#" @click="$emit('goToSignup')">
					Cadastre-se gratuitamente
				</a>
			</span>
		</div>
	</form>
</template>

<script setup>
import { ref, inject } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import authApi from '@/services/authApi.js'

const store = useStore()
const router = useRouter()
const message = inject('Message').value

const email = ref('')
const password = ref('')

const emit = defineEmits(['goToSignup', 'loggedIn'])

function login() {
	if (!email.value)
		message.show({ error: 'Informe seu email', field: 'email' })
	if (!password.value)
		message.show({ error: 'Informe sua senha', field: 'password' })
	if (!email.value || !password.value)
		return
	authApi.login({
		email: email.value,
		password: password.value
	})
		.then((res) => {
			emit('loggedIn', res.data)
		})
}
</script>

<style scoped>
form {
	display: grid;
	place-items: center;
	width: 100%;
}

div {
	width: 100%;
}

h2 {
	text-align: center;
}

.input {
	width: 100%;
}

.submitBt {
	width: 100%;
	margin-top: 7px;
	height: 37px;
	font-weight: bold;
}

.link {
	display: block;
	margin-top: 7px;
	text-align: center;
	font-size: .8rem;
}

.link a {
	color: var(--primary-light);
}

.link a:hover {
	filter: brightness(1.2);
}

.link a:active {
	filter: brightness(0.8);
}
</style>