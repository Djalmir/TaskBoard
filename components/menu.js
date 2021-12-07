class Menu extends HTMLElement {
	constructor() {
		super()
		const shadow = this.attachShadow({mode: 'open'})

		const style = shadow.appendChild(document.createElement('style'))
		style.textContent = `
		#header {
			position: fixed;
			top: 0;
			left: 0;
			background: #161616;
			height: 40px;
			width: 100%;
			display: flex;
			align-items: center;
			/* box-shadow: 0 1px 10px #0000004d; */
			z-index: 5;
		}
		
		#menuBtContainer {
			width: 40px;
			max-width: 300px;
			height: 100%;
			background: #101010;
			display: flex;
			align-items: center;
			justify-content: flex-end;
			padding: 0 4px;
			box-sizing: border-box;
			transition: .4s;
			/* box-shadow: 0 0 5px #0000004d; */
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
		}
		
		#menuSVG {
			width: 100%;
			transform-origin: center;
			transition: 0.8s;
			stroke: #bdbdbd;
		}

		#titleSpan {
			text-transform: capitalize;
		}

		#menu {
			background: linear-gradient(315deg, #202020, #101010);
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
			border-right: 1px solid #101010 !important;
			display: flex;
			flex-direction: column;
		}
		
		#menu a {
			position: relative;
			padding: 8px;
			box-sizing: border-box;
			background: linear-gradient(to top, #252525, #202020);
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
			background: #0099ff;
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
		`

		const header = shadow.appendChild(document.createElement('header'))
		header.id = 'header'

		const menuBtContainer = header.appendChild(document.createElement('div'))
		menuBtContainer.id = 'menuBtContainer'

		const menuBt = menuBtContainer.appendChild(document.createElement('button'))
		menuBt.id = 'menuBt'
		menuBt.onclick = () => this.showMenu()
		menuBt.innerHTML = `
			<svg id="menuSVG" viewBox="0 0 32 32">
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
			</svg>
		`

		const titleSpan = header.appendChild(document.createElement('span'))
		titleSpan.id = 'titleSpan'

		const menu = shadow.appendChild(document.createElement('nav'))
		menu.id = 'menu'

		//BOTÕES
		const loginLink = menu.appendChild(document.createElement('a'))
		loginLink.href = '#/'
		loginLink.innerText = 'Login'
		// loginLink.path = '/'
		// loginLink.onclick = () => onNavigate(loginLink.path)
		loginLink.classList.add('active')

		const signupLink = menu.appendChild(document.createElement('a'))
		signupLink.href = '#/signup'
		signupLink.innerText = 'Cadastro'
		// signupLink.path = '/signup'
		// signupLink.onclick = () => onNavigate(signupLink.path)

		const dashboardLink = menu.appendChild(document.createElement('a'))
		dashboardLink.href = '#/dashboard'
		dashboardLink.innerText = 'Dashboard'
		// dashboardLink.path = '/dashboard'
		// dashboardLink.onclick = () => onNavigate(dashboardLink.path)

		const boardLink = menu.appendChild(document.createElement('a'))
		boardLink.href = '#/board'
		boardLink.innerText = 'Board'
		// boardLink.path = '/board'
		// boardLink.onclick = () => onNavigate(boardLink.path)

		//SOMBRA
		const shadowDiv = shadow.appendChild(document.createElement('div'))
		shadowDiv.id = 'shadow'
		shadowDiv.onclick = () => this.showMenu()

		//DATA
		this.titleSpan = titleSpan
		this.showingMenu = false

		//MÉTODOS
		this.showMenu = () => {
			this.showingMenu = !this.showingMenu
			if (this.showingMenu) {
				shadowDiv.style.transform = 'scale(1)'
				shadowDiv.style.opacity = '1'
				menuBtContainer.style.width = '300px'
				shadow.querySelector('#menuSVG').style.stroke = '#7d7d7d'
				menu.style.left = '0'

				// shadow.addEventListener('transitionend', btToArrow)
				setTimeout(() => {
					let animationElements = Array.from(shadow.querySelectorAll('.showAnimation'))
					animationElements.map((element) => {
						element.beginElement()
					})
					shadow.getElementById('menuSVG').style.transform = "rotateZ(180deg)"
				}, 125)
			}
			else {
				shadowDiv.style.opacity = '0'
				shadowDiv.addEventListener('transitionend', this.removeShadow)
				menuBtContainer.style.width = '40px'
				shadow.querySelector('#menuSVG').style.stroke = '#bdbdbd'
				menu.style.left = '-310px'

				// shadow.addEventListener('transitionend', arrowToBt)
				let animationElements = Array.from(shadow.querySelectorAll('.hideAnimation'))
				animationElements.map((element) => {
					element.beginElement()
				})
				shadow.getElementById('menuSVG').style.transform = "rotateZ(0deg)"
			}
		}

		this.removeShadow = () => {
			shadowDiv.removeEventListener('transitionend', this.removeShadow)
			shadowDiv.style.transform = 'scale(0)'
		}

		this.updateActiveLink = (hash) => {
			menu.querySelector('.active').classList.remove('active')
			let as = Array.from(menu.querySelectorAll('a'))
			let activeLink = as.find(a => a.hash == hash)
			activeLink.classList.add('active')
		}
	}
}

customElements.define('c-menu', Menu)