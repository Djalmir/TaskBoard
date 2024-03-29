import { createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store/store.js'
import { dispatchEvent } from 'RazionUtils'
import Home from '@/views/Home.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/profile',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
		authRequired: true
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('@/views/Dashboard.vue'),
		authRequired: true
	},
	{
		path: '/board/:boardId',
		name: 'Board',
		component: () => import('@/views/Board.vue'),
		authRequired: true
	},

	{
		path: '/:pathMatch(.*)',
		component: Home
	}
]

const router = createRouter({
	history: createWebHistory(),
	routes
})

function isAuthenticated() {
	return store.state.userProfile
}

router.beforeEach((to, from, next) => {
	dispatchEvent('closeAllMessages')
	if (store.state.showingMenu)
		store.dispatch('toggleMenu')
	to.authRequired = routes.find((route) => route.name == to.name).authRequired
	if (to.authRequired && !isAuthenticated()) next({ name: 'Home' })
	else next()
})

export default router