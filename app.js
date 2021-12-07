import Login from './views/login.js'

const routes = {
	'#/': Login,
	'#/signup': signup,
	'#/dashboard': dashboard,
	'#/board': board
}

function onRouteChanged() {
	const hash = window.location.hash

	if (!(app instanceof HTMLElement)) {
		throw new ReferenceError('No router view element available for rendering')
	}
  const view = new routes['#/']()
	app.innerHTML = view

	appMenu.titleSpan.innerText = hash.replace('#', '').replace('/', '') || 'Login'
	appMenu.updateActiveLink(hash)

	if (appMenu.showingMenu)
		appMenu.showMenu()
}

if (!window.location.hash)
	window.location.hash = '#/'

onRouteChanged()

window.addEventListener('hashchange', onRouteChanged)


// const onNavigate = () => {
// 	window.history.pushState(
// 		{},
// 		pathname,
// 		window.location.origin + pathname
// 	)
// 	setNewView(pathname)
// }

// window.onpopstate = () => {
// 	setNewView(window.location.pathname)
// }

// const setNewView = (pathname) => {
// 	app.innerHTML = routes[pathname]

// 	app.activePage = pathname.replace('/', '')
// 	appMenu.titleSpan.innerText = app.activePage || 'Login'

// 	appMenu.updateActiveLink(pathname)

	// if (appMenu.showingMenu)
	// 	appMenu.showMenu()
// }

// onNavigate('/')