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
			transition: 0.8s;
			stroke: var(--gray3);
		}

		#titleSpan {
			margin: 0 10px;
			font-weight:bold;
			text-transform: capitalize;
		}

		#menu {
			background: linear-gradient(315deg, var(--darkgray3), var(--darkgray1));
			position: fixed;
			top: 0;
			left: -310px;
			width: 100%;
			max-width: 300px;
			height: 100%;
			padding: 60px 0 0;
			box-sizing: border-box;
			z-index: 4;
			transition: .2s;
			user-select: none;
			border-right: 1px solid var(--darkgray1) !important;
			display: flex;
			flex-direction: column;
		}
		
		#menu a {
			position: relative;
			padding: 8px;
			box-sizing: border-box;
			background: linear-gradient(to top, #252525, var(--darkgray3));
			border: none;
			margin: 0 0 2px;
			cursor: pointer;
			opacity: .8;
			text-decoration: none;
			color: #ddd;
		}
		
		#menu a:hover {
			opacity: 1;
		}
		
		#menu a:active {
			background: linear-gradient(to top, #151515, #232323)!important;
			transform: scale(.98)
		}
		
		#menu a.active {
			background: linear-gradient(to bottom, #181818, #222222);
			font-weight: bold;
			opacity: 1;
		}
		
		#menu a.active::before {
			content: '';
			position: absolute;
			top: calc(50% - 8px);
			left: 0;
			width: 2px;
			height: 16px;
			border-radius: 0 50% 50% 0;
			background: var(--blue);
		}

		#shadow {
			transform: scale(0);
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100vh;
			background: #0000008d;
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
					<g style="stroke-width:6; stroke-linecap:round; stroke=red;">
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
		<a href='#/' class='active'>Login</a>
		<a href='#/signup'>Cadastro</a>
		<a href='#/dashboard'>Dashboard</a>
		<a href='#/board'>Board</a>
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

		//METODOS
		this.showMenu = () => {
			this.showingMenu = !this.showingMenu
			let shadowDiv = this.shadowRoot.querySelector('#shadow')
			let menuBtContainer = this.shadowRoot.querySelector('#menuBtContainer')
			let menuSVG = this.shadowRoot.querySelector('#menuSVG')
			let menu = this.shadowRoot.querySelector('#menu')
			if (this.showingMenu) {
				shadowDiv.style.transform = 'scale(1)'
				shadowDiv.style.opacity = '1'
				menuBtContainer.style.width = '300px'
				menuSVG.style.stroke = '#7d7d7d'
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
				menuSVG.style.stroke = '#bdbdbd'
				menu.style.left = '-310px'

				// shadow.addEventListener('transitionend', arrowToBt)
				let animationElements = Array.from(this.shadowRoot.querySelectorAll('.hideAnimation'))
				animationElements.map((element) => {
					element.beginElement()
				})
				menuSVG.style.transform = "rotateZ(0deg)"
			}
		}

		this.removeShadow = () => {
			let shadowDiv = this.shadowRoot.querySelector('#shadow')
			shadowDiv.removeEventListener('transitionend', this.removeShadow)
			shadowDiv.style.transform = 'scale(0)'
		}

		this.updateActiveLink = (hash) => {
			let menu = this.shadowRoot.querySelector('#menu')
			menu.querySelector('.active').classList.remove('active')
			let as = Array.from(menu.querySelectorAll('a'))
			let activeLink = as.find(a => a.hash == hash)
			activeLink.classList.add('active')
		}

		runZion(this)
	}

	connectedCallback() {
		this.shadowRoot.querySelector('#titleSpan').innerText = this.getAttribute('titleSpan')
	}


}

customElements.define('c-menu', Menu)