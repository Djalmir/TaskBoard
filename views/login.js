export default class Login extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({mode:'open'})
    
    const style = shadow.appendChild(document.createElement('style'))
    style.textContent = `
			section{
				position: absolute;
				inset: 0;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			form {
				display: flex;
				flex-direction: column;
				gap: 8px;
				align-items: center;
				justify-content: center;
			}
    `
    const section = shadow.appendChild(document.createElement('section'))

    const form = section.appendChild(document.createElement('form'))
		form.action = '#'
		form.onsubmit = () => this.submit()

		const emailInput = form.appendChild(document.createElement('text-input'))
		// const emailInput = document.createElement('text-input')
		// emailInput.setLabel('E-mail')
		emailInput.setAttribute('text', 'E-mail')
		// form.appendChild(emailInput)


		const passwordInput = form.appendChild(document.createElement('text-input'))
		// const passwordInput = document.createElement('text-input')
		// passwordInput.setLabel('Senha')
		// passwordInput.text = 'Senha'
		passwordInput.setAttribute('text', 'Senha')
		// form.appendChild(passwordInput)
  }
}

customElements.define('v-login', Login)