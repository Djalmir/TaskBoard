const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>

</style>
<link rel="stylesheet" href="style.css">

<h1>Quadro</h1>
`

export default class Board extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({mode:'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		runZion(this)
  }
}

customElements.define('view-board', Board)