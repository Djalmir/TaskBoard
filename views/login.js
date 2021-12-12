const template = document.createElement('template')
template.innerHTML = /*html*/`
	<link rel="stylesheet" href="style.css">
	<style>
		section{
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 40px 0;
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
			<c-input type='password' placeholder='Senha' z-model='password'></c-input>
			<button type='submit' class='blueBt'>Entrar</button>
		</form>

		<button @click='setEmail'>setar email</button>
		<button @click='setPassword'>setar senha</button>

		<p z-for='text in texts' style='color:red'>
			Opa esse é o {{text.msg}}.<br>
			Ele foi escrito em {{text.date}}
		</p>
		
		<hr style='width:100%; opacity:.1; margin-top: 50px;'/>
		
		<ul z-for='box in boxes'>
			<b>{{box.name}}</b>
			<li z-for='fruit in box.fruits'>{{fruit}}</li>
		</ul>
		
		<p z-for='text in texts'>
			{{text.msg}}
		</p>

		<ul z-for='box in boxes'>
			<b>{{box.name}}</b>
			<li z-for='fruit in box.fruits'>
				{{fruit}}
			</li>
		</ul>
		<p z-for='text in texts'>
			Olha só o testezinho do piá!<br/>
			{{text.msg}}
		</p>

		<c-input z-for="text in texts" type="text" placeholder="teste" style="margin-bottom:10px;"></c-input>

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
		this.texts = [
			{
				msg: 'texto 1',
				date: '10/12/2021'
			},
			{
				msg: 'texto 2',
				date: '11/12/2021'
			},
			{
				msg: 'texto 3',
				date: '12/12/2021'
			}
		]
		this.boxes = [
			{
				name: 'Frutas Grandes',
				fruits: [
					'Melancia',
					'Melão',
					'Jaca'
				]
			},
			{
				name: 'Frutas Pequenas',
				fruits: [
					'Uva',
					'Morango',
					'Banana'
				]
			}
		]

		this.submit = () => {
			if (this.email.trim() == '') {
				console.log('lol')
				errorMsg.show('Informe seu email')
			}
			else if (this.password.trim() == '') {
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

		this.setPassword = () => {
			this.password = '123456'
		}

		this.keydown = (e) => {
			if (e.key == 'Enter')
				this.submit()
		}

		runZion(this)
	}
}

customElements.define('view-login', Login)