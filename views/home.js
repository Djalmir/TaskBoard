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
		margin: 0;
		padding: 0;
		width: 100%;
		overflow: hidden;
	}

	#formsContainer {
		padding: 0;
		margin: 0;
		display: flex;
		align-items: flex-start;
		justify-content: space-evenly;
		width: 200%;
	}

	#formsContainer div {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.changeViewP {
		text-align: center;
	}

	#formsContainer div u {
		font-weight: bold;
		cursor: pointer;
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
	<div id='formsWrapper'>
		<div id='formsContainer'>
			<div id='loginDiv'>
				<h2>Login</h2>
				<form id='loginForm' action='javascript:void(0)' @submit='login' autocomplete='off' @keydown='loginKeydown'>
					<c-input type='email' placeholder='E-mail' z-model='loginEmail'></c-input>
					<c-input type='password' placeholder='Senha' z-model='loginPassword'></c-input>
					<button type='submit' class='blueBt'>Entrar</button>
				</form>
				<p class="changeViewP">
					Ainda não tem uma conta?<br>
					<u @click="changeView">Clique aqui</u> e cadastre-se gratuitamente!
				</p>
			</div>

			<div id='signupDiv'>
			<h2>Cadastro</h2>
				<form id='signupForm' action='javascript:void(0)' @submit='signup' autocomplete='off' @keydown='signupKeydown'>
					<c-input type='text' placeholder='Nome' z-model='signupName'></c-input>
					<c-input type='email' placeholder='E-mail' z-model='signupEmail'></c-input>
					<c-input type='password' placeholder='Senha' z-model='signupPassword'></c-input>
					<c-input type='password' placeholder='Confirme sua Senha' z-model='signupConfirmPassword'></c-input>
					<button type='submit' class='blueBt'>Cadastrar</button>
				</form>
				<p class="changeViewP">
					Já tem uma conta?<br>
					<u @click="changeView">Clique aqui</u> para entrar!
				</p>
			</div>

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


		this.currentView = 'loginDiv'
		this.changeView = () => {
			let wrapper = this.shadowRoot.querySelector('#formsWrapper')
			window.scrollTo({top: wrapper.offsetTop, behavior: 'smooth'})
			wrapper.style.scrollBehavior = 'smooth'
			let loginDiv = this.shadowRoot.querySelector('#loginDiv')
			let signupDiv = this.shadowRoot.querySelector('#signupDiv')
			switch (this.currentView) {
				case ('loginDiv'):
					this.currentView = 'signupDiv'
					wrapper.scrollLeft = signupDiv.offsetLeft
					break
				case ('signupDiv'):
					this.currentView = 'loginDiv'
					wrapper.scrollLeft = loginDiv.offsetLeft
					break
			}
		}

		this.keepOnView = () => {
			let wrapper = this.shadowRoot.querySelector('#formsWrapper')
			wrapper.style.scrollBehavior = 'auto'
			let loginDiv = this.shadowRoot.querySelector('#loginDiv')
			let signupDiv = this.shadowRoot.querySelector('#signupDiv')
			switch (this.currentView) {
				case ('loginDiv'):
					wrapper.scrollLeft = loginDiv.offsetLeft
					break
				case ('signupDiv'):
					wrapper.scrollLeft = signupDiv.offsetLeft
					break
			}
		}

		this.loginKeydown = (e) => {
			if (e.key == 'Enter')
				this.login()
		}

		this.login = () => {
			if (this.loginEmail.trim() == '') {
				errorMsg.show({field: 'email', message: 'Informe seu email'})
			}
			if (this.loginPassword.trim() == '') {
				errorMsg.show({field: 'password', message: 'Digite sua senha'})
			}
			
			if (!errorMsg.getMessages()) {
				errorMsg.show('CHAMAR A API')
			}
		}

		runZion(this)
	}

	connectedCallback() {
		window.onresize = () => {
			this.keepOnView()
		}
	}

}

customElements.define('view-home', Home)