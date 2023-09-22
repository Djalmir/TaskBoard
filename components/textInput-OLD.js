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

	:-webkit-autofill,
	:-webkit-autofill:hover,
	:-webkit-autofill:focus {
		-webkit-box-shadow: inset 0 0 5px #0000004d, inset 0 0 0 1000px var(--gray2);
		box-shadow: inset 0 0 5px #0000004d, inset 0 0 0 1000px var(--gray2);
		-webkit-text-fill-color: var(--white)!important;
	}
</style>
<link rel="stylesheet" href="style.css">

<span id='span'>
	<input type='text' id='input' z-onfocus='setActiveClass' z-onblur='removeActiveClass'/>
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
			newComp.setAttribute('z-onfocus', 'setActiveClass')
			newComp.setAttribute('z-onblur', 'removeActiveClass')
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
		else if (!this.getAttribute('type'))
			this.setAttribute('type', 'text')

		this.input = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }ZionInput` : '#input')
		this.label = this.shadowRoot.querySelector(this.zTag ? `#${ this.zTag }Label` : '#label')

		this.focus = () => {
			this.input.focus()
		}

		this.setActiveClass = () => {
			if (this.label.classList.length > 0) {
				if (!Array.from(this.label.classList).includes('active'))
					this.label.classList.add('active')
			}
			else
				this.label.classList.add('active')
		}

		this.removeActiveClass = () => {
			if (this.input.value.trim() == '') {
				if (this.label.classList.length > 0) {
					if (Array.from(this.label.classList).includes('active'))
						this.label.classList.remove('active')
				}
			}
		}

		this.checkValidity = () => {
			return this.input.checkValidity()
		}

		this.label.innerText = this.getAttribute('placeholder')
		if (this.getAttribute('type'))
			this.input.type = this.getAttribute('type')

		let style = this.getAttribute('zStyle')
		if (style) {
			style = style.split(';')
			style.map((prop) => {
				prop = prop.split(':')
				prop.map((p, index) => {
					prop[index] = p.trim()
				})
				this.input.style[prop[0]] = prop[1]
			})
		}

		this.checkClass = () => {
			if (this.input.value.trim())
				this.setActiveClass()
			else if (this.shadowRoot.activeElement != this.input)
				this.removeActiveClass()
		}

		document.addEventListener('updated', (e) => {
			if (e.detail.component == this.input) {
				this.checkClass()
			}
		})

		ZION(this)
			.then(() => {
				if (this.input.value.trim())
					this.setActiveClass()
				else
					this.removeActiveClass()

				if (Array.from(this.attributes).find(attr => attr.nodeName == 'z-autofocus')) {
					this.focus()
				}
			})
	}
}

customElements.define('z-input', TextInput)