var CACHE_NAME = 'static-v1'

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
			.then(function (cache) {
				return cache.addAll([
					'/assets/logo-72.png',
					'/assets/logo-96.png',
					'/assets/logo-128.png',
					'/assets/logo-144.png',
					'/assets/logo-152.png',
					'/assets/logo-192.png',
					'/assets/logo-384.png',
					'/assets/logo-512.png',
					'/components/confirm.js',
					'/components/errorMsgs.js',
					'/components/menu.js',
					'/components/subMenu.js',
					'/components/textInput.js',
					'/services/User.js',
					'/services/Visitor.js',
					'/views/board.js',
					'/views/taskboard.js',
					'/views/home.js',
					'/views/login.js',
					'/views/signup.js',
					'/app.js',
					'/icon.ico',
					'/index.html',
					'/index.js',
					'/style.css'
				])
			})
	)
	self.skipWaiting()
})

self.addEventListener('activate', function activator(event) {
	event.waitUntil(
		caches.keys().then(function (keys) {
			return Promise.all(keys
				.filter(function (key) {
					return key.indexOf(CACHE_NAME) !== 0
				})
				.map(function (key) {
					return caches.delete(key)
				})
			)
		})
	)
	clients.claim()
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (cachedResponse) {
			return fetch(event.request) || cachedResponse
		})
	)
})