const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	#span{		
		position: relative;
	}

	#label {
		position: absolute;
		top: 1px;
		left: 8px;
		color: #ddd;
	}

	#input {
		background: #404040;
		border: none;
		outline: none;
		padding: 4px 8px;
		color: #ddd;
	}

	#input:focus~#label {
		top: -18px;
		left: 1px;
	}
</style>

<span id='span'>
	<input type='text' id='input' />
	<label for='input' id='label'></label>
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