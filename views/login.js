const template = document.createElement('template')
template.innerHTML = /*html*/`
	<link rel="stylesheet" href="style.css">
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

	<section>			<!--javascript:void(0) faz com que o form não tenha nenhuma action-->
		<form action='javascript:void(0)' z-onsubmit='submit'>
			<z-input id='emailInput' type='email' placeholder='E-mail' z-model='email' z-onkeydown='keydown' z-onfocus="removeErrMsg('email')" z-autofocus></z-input>
			<z-input type='password' placeholder='Senha' z-model='password' z-onkeydown='keydown' z-onfocus="removeErrMsg('password')"></z-input>
			<!-- <label class="inputWrapper">
				<input type="email" id="emailInput" placeholder="E-mail" z-model="email" z-onkeydown='keydown' onfocus="removeErrMsg('email')" z-autofocus>
				<b>E-mail</b>
			</label>
			<label class="inputWrapper">
				<input type="password" placeholder="Senha" z-model="password" z-onkeydown='keydown' onfocus="removeErrMsg('password')">
				<b>Senha</b>
			</label> -->
			<button type='submit' class='blueBt'>Entrar</button>
		</form>
	</section>
`

import Visitor from '../services/Visitor.js'
export default class Login extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		//DATA
		this.email = ''
		this.password = ''

		this.submit = () => {
			if (errorMsg.getMessages().length) {
				errorMsg.callAttention()
			}
			else {
				if (this.password.trim() == '') {
					errorMsg.show({field: 'password', message: 'Digite sua senha'})
				}
				if (this.email.trim() == '') {
					errorMsg.show({field: 'email', message: 'Informe seu email'})
				}
				if (!this.shadowRoot.querySelector('#emailInput').checkValidity()) {
					errorMsg.show({field: 'email', message: 'Email inválido'})
				}
				if (!errorMsg.getMessages().length) {
					Visitor.login({
						email: this.email,
						password: this.password
					})
						.then((res) => {
							app.user = res.user
							localStorage.setItem('Razion.user', JSON.stringify(app.user))
							window.location.hash = '#/taskboard'
						})
						.catch((err) => {
							errorMsg.show({message: err.error, field: err.field})
						})
				}
			}
			return false
		}

		this.keydown = (e) => {
			if (e.key == 'Enter')
				this.submit()
		}

		ZION(this)
	}

	connectedCallback() {
		
	}
}

customElements.define('view-login', Login)