let user = JSON.parse(localStorage.getItem('Razion.user'))
if (user) {
	app.user = user
	window.location.hash = localStorage.getItem('RazionTaskboard.lastHash') || '#/dashboard'
}

function setLoading(loading) {
	if (loading) {
		let wrapper = document.body.appendChild(document.createElement('div'))
		wrapper.id = 'loading'
		wrapper.style = `
			position: fixed;
			inset: 0;
			background: var(--transparentBg);
			display: flex;
			align-items: center;
			justify-content: center;
			animation: fadeIn .2s linear 1;
		`
		let img = wrapper.appendChild(document.createElement('img'))
		img.src = './assets/loading.svg'
		img.style = `
			width: 48px;
		`
	}
	else {
		let child = document.body.querySelector('#loading')
		child.style.animation = 'fadeOut .2s linear 1'
		window.addEventListener('animationend', removeLoading)
		function removeLoading() {
			window.removeEventListener('animationend', removeLoading)
			document.body.removeChild(child)
		}
	}
}

function removeErrMsg(field) {
	let msgs = errorMsg.getMessages()
	msgs = msgs.filter(msg => msg.field == field)
	msgs.map((msg) => {
		errorMsg.closeMsg(msg)
	})
}

function logout() {
	app.user = null
	localStorage.removeItem('Razion.user')
	window.location.hash = '#/'
}