const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	#span{
		background: var(--gray2);
		padding: 2px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: .2rem;
		transition: .2s;
	}

	#span:focus-within{
		/*border-radius: 0 .2rem .2rem;*/
	}

	#label {
		position: absolute;
		top: 11px;
		left: 8px;
		color: #ddd;
		transition: .2s;
		font-size: 16px;
		font-weight: bold;
		cursor: text;
	}

	#label.active {
		top: -17px;
		left: 2px;
		border: none;
		padding: 0 4px;
		border-radius: .2rem .2rem 0 0;
		border-bottom: none;
		background: var(--gray2);
		transform: scale(.9);
		cursor: default;
	}

	#input {
		background: var(--gray2);
		border: none;
		border-radius: .1rem;
		outline: none;
		padding: 10px;
		margin: 0;
		color: #ddd;
		font-size: 16px;
		width: 100%;
	}

	#input:focus {
		box-shadow: inset 0 0 5px #0000004d;
	}
</style>
<link rel="stylesheet" href="style.css">

<span id='span'>
	<input type='text' id='input' @focus='setActiveClass' @blur='removeActiveClass'/>
	<label for='input' id='label'></label>
</span>
`

export default class TextInput extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.setActiveClass = () => {
			let label = this.shadowRoot.querySelector('#label')
			if (label.classList.length > 0) {
				if (!Array.from(label.classList).includes('active'))
					label.classList.add('active')
			}
			else
				label.classList.add('active')
		}

		this.removeActiveClass = () => {
			let label = this.shadowRoot.querySelector('#label')
			let input = this.shadowRoot.querySelector('#input')
			if (input.value == '') {
				if (label.classList.length > 0) {
					if (Array.from(label.classList).includes('active'))
						label.classList.remove('active')
				}
			}
		}

		this.checkValidity = () => {
			return this.shadowRoot.querySelector('#input').checkValidity()
		}

		runZion(this)
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#label').innerText = this.getAttribute('placeholder')
		this.shadowRoot.querySelector('#input').type = this.getAttribute('type')
	}

}

customElements.define('c-input', TextInput)