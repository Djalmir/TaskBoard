const template = document.createElement('template')
template.innerHTML = /*html*/`
<link rel="stylesheet" href="style.css">
<style>

	section {
		/*background: linear-gradient(to bottom, var(--darkgray1),var(--darkgray3));*/
		padding: 40px 0;
		text-align: center;
	}

	#viewsWrapper {
		margin: 0;
		padding: 0 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.formWrapper {
		text-align: center;
		flex: 1;
		margin: 40px 0;
	}
	
	.formWrapper a{
		color: var(--blue);
	}
	
	.formWrapper a:active{
		color: var(--darkblue2);
	}
	
	#signupWrapper {
		display: none;
	}
	
	.container {
		display: flex;
		gap: 40px;
		padding: 40px;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: center;
	}

	.container div {
		flex: 1;
		min-width: 300px;
		max-width: 460px;
	}

	@media (min-width: 760px) {
		.welcomeDiv {
			text-align: right;
		}
	}

	@keyframes leaveLeft {
		from {
			opacity: 1;
		}
		to{
			opacity: 0;
			transform: translateX(-400px);
		}
	}

	@keyframes enterLeft {
		from {
			opacity: 0;
			transform: translateX(400px);
		}
		to {
			opacity: 1;
		}
	}

	@keyframes leaveRight {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
			transform: translateX(400px)
		}
	}

	@keyframes enterRight {
		from {
			opacity: 0;
			transform: translateX(-400px);
		}
		to{
			opacity: 1;
		}
	}
</style>

<section>
	
	<div id="viewsWrapper">
		
		<div class="formWrapper" id="loginWrapper">
			<div class="container">
				<div class="welcomeDiv">
					<h1>Boas vindas!</h1>
					<p>
						Faça login em sua conta <b>Razion</b><br/> e organize suas tarefas <i>like a boss</i> com o <b>Razion TaskBoard</b>!
					</p>
				</div>
				<div class="formDiv">
					<view-login id="loginForm"></view-login>
					<p>
						Ainda não tem um cadastro?<br/>
						<a href="javascript:void(0)" z-on:click="goTo('signup')" >clique aqui</a> e cadastre-se gratuitamente!
					</p>
				</div>
			</div>
		</div>

		<div class="formWrapper" id="signupWrapper">
			<div class="container">
				<div class="welcomeDiv">
					<h1>Uma conta. Todas as vantagens!</h1>
					<p>
						Com uma única conta você tem acesso gratuito a todos os<br/> produtos oferecidos pela <b>Razion</b>!
					</p>
				</div>
				<div class="formDiv">
					<view-signup id="signupForm"></view-signup>
					<p>
						Já tem um cadastro?<br/>
						<a href="javascript:void(0)" z-on:click="goTo('login')" >clique aqui</a> para entrar!
					</p>
				</div>
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

		this.goTo = (view) => {
			errorMsg.closeAll()

			let login = this.shadowRoot.querySelector('#loginWrapper')
			let signup = this.shadowRoot.querySelector('#signupWrapper')
			switch (view) {
				case 'signup':
					login.style.animation = 'leaveLeft .2s ease-in 1 forwards'
					const showSignup = () => {
						this.shadowRoot.removeEventListener('animationend', showSignup)
						login.style.display = 'none'
						signup.style.display = 'block'
						signup.style.animation = 'enterLeft .2s ease-out 1 forwards'
					}
					this.shadowRoot.addEventListener('animationend', showSignup)
					break
				case 'login':
					signup.style.animation = 'leaveRight .2s ease-in 1 forwards'
					const showLogin = () => {
						this.shadowRoot.removeEventListener('animationend', showLogin)
						signup.style.display = 'none'
						login.style.display = 'block'
						login.style.animation = 'enterRight .2s ease-out 1 forwards'
					}
					this.shadowRoot.addEventListener('animationend', showLogin)
					break
			}
		}

		runZion(this)
	}

	connectedCallback() {

	}

}

customElements.define('view-home', Home)