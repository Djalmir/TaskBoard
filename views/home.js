const template = document.createElement('template')
template.innerHTML = /*html*/`
<link rel="stylesheet" href="style.css">
<style>

	section {
		padding: 40px 0;
		width: 100%;
		overflow-x: hidden;
	}

	#formsWrapper {
		width: 100%;
		overflow: auto;
	}

	#formsContainer {
		display: flex;
		justify-content: space-evenly;
		width: 200%;
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
	<div id="formsWrapper">
		<div id="formsContainer">

			<form id='loginForm' action='javascript:void(0)' @submit='login' autocomplete='off' @keydown='loginKeydown'>
				<c-input type='email' placeholder='E-mail' z-model='loginEmail'></c-input>
				<c-input type='password' placeholder='Senha' z-model='loginPassword'></c-input>
				<button type='submit' class='blueBt'>Entrar</button>
			</form>

			<form id='signupForm' action='javascript:void(0)' @submit='signup' autocomplete='off' @keydown='signupKeydown'>
				<c-input type='text' placeholder='Nome' z-model='signupName'></c-input>
				<c-input type='email' placeholder='E-mail' z-model='signupEmail'></c-input>
				<c-input type='password' placeholder='Senha' z-model='signupPassword'></c-input>
				<c-input type='password' placeholder='Confirme sua Senha' z-model='signupConfirmPassword'></c-input>
				<button type='submit' class='blueBt'>Cadastrar</button>
			</form>

		</div>
	</div>
</section>
`

export default class Home extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.loginEmail = ''
		this.loginPassword = ''
		this.signupName = ''
		this.signupEmail = ''
		this.signupPassword = ''
		this.signupConfirmPassword = ''


		this.loginKeydown = (e) => {
			if (e.key == 'Enter')
				this.login()
		}

		this.login = () => {
			if (this.loginEmail.trim() == '') {
				errorMsg.show('Informe seu email')
			}
			else if (this.loginPassword.trim() == '') {
				errorMsg.show('Digite sua senha')
			}
			else {
				errorMsg.show('CHAMAR A API')
			}
		}

		runZion(this)
	}

	connectedCallback() {
		console.log('load')
		let formsWrapper = this.shadowRoot.querySelector('#formsWrapper')
		let loginForm = this.shadowRoot.querySelector('#loginForm')
		console.log(loginForm.offsetLeft)
		formsWrapper.scrollLeft = loginForm.offsetLeft
	}
}

customElements.define('view-home', Home)