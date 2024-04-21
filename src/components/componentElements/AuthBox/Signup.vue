<template>
	<form action="javascript:void(0)" @submit="signup">
		<div>
			<h2>Cadastro</h2>
			<Input class="input" type="text" label="Nome" v-model="name" @focus="message.closeByField('name')" />
			<Input class="input" type="email" label="Email" v-model="email" @focus="message.closeByField('email')" />
			<Input class="input" type="password" label="Senha" v-model="password" @focus="message.closeByField('password')" />
			<Input class="input" type="password" label="Confirme a Senha" v-model="confirmPassword" @focus="message.closeByField('confirmPassword')" />
			<Button class="submitBt" type="submit">Criar Conta</Button>
			<span class="link">
				<b>Já tem uma conta?</b><br />
				<a href="#" @click="$emit('goToLogin')">
					Fazer Login
				</a>
			</span>
		</div>
	</form>
</template>

<script setup>
import { ref, inject, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import authApi from '@/services/authApi.js'

const route = useRoute()
const message = inject('Message').value

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const emit = defineEmits(['goToLogin', 'signedUp'])

onBeforeMount(() => {
	if (route.query.name) name.value = route.query.name
	if (route.query.email) email.value = route.query.email
})

function signup() {
	if (!name.value)
		message.show({ error: 'Preencha seu nome', field: 'name' })
	if (!email.value)
		message.show({ error: 'Preencha seu email', field: 'email' })
	if (!password.value)
		message.show({ error: 'Preencha sua senha', field: 'password' })
	if (!confirmPassword.value)
		message.show({ error: 'Confirme sua senha', field: 'confirmPassword' })
	else if (password.value != confirmPassword.value)
		message.show({ error: 'As senhas não correspondem' })

	if (!name.value || !email.value || !password.value || !confirmPassword.value)
		return

	authApi.signup({
		name: name.value,
		email: email.value,
		password: password.value
	})
		.then((res) => {
			emit('signedUp', res.data)
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
	height: 39px;
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