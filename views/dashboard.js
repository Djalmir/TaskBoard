const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section {
		padding: 40px 0 0;
	}

	h1{
		border-bottom: 2px dashed var(--gray3)
	}
</style>
<link rel="stylesheet" href="style.css">

<section>
	<h1>Dashboard</h1>
</section>
`

export default class Dashboard extends HTMLElement {
  constructor(){
    super()
    this.attachShadow({mode:'open'})
    this.shadowRoot.appendChild(template.content.cloneNode(true))

		runZion(this)
  }
}

customElements.define('view-dashboard', Dashboard)