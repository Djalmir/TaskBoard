const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>

</style>
<link rel="stylesheet" href="style.css">

<h1>Tela de cadastro</h1>
`

export default class Signup extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		runZion(this)
  }
}

customElements.define('view-signup', Signup)