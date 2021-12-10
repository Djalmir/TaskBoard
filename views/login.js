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

	<section>			<!--javascript:void(0) faz com que o form não tenha nenhuma action-->
		<form action='javascript:void(0)' @submit='submit' autocomplete='off'>
			<c-input type='email' placeholder='E-mail' z-model='email' @keydown='keydown'></c-input>
			<c-input type='text' placeholder='Senha' z-model='password'></c-input>
			<button type='submit' class='blueBt'>Entrar</button>
		</form>
		<!-- <button @click='setEmail'>setar email</button>
		<button @click='setPassword'>setar senha</button> -->
	</section>
`

export default class Login extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		//DATA
		this.email = ''
		this.password = ''

		this.submit = () => {
			if (this.email.trim() == ''){
				console.log('lol')
				errorMsg.show('Informe seu email')
			}
			else if (this.password.trim() == ''){
				console.log('oto lol')
				errorMsg.show('Digite sua senha')
			}
			else {
				console.log('lolzera')
				errorMsg.show('Show só chamar a api')
			}
			return false
		}

		this.setEmail = () => {
			this.email = 'email_de_teste@hotmail.com'
		}

		this.setPassword = () =>{
			this.password = '123456'
		}

		this.keydown = (e) => {
			if(e.key=='Enter')
				this.submit()
		}

		runZion(this)
	}
}

customElements.define('v-login', Login)