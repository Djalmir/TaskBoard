const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	#span{
		
	}
</style>

<span id='span'>
	<label for='input' id='label'></label>
	<input type='text' id='input' />
</span>
`

export default class TextInput extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#label').innerText = this.getAttribute('text')		
	}

}

customElements.define('text-input', TextInput)