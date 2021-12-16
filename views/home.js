const template = document.createElement('template')
template.innerHTML = /*html*/`
<link rel="stylesheet" href="style.css">
<style>
	h1{
		color: #0099ff;
		text-align: center;
	}
</style>

<section>
	<h1>{{message}}</h1>
	
	<view-login></view-login>
	<view-signup></view-signup>
</section>
`

export default class Home extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.message = 'Hello Zion!'
		this.users = [
			{
				name: 'Djalmir',
				age: 32
			},
			{
				name: 'Hosama',
				age: 27
			}
		]

		runZion(this)
	}
}

customElements.define('view-home', Home)