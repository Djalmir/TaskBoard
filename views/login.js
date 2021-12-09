const template = document.createElement('template')
template.innerHTML = /*html*/`
	<link rel="stylesheet" href="style.css">
	<style>
		section{
			position: absolute;
			inset: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			padding-top: 40px;
		}

		form {
			height: fit-content;
			width: 90%;
			max-width: 400px;
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

		c-input {
			width: 100%;
		}

		.blueBt {
			width: 100%;
			padding: 8px;
		}
	</style>

	<section>
		<form action='#' @submit='submit' autocomplete='off'>
			<c-input type='email' placeholder='E-mail' z-model='email'></c-input>
			<c-input type='password' placeholder='Senha' z-model='password'></c-input>
			<button type='submit' class='blueBt'>Entrar</button>
		</form>
		<button @click='get'>Ver Valores</button>
		<button @click='set'>Setar email</button>
	</section>
`

export default class Login extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.data = {
			email: '',
			password: ''
		}

		this.submit = () => {
			console.log('lol')
			return false
		}

		this.get = () => {
			console.log('data: ',this.data)
		}

		this.set = () => {
			this.data.email = 'djalmir_miodutzki@hotmail.com'
		}

		runZion(this)
	}
}

customElements.define('v-login', Login)