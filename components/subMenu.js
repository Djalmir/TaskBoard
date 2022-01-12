export default class SubMenu extends HTMLElement {
	constructor() {
		super()

		const shadow = this.attachShadow({mode: 'open'})

		const link = shadow.appendChild(document.createElement('link'))
		link.rel = 'stylesheet'
		link.href = 'style.css'

		const style = shadow.appendChild(document.createElement('style'))
		style.textContent = /*css*/`
			#wrapper {
				position: absolute;
				z-index: 7;
				top: 0;
				left: 0;
				width: 200px;
				background: var(--gray2);
				border: 1px solid var(--darkgray3);
				border-radius: .3rem;
				padding: 1px;
				display: none;
				flex-direction: column;
				gap: 1px;
				transform-origin: left top;
			}

			.item {
				width: 100%;
				background: var(--darkgray2);
				color: var(--gray4);
			}

			@keyframes grow {
				from {
					transform: scale(0);
				}
				to {
					transform: scale(1);
				}
			}

			@keyframes hide {
				from {
					transform: scale(1);
				}
				to {
					transform: scale(0);
				}				
			}
		`

		const wrapper = shadow.appendChild(document.createElement('div'))
		wrapper.id = 'wrapper'

		this.show = (e, items) => {
			wrapper.innerHTML = ''
			wrapper.style.display = 'flex'
			wrapper.style.top = e.clientY + window.scrollY + 'px'
			if (e.clientX + 200 > window.innerWidth) {
				wrapper.style.left = e.clientX + window.scrollX - 200 + 'px'
				wrapper.style.transformOrigin = 'right top'
			}
			else {
				wrapper.style.left = e.clientX + window.scrollX + 'px'
				wrapper.style.transformOrigin = 'left top'
			}
			wrapper.style.animation = 'grow .1s linear'
			items.map((item) => {
				let bt = wrapper.appendChild(document.createElement('button'))
				bt.classList.add('item')
				bt.innerText = item.name
				bt.onclick = item.action
			})

			const hideSubMenu = () => {
				const removeSubMenu = (e) => {
					this.shadowRoot.removeEventListener('animationend', removeSubMenu)
					wrapper.style.display = 'none'
					window.onclick = ''
				}

				wrapper.style.animation = 'hide .1s linear'
				this.shadowRoot.addEventListener('animationend', removeSubMenu)
			}

			window.onclick = () => hideSubMenu()
			if(e.preventDefault)
				e.preventDefault()
		}
	}
}

customElements.define('sub-menu', SubMenu)