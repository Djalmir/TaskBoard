const state = {
	draggingList: null,
	draggingCard: null,
	draggingShadow: null,
	dragScrolling: null
}

const mutations = {
	SET_DRAGGING_LIST(state, list) {
		state.draggingList = list
	},
	SET_DRAGGING_CARD(state, card) {
		state.draggingCard = card
	},
	SET_DRAGGING_SHADOW(state, shadow) {
		state.draggingShadow = shadow
	},
	SET_DRAG_SCROLLING(state, value) {
		state.dragScrolling = value
	}
}

const actions = {
	setDraggingList({ commit }, list) {
		commit('SET_DRAGGING_LIST', list)
		if (list) {
			document.documentElement.style.overflow = 'hidden'
			document.body.style.overflow = 'hidden'
		}
		else {
			document.documentElement.style.overflow = 'auto'
			document.body.style.overflow = 'auto'
		}
	},
	setDraggingCard({ commit }, card) {
		commit('SET_DRAGGING_CARD', card)
		if (card) {
			document.documentElement.style.overflow = 'hidden'
			document.body.style.overflow = 'hidden'
		}
		else {
			document.documentElement.style.overflow = 'auto'
			document.body.style.overflow = 'auto'
		}
	},
	setDraggingShadow({ commit }, shadow) {
		commit('SET_DRAGGING_SHADOW', shadow)
	},
	setDragScrolling({ commit }, value) {
		commit('SET_DRAG_SCROLLING', value)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}