if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('./sw.js')
}

let user = JSON.parse(localStorage.getItem('Razion.user'))
if (user) {
	app.user = user
	window.location.hash = localStorage.getItem('RazionTaskboard.lastHash') || '#/dashboard'
}

let loadingLock = false
let useMiniLoading = false

function setLoading(loading) {
	if (loading) {
		if (!document.body.querySelector('#loading')) {
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
	}
	else {
		let child = document.body.querySelector('#loading')
		if (child) {
			child.style.animation = 'fadeOut .2s linear 1'
			window.addEventListener('animationend', removeLoading)
			function removeLoading() {
				window.removeEventListener('animationend', removeLoading)
				if (Array.from(document.body.children).includes(child)) {
					document.body.removeChild(child)
				}
			}
		}
	}
}

function setMiniLoading(loading) {
	if (loading) {
		if (!document.body.querySelector('#miniLoading')) {
			let wrapper = document.body.appendChild(document.createElement('div'))
			wrapper.id = 'miniLoading'
			wrapper.style = `
				position: fixed;
				right: 0;
				bottom: 10px;
				padding: 8px 16px;
				background: var(--transparentBg);
				display: flex;
				gap: 16px;
				align-items: center;
				justify-content: center;
				animation: fadeIn .2s linear 1;
				border-radius: .3rem 0 0 .3rem;
				max-width: 98%;
				box-sizing: border-box;
			`
			let img = wrapper.appendChild(document.createElement('img'))
			img.src = './assets/loading.svg'
			img.style = `
				width: 32px;
			`

			let b = wrapper.appendChild(document.createElement('b'))
			b.innerText = 'Salvando Alterações...'
		}
	}
	else {
		let child = document.body.querySelector('#miniLoading')
		if (child) {
			child.style.animation = 'fadeOut .2s linear 1'
			window.addEventListener('animationend', removeLoading)
			function removeLoading() {
				window.removeEventListener('animationend', removeLoading)
				if (Array.from(document.body.children).includes(child)) {
					document.body.removeChild(child)
				}
			}
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
	appMenu.boards = []
	localStorage.removeItem('Razion.user')
	localStorage.removeItem('RazionTaskboard.boards')
	window.location.hash = '#/'
}