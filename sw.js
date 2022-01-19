var CACHE_NAME = 'static-v1'

self.addEventListener('install', function (event) {
	event.waitUntil(
		caches.open(CACHE_NAME).then(function (cache) {
			return cache.addAll([
				'/TaskBoard/assets/logo-72.png',
				'/TaskBoard/assets/logo-96.png',
				'/TaskBoard/assets/logo-128.png',
				'/TaskBoard/assets/logo-144.png',
				'/TaskBoard/assets/logo-152.png',
				'/TaskBoard/assets/logo-192.png',
				'/TaskBoard/assets/logo-384.png',
				'/TaskBoard/assets/logo-512.png',
				'/TaskBoard/components/confirm.js',
				'/TaskBoard/components/errorMsgs.js',
				'/TaskBoard/components/menu.js',
				'/TaskBoard/components/subMenu.js',
				'/TaskBoard/components/textInput.js',
				'/TaskBoard/services/User.js',
				'/TaskBoard/services/Visitor.js',
				'/TaskBoard/views/board.js',
				'/TaskBoard/views/taskboard.js',
				'/TaskBoard/views/home.js',
				'/TaskBoard/views/login.js',
				'/TaskBoard/views/signup.js',
				'/TaskBoard/app.js',
				'/TaskBoard/icon.ico',
				'/TaskBoard/index.html',
				'/TaskBoard/index.js',
				'/TaskBoard/style.css',
				'/TaskBoard/Zion.js'
			])
		})
	)
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
})

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request).then(function (cachedResponse) {
			return cachedResponse || fetch(event.request)
		})
	)
})