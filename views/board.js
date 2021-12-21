const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section {
		padding: 40px 0 0;
	}
</style>
<link rel="stylesheet" href="style.css">

<section>
	<h1>Quadro</h1>
</section>
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