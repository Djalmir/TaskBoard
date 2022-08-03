let user = JSON.parse(localStorage.getItem('Razion.user'))
if (user) {
	app.user = user
	window.location.hash = localStorage.getItem('RazionTaskboard.lastHash') || '#/taskboard'
}

function removeErrMsg(field) {
	let msgs = errorMsg.getMessages()
	msgs = msgs.filter(msg => msg.field == field)
	msgs.map((msg) => {
		errorMsg.closeMsg(msg)
	})
}

let loadingLock = false

//Intercepting zion http requests
document.addEventListener('zBeforeRequest', (e) => {
	if (!loadingLock)
		appLoading.loading = true
})

//Intercepting zion http responses
document.addEventListener('zAfterRequest', (e) => {
	if (!loadingLock)
		appLoading.loading = false
})

function logout() {
	app.user = null
	appMenu.boards = []
	if (appMenu.showingMenu)
		appMenu.showMenu()
	localStorage.removeItem('Razion.user')
	localStorage.removeItem('RazionTaskboard.boards')
	window.location.hash = '#/'
}

if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker.register('./sw.js')
			.then((res) => console.log('Service worker Registrado'))
			.catch((err) => console.log('Erro ao registrar Service worker', err))

	})
}