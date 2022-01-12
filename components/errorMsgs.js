export default class ErrorMsgs extends HTMLElement {
	constructor() {
		super()

		const shadow = this.attachShadow({mode: 'open'})

		const link = shadow.appendChild(document.createElement('link'))
		link.rel = 'stylesheet'
		link.href = 'style.css'

		const style = shadow.appendChild(document.createElement('style'))
		style.textContent = /*css*/`
			#errorMsgsContainer {
				position: fixed;
				top: 0;
				right: 0;
				display: flex;
				flex-direction: column;
				align-items: flex-end;
				gap: 5px;
				padding: 5px;
				z-index: 6;
			}

			.errorMsg {
				box-sizing: border-box;
				background: var(--darkgray3);
				display: flex;
				align-items: center;
				gap: 15px;
				padding: 10px 14px;
				box-sizing: border-box;
				transition: .2s;
				border-radius: .2rem;
				border-left: 1px solid var(--gray1);
				border-top: 1px solid var(--gray1);
				border-right: 1px solid var(--darkgray2);
				border-bottom: 1px solid var(--darkgray2);
			}
			
			.errorMsgText {
				flex: 1;
				font-weight: bolder;
				color: var(--red);
			}
			
			.closeErrorBtn {
				width: 32px;
				height: 32px;
				border-radius: 30%;
				background: transparent;
				cursor: pointer;
				display: flex;
				align-items: center;
				border-left: 1px solid var(--gray1);
				border-top: 1px solid var(--gray1);
				border-right: 1px solid var(--darkgray2);
				border-bottom: 1px solid var(--darkgray2);
				transition: .2s;
			}

			.closeErrorBtn:hover,
			.closeErrorBtn:focus {
				transform: scale(1.04);
			}

			.closeErrorBtn:active {
				transform scale(.98);
				border-left: 1px solid var(--darkgray2);
				border-top: 1px solid var(--darkgray2);
				border-right: 1px solid var(--gray1);
				border-bottom: 1px solid var(--gray1);
			}

			.closeErrorBtn svg {
				stroke: var(--red);
				stroke-width: 3;
				stroke-linecap: round;
			}

			@keyframes show {
				from {
					transform: translateX(125%);
				}

				to {
					transform: translateX(0);
				}
			}

			@keyframes hide {
				from {
					transform: translateX(0);
				}

				to {
					transform: translateX(125%);
				}
			}
		`

		const wrapper = shadow.appendChild(document.createElement('div'))
		wrapper.id = 'errorMsgsContainer'

		this.getMessages = () => {
			if (wrapper.children) {
				return Array.from(wrapper.children)
			}
			return false
		}

		this.show = (error) => {
			let existingMsg
			if (error.field)
				existingMsg = Array.from(wrapper.children).find(msg => msg.field == error.field)
			else
				existingMsg = Array.from(wrapper.children).find(msg => msg.firstChild.textContent == error.message)

			if (existingMsg) {
				existingMsg.closeMsg()
			}

			const errorMsg = wrapper.insertBefore(document.createElement('div'), wrapper.children[0])
			errorMsg.classList.add('errorMsg')
			errorMsg.field = error.field

			const errorMsgText = errorMsg.appendChild(document.createElement('span'))
			errorMsgText.classList.add('errorMsgText')
			errorMsgText.textContent = error.message

			const closeErrorBtn = errorMsg.appendChild(document.createElement('button'))
			closeErrorBtn.classList.add('closeErrorBtn')
			closeErrorBtn.onclick = () => {errorMsg.closeMsg()}
			closeErrorBtn.innerHTML = `
				<svg viewBox="0 0 20 20">
					<line x1="5" y1="5" x2="15" y2="15" />
					<line x1="5" y1="15" x2="15" y2="5" />
				</svg>
			`

			errorMsg.style.animation = 'show .2s ease-out 1'

			errorMsg.closeMsg = () => {
				errorMsg.style.animation = 'hide .2s ease-in 1 forwards'
				wrapper.addEventListener('animationend', removeMsg)
			}

			const removeMsg = () => {
				wrapper.removeEventListener('animationend', removeMsg)
				wrapper.removeChild(errorMsg)
			}
		}

		this.closeMsg = (child) => {
			const removeMsg = () => {
				wrapper.removeEventListener('animationend', removeMsg)
				wrapper.removeChild(child)
			}
			child.style.animation = 'hide .2s ease-in 1 forwards'
			wrapper.addEventListener('animationend', removeMsg)
		}

		this.closeAll = () => {
			Array.from(wrapper.children).map((errorMsg) => {
				errorMsg.closeMsg()
			})
		}

		this.callAtention = () => {
			navigator.vibrate(['100', '50', '200'])
			Array.from(wrapper.children).map((errorMsg) => {
				const removeAnimation = () => {
					errorMsg.style.animation = ''
					errorMsg.removeEventListener('animationend', removeAnimation)
				}
				errorMsg.style.animation = 'atention .2s linear 2'
				errorMsg.addEventListener('animationend', removeAnimation)
			})
		}
	}
}

customElements.define('error-msgs', ErrorMsgs)