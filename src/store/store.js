import { createStore } from 'vuex'
import boardModule from '@/store/modules/board'

export const store = createStore({
	modules: {
		board: boardModule
	},
	state: {
		title: 'TaskBoard',
		userProfile: localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null,
		showingMenu: false,
		darkTheme: true,
		boards: localStorage.getItem('boards') ? JSON.parse(localStorage.getItem('boards')) : []
	},
	mutations: {
		SET_TITLE(state, title) {
			state.title = title
		},
		SET_USER_PROFILE(state, userProfile) {
			state.userProfile = userProfile
		},
		SET_SHOWING_MENU(state) {
			state.showingMenu = !state.showingMenu
		},
		TOGGLE_THEME(state) {
			state.darkTheme = !state.darkTheme
		},
		SET_BOARDS(state, boards) {
			state.boards = boards
		}
	},
	actions: {
		setTitle({ commit }, title) {
			commit('SET_TITLE', title)
		},
		setUserProfile({ commit }, userProfile) {
			commit('SET_USER_PROFILE', userProfile)
			if (userProfile)
				localStorage.setItem('userProfile', JSON.stringify(userProfile))
			else
				localStorage.removeItem('userProfile')
		},
		toggleMenu({ commit }) {
			commit('SET_SHOWING_MENU')
		},
		toggleTheme({ commit }) {
			commit('TOGGLE_THEME')
		},
		setBoards({ commit }, boards) {
			commit('SET_BOARDS', boards)
			localStorage.setItem('boards', JSON.stringify(boards))
		}
	}
})