import Home from './views/home.js'
import Login from './views/login.js'
import Signup from './views/signup.js'
import Dashboard from './views/dashboard.js'
import Board from './views/board.js'

import Menu from './components/menu.js'
import ErrorMsgs from './components/errorMsgs.js'
import TextInput from './components/textInput.js'

const routes = {
	'#/': Home,
	'#/login': Login,
	'#/signup': Signup,
	'#/dashboard': Dashboard,
	'#/board': Board
}

function onRouteChanged() {
	const hash = window.location.hash

	if (!(app instanceof HTMLElement)) {
		throw new ReferenceError('No router view element available for rendering')
	}
	const view = new routes[hash]()
	app.innerHTML = ''
	app.appendChild(view)

	appMenu.titleSpan.innerText = hash.replace('#', '').replace('/', '') || 'Home'
	appMenu.updateActiveLink(hash)

	if (appMenu.showingMenu)
		appMenu.showMenu()
}

if (!window.location.hash)
	window.location.hash = '#/'

onRouteChanged()
window.addEventListener('hashchange', onRouteChanged)