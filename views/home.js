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

	#successMsgContainer{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: none;
		justify-content: center;
		align-items: center;
	}

	#shadow {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background: var(--transparentBg);
		z-index: 1;
	}

	#successMsg {
		z-index: 2;
		margin: 20px;
		background: var(--darkgray4);
		border-radius: .5rem;
	}

	#successMsg header {
		background: var(--darkgray4);
		padding: 12px 0 0;
		border-radius: .2rem .2rem 0 0;
		font-weight: bolder;
	}

	#successMsg section {
		background: var(--darkgray3);
		box-shadow: inset 0 0 5px var(--transparentBg);
		margin: 12px 8px;
		border-radius: .2rem;
	}

	#successMsg section p {
		margin: 0 8px;
	}

	#successMsg footer {
		background: var(--darkgray4);
		padding: 0 0 12px;
		border-radius: 0 0 .2rem .2rem;
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

	<div id="successMsgContainer">
		<div id="shadow"></div>
		<div id="successMsg">
			<header>Boas Vindas!</header>
			<section>
				<p>
					Seu cadastro foi efetuado com sucesso!<br/>
					Efetuaremos seu primeiro login automaticamente em {{counter}} segundo{{counter > 1 ? 's' : ''}}.
				</p>
			</section>
			<footer>
				<button class="greenBt" id="autoLoginBt">Fazer login agora</button>
			</footer>
		</div>
	</div>
</section>
`

import Visitor from '../services/Visitor.js'
export default class Home extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.counter = 5

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

		this.autoLogin = (res) => {
			Visitor.login({
				email: res.email,
				password: res.pw
			})
				.then((res) => {
					app.user = res.user
					localStorage.setItem('Razion.user', JSON.stringify(app.user))
					window.location.hash = '#/taskboard'
				})
				.catch((err) => {
					errorMsg.show({message: err.error})
				})
		}

		document.addEventListener('successSignup', (e) => {
			let res = e.detail.res
			let successMsgContainer = this.shadowRoot.querySelector('#successMsgContainer')
			successMsgContainer.style.display = 'flex'
			successMsgContainer.style.animation = '.2s linear fadeIn 1'
			this.shadowRoot.querySelector('#autoLoginBt').onclick = () => {
				clearInterval(timer)
				this.autoLogin(res)
			}
			let timer = setInterval(() => {
				if (--this.counter < 1) {
					clearInterval(timer)
					this.autoLogin(res)
				}
			}, 1000)
		})

		runZion(this)
	}
}

customElements.define('view-home', Home)