const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	form {
		height: fit-content;
		width: 100%;
		/*max-width: 400px;*/
		padding: 30px 20px 20px;
		box-sizing: border-box;
		border-radius: .3rem;
		box-shadow: 0 0 5px var(--darkgray2);
		display: flex;
		gap: 22px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--darkgray4);
	}

	z-input {
		width: 100%;
	}

	.blueBt {
		width: 100%;
		padding: 8px;
	}
</style>
<link rel="stylesheet" href="style.css">

<section>
	<form id='signupForm' action='javascript:void(0)' @submit='submit' @keydown='keydown'>
		<z-input type='text' placeholder='Nome' z-model='name' @focus="removeErrMsg('name')"></z-input>
		<z-input id='emailInput' type='email' placeholder='E-mail' z-model='email' @focus="removeErrMsg('email')"></z-input>
		<z-input type='password' placeholder='Senha' z-model='password' @focus="removeErrMsg('password')"></z-input>
		<z-input type='password' placeholder='Confirme sua Senha' z-model='confirmPassword' @focus="removeErrMsg('confirmPassword')"></z-input>
		<button type='submit' class='blueBt'>Cadastrar</button>
	</form>
</section>
`

import Visitor from "../services/Visitor.js"
export default class Signup extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.name = ''
		this.email = ''
		this.password = ''
		this.confirmPassword = ''

		this.submit = () => {
			if(errorMsg.getMessages().length)
				errorMsg.callAtention()
			else{
				if (this.password != this.confirmPassword) {
					errorMsg.show({field: 'confirmPassword', message: 'As senhas não coincidem'})
				}
				if (this.confirmPassword.trim() == '') {
					errorMsg.show({field: 'confirmPassword', message: 'Confirme a senha'})
				}
				if (this.password.trim() == '') {
					errorMsg.show({field: 'password', message: 'Digite sua senha'})
				}
				if (!this.shadowRoot.querySelector('#emailInput').checkValidity()) {
					errorMsg.show({field: 'email', message: 'Email inválido'})
				}
				if (this.email.trim() == '') {
					errorMsg.show({field: 'email', message: 'Informe seu email'})
				}
				if (this.name.trim() == '') {
					errorMsg.show({field: 'name', message: 'Informe seu nome'})
				}
				if (!errorMsg.getMessages().length) {
					Visitor.signup({
						name: this.name,
						email: this.email,
						password: this.password
					})
						.then((res) => {
							res.pw = this.password
							let event = new CustomEvent('successSignup', {
								detail: {
									res: res,
								}
							})
							document.dispatchEvent(event)
						})
						.catch((err) => {
							errorMsg.show({field: err.field, message: err.error})
						})
				}
			}
			return false
		}

		// let event = new CustomEvent('successSignup', {
		// 	detail: {
		// 		res: 'teste'
		// 	}
		// })
		// document.dispatchEvent(event)

		this.keydown = (e) => {
			if (e.key == 'Enter')
				this.submit()
		}

		runZion(this)
	}
}

customElements.define('view-signup', Signup)