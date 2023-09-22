import * as zionComponents from 'https://zioncomponents.razion.app.br/zionComponents.js'
import Menu from './components/menu.js'
import ErrorMsgs from './components/errorMsgs.js'
// import TextInput from './components/textInput.js'
import SubMenu from './components/subMenu.js'
import Confirm from './components/confirm.js'
import zionLoading from './components/loading.js'

import Home from './views/home.js'
import Login from './views/login.js'
import Signup from './views/signup.js'
import TaskBoard from './views/taskboard.js'
import Board from './views/board.js'

import User from './services/User.js'

const routes = {
	'#/': Home,
	'#/login': Login,
	'#/signup': Signup,
	'#/taskboard': TaskBoard,
	'#/board': Board
}

if (appMenu.showingMenu)
	appMenu.showMenu()
appMenu.style.display = 'none'

function onRouteChanged() {
	const hash = window.location.hash

	localStorage.setItem('RazionTaskboard.lastHash', hash)

	if (!(app instanceof HTMLElement)) {
		throw new ReferenceError('No router view element available for rendering')
	}

	errorMsg.closeAll()
	const view = new routes[hash.split('?')[0]]()

	while (app.firstChild)
		app.removeChild(app.firstChild)
	app.appendChild(view)

	if (hash == '#/')
		appMenu.style.display = 'none'
	else {
		appMenu.style.display = 'block'

		appMenu.titleSpan.innerText = ''
		let img = appMenu.titleSpan.appendChild(document.createElement('img'))
		img.src = './assets/loading.svg'
		img.style.width = '24px'

		let hashName = hash.replace(/[#/]/g, '').split('?')[0]
		if (hashName.toLowerCase() == 'board') {
			appLoading.loading = true
			loadingLock = true
			User.getBoardName(hash.replace(/[#/]/g, '').split('=')[1])
				.then((res) => {
					appMenu.titleSpan.innerText = res.name
				})
		}
		else
			appMenu.titleSpan.innerText = hashName

		appMenu.updateActiveLink(hash)

		if (appMenu.showingMenu)
			appMenu.showMenu()
		appMenu.removeShadow()
	}

	app.currentView = view
	ZION(view)
}

if (!window.location.hash)
	window.location.hash = '#/'

onRouteChanged()
window.addEventListener('hashchange', onRouteChanged)