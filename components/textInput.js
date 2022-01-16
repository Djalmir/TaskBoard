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

	.active {
		top: -17px !important;
		left: 2px !important;
		border: none;
		padding: 0 4px;
		border-radius: .2rem .2rem 0 0;
		border-bottom: none;
		background: var(--gray2);
		transform: scale(.9);
		cursor: default !important;
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

	:focus {
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

		this.zTag = this.getAttribute('zTag')

		if (this.zTag) {

			let span = this.shadowRoot.querySelector('#span')
			let newComp = document.createElement(this.zTag)
			newComp.id = `${ this.zTag }ZionInput`
			newComp.setAttribute('zion_focus', 'setActiveClass')
			newComp.setAttribute('zion_blur', 'removeActiveClass')
			newComp.setAttribute('style', `
				background: var(--gray2);
				border: none;
				border-radius: .1rem;
				outline: none;
				padding: 10px;
				margin: 0;
				color: #ddd;
				font-size: 16px;
				width: 100%;
			`)
			let oldComp = this.shadowRoot.querySelector('#input')
			span.insertBefore(newComp, oldComp)
			span.removeChild(oldComp)

			newComp = document.createElement('label')
			newComp.setAttribute('for', `${ this.zTag }ZionInput`)
			newComp.id = `${ this.zTag }Label`
			newComp.setAttribute('style', `
				position: absolute;
				top: 11px;
				left: 8px;
				color: #ddd;
				transition: .2s;
				font-size: 16px;
				font-weight: bold;
				cursor: text;
			`)
			newComp.setAttribute('innerText', this.placeholder)
			oldComp = this.shadowRoot.querySelector('#label')
			span.insertBefore(newComp, oldComp)
			span.removeChild(oldComp)
		}

		this.focus = () => {
			this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input').focus()
		}

		this.setActiveClass = () => {
			let label = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }Label` : '#label')
			if (label.classList.length > 0) {
				if (!Array.from(label.classList).includes('active'))
					label.classList.add('active')
			}
			else
				label.classList.add('active')
		}

		this.removeActiveClass = () => {
			let label = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }Label` : '#label')
			let input = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input')
			if (input.value == '') {
				if (label.classList.length > 0) {
					if (Array.from(label.classList).includes('active'))
						label.classList.remove('active')
				}
			}
		}

		this.checkValidity = () => {
			return this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input').checkValidity()
		}

		this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }Label` : '#label').innerText = this.getAttribute('placeholder')
		if (this.getAttribute('type'))
			this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input').type = this.getAttribute('type')

		let style = this.getAttribute('zStyle')
		if (style) {
			let input = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input')
			style = style.split(';')
			style.map((prop) => {
				prop = prop.split(':')
				prop.map((p,index)=>{
					prop[index] = p.trim()
				})
				input.style[prop[0]] = prop[1]
			})
			
		}

		runZion(this)
	}

	connectedCallback() {
		if (Array.from(this.attributes).find(attr => attr.nodeName == 'z-autofocus')) {
			this.focus()
		}
	}

}

customElements.define('z-input', TextInput)