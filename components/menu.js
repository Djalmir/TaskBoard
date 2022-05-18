const template = document.createElement('template')
template.innerHTML = /*html*/`
	<style>
		#header {
			position: fixed;
			top: 0;
			left: 0;
			background: var(--darkgray2);
			height: 40px;
			width: 100%;
			display: flex;
			align-items: center;
			z-index: 5;
		}
		
		#menuBtContainer {
			width: 40px;
			max-width: 300px;
			height: 100%;
			background: var(--darkgray1);
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 4px;
			box-sizing: border-box;
			transition: .4s;
		}
		
		#menuBt {
			position: relative;
			width: 32px;
			height: 32px;
			border-radius: 0.2rem;
			border: none;
			outline: none;
			padding: 6px;
			background: transparent;
			cursor: pointer;
			transition: .1s;
		}
		
		#menuSVG {
			width: 100%;
			transform-origin: center;
			transition: transform 0.8s, stroke .2s;
			stroke: var(--gray3);
		}

		#menuBt:hover #menuSVG,
		#menuBt:focus #menuSVG{
			stroke: var(--gray4);
		}
				
		#titleSpan {
			margin: 0 10px;
			font-weight:bold;
			text-transform: capitalize;
			white-space: nowrap;
		}

		#menu {
			background: var(--darkgray3);
			position: fixed;
			top: 0;
			left: -310px;
			width: 100%;
			max-width: 300px;
			height: 100%;
			padding: 40px 0 20px;
			box-sizing: border-box;
			z-index: 4;
			transition: .2s;
			user-select: none;
			border-right: 1px solid var(--darkgray1) !important;
			display: flex;
			flex-direction: column;
		}

		#menuContainer {
			padding: 4px;
			margin: 13px 4px;
			border-radius: .3rem;
			/*border-left: 1px solid var(--darkgray1);
			border-top: 1px solid var(--darkgray1);
			border-right: 1px solid var(--darkgray4);
			border-bottom: 1px solid var(--darkgray4);
			background: var(--darkgray2);*/
			box-sizing:border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
		}
		
		#menuContainer button,
		#menu button {
			position: relative;
			padding: 8px;
			margin: 2px 4px;
			box-sizing: border-box;
			background: linear-gradient(to top, #252525, var(--darkgray3));
			border-top: 1px solid var(--darkgray4);
			border-left: 1px solid var(--darkgray4);
			border-bottom: 1px solid var(--darkgray2);
			border-right: 1px solid var(--darkgray2);
			border-radius: .3rem;
			cursor: pointer;
			text-decoration: none;
			color: #ddd;
		}

		#menuContainer button {
			margin: 0 2px 2px;
			border-top: 1px solid var(--darkgray4);
			border-left: 1px solid var(--darkgray4);
			border-bottom: 1px solid var(--darkgray1);
			border-right: 1px solid var(--darkgray1);
		}

		#menu button:active,
		#menuContainer button:active {
			transform: none;
			border-top: 1px solid var(--darkgray1);
			border-left: 1px solid var(--darkgray1);
			border-bottom: 1px solid var(--darkgray4);
			border-right: 1px solid var(--darkgray4);
		}
		
		#menu button.active,
		#menuContainer button.active {
			border-top: 1px solid var(--darkgray1);
			border-left: 1px solid var(--darkgray1);
			border-bottom: 1px solid var(--darkgray4);
			border-right: 1px solid var(--darkgray4);
			font-weight: bold;
			filter: brightness(.8);
		}
		
		#menu button.active::before,
		#menuContainer button.active::before {
			content: '';
			position: absolute;
			top: calc(50% - 8px);
			left: 0;
			width: 2px;
			height: 16px;
			border-radius: 0 50% 50% 0;
			background: var(--blue);
			box-shadow: 1px 0px 3px #0099fff0;
		}

		#menu #taskboardBt.active::before {
			background: var(--green);
			box-shadow: 1px 0px 3px #77FF77f0;
		}

		#shadow {
			transform: scale(0);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: var(--transparentBg);
			z-index: 3;
			opacity: 0;
			transition: opacity .2s;
			display: block;
		}
	</style>
	<link rel="stylesheet" href="style.css">

	<header id='header'>
		<div id='menuBtContainer'>
			<button id='menuBt' z-on:click='showMenu'>
				<svg id = "menuSVG" viewBox = "0 0 32 32" >
					<g style="stroke-width:6; stroke-linecap:round;">
						<line x1="3" y1="3" x2="29" y2="3">
							<animate class="showAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="3" to="18" dur=".4s" fill="freeze" />
							<animate class="showAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="3" to="13" dur=".4s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="10" to="3" dur=".4s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="13" to="3" dur=".4s" fill="freeze" />
						</line>
						<line x1="3" y1="13" x2="29" y2="13" />
						<line x1="3" y1="23" x2="29" y2="23">
							<animate class="showAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="3" to="18" dur=".4s" fill="freeze" />
							<animate class="showAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="23" to="13" dur=".4s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="x1" begin="indefinite" from="10" to="3" dur=".4s" fill="freeze" />
							<animate class="hideAnimation" attributeType="XML" attributeName="y2" begin="indefinite" from="13" to="23" dur=".4s" fill="freeze" />
						</line>
					</g>
				</svg >
			</button>
		</div>
		<span id='titleSpan'></span>
	</header>

	<nav id='menu'>
		<button data-hash='#/taskboard' @click="goTo('#/taskboard')" id='taskboardBt'>TaskBoard</button>
		<nav id="menuContainer">
		</nav>
		<button @click="logout">Sair</button>
	</nav>

	<div id='shadow' @click='showMenu'></div>
`

export default class Menu extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		//DATA
		this.titleSpan = this.shadowRoot.querySelector('#titleSpan')
		this.showingMenu = false
		this.boards = []

		//METODOS
		this.showMenu = () => {
			this.showingMenu = !this.showingMenu
			let shadowDiv = this.shadowRoot.querySelector('#shadow')
			let menuBtContainer = this.shadowRoot.querySelector('#menuBtContainer')
			let menuSVG = this.shadowRoot.querySelector('#menuSVG')
			let menu = this.shadowRoot.querySelector('#menu')
			if (this.showingMenu) {
				this.updateBoards(this.boards)
				shadowDiv.style.transform = 'scale(1)'
				shadowDiv.style.opacity = '1'
				menuBtContainer.style.width = '300px'
				// menuSVG.style.stroke = '#7d7d7d'
				menu.style.left = '0'

				// shadow.addEventListener('transitionend', btToArrow)
				setTimeout(() => {
					let animationElements = Array.from(this.shadowRoot.querySelectorAll('.showAnimation'))
					animationElements.map((element) => {
						element.beginElement()
					})
					menuSVG.style.transform = "rotateZ(180deg)"
				}, 125)
			}
			else {
				shadowDiv.style.opacity = '0'
				shadowDiv.addEventListener('transitionend', this.removeShadow)
				menuBtContainer.style.width = '40px'
				// menuSVG.style.stroke = '#bdbdbd'
				menu.style.left = '-310px'

				// shadow.addEventListener('transitionend', arrowToBt)
				let animationElements = Array.from(this.shadowRoot.querySelectorAll('.hideAnimation'))
				animationElements.map((element) => {
					element.beginElement()
				})
				menuSVG.style.transform = "rotateZ(0deg)"
			}
		}

		this.goTo = (hash) => {
			location.hash = hash
		}

		this.removeShadow = () => {
			let shadowDiv = this.shadowRoot.querySelector('#shadow')
			shadowDiv.removeEventListener('transitionend', this.removeShadow)
			shadowDiv.style.transform = 'scale(0)'
		}

		this.updateActiveLink = (hash) => {
			let menu = this.shadowRoot.querySelector('#menu')
			let menuContainer = this.shadowRoot.querySelector('#menuContainer')
			if (menu.querySelector('.active'))
				menu.querySelector('.active').classList.remove('active')
			else if (menuContainer.querySelector('.active'))
				menuContainer.querySelector('.active').classList.remove('active')
			let buttons = [...Array.from(menu.querySelectorAll('button')), ...Array.from(menuContainer.querySelectorAll('button'))]
			let activeLink = buttons.find(button => button.getAttribute('data-hash') == hash)
			if (activeLink)
				activeLink.classList.add('active')
		}

		this.updateBoards = (boards) => {
			let container = this.shadowRoot.querySelector('#menuContainer')
			this.boards = boards
			container.innerHTML = ''
			boards.map((board) => {
				let button = container.appendChild(document.createElement('button'))
				button.onclick = () => this.goTo(`#/board?id=${ board._id }`)
				button.setAttribute('data-hash', `#/board?id=${ board._id }`)
				button.innerText = board.name
				if (button.getAttribute('data-hash') == window.location.hash)
					this.updateActiveLink(button.getAttribute('data-hash'))
			})
		}

		runZion(this)
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#titleSpan').innerText = this.getAttribute('titleSpan')
	}


}

customElements.define('z-menu', Menu)