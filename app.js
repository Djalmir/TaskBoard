import Menu from './components/menu.js'
import ErrorMsgs from './components/errorMsgs.js'
import TextInput from './components/textInput.js'
import SubMenu from './components/subMenu.js'
import Confirm from './components/confirm.js'

import Home from './views/home.js'
import Login from './views/login.js'
import Signup from './views/signup.js'
import Dashboard from './views/dashboard.js'
import Board from './views/board.js'

const routes = {
	'#/': Home,
	'#/login': Login,
	'#/signup': Signup,
	'#/dashboard': Dashboard,
	'#/board': Board
}

function onRouteChanged() {
	const hash = window.location.hash

	localStorage.setItem('RazionTaskboard.lastHash', hash)

	if (!(app instanceof HTMLElement)) {
		throw new ReferenceError('No router view element available for rendering')
	}

	errorMsg.closeAll()
	const view = new routes[hash.split('?')[0]]()
	app.innerHTML = ''
	app.appendChild(view)

	if (hash !== '#/') {
		appMenu.style.display = 'block'
		appMenu.titleSpan.innerText = hash.replace(/[#/]/g, '').split('?')[0]
		appMenu.updateActiveLink(hash)

		if (appMenu.showingMenu)
			appMenu.showMenu()
	}
	else
		appMenu.style.display = 'none'
}

if (!window.location.hash)
	window.location.hash = '#/'

onRouteChanged()
window.addEventListener('hashchange', onRouteChanged)