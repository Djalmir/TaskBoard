import axios from 'axios'
import { dispatchEvent } from '@/utils/events.js'

export const taskboardApi = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		common: {
			'X-Requested-With': 'XMLHttpRequest'
		}
	}
})

taskboardApi.interceptors.request.use((config) => {
	if (config.data instanceof FormData) {
		config.headers['Content-Type'] = 'multipart/form-data'
	} else {
		config.headers['Content-Type'] = 'application/json'
	}
	dispatchEvent('setLoading', true)
	return config
}, (err) => {
	dispatchEvent('setLoading', false)
	let error = err.response?.data.error
	let field = err.response?.data.field
	if (error) {
		dispatchEvent('showMessage', { error, field })
	}
	else
		dispatchEvent('showMessage', { error: 'Erro inesperado' })
	return Promise.reject(err)
})

taskboardApi.interceptors.response.use((res) => {
	dispatchEvent('setLoading', false)
	return res
}, (err) => {
	dispatchEvent('setLoading', false)
	let error = err.response?.data.error
	let field = err.response?.data.field
	if (error) {
		if (error == 'Token inválido.') {
			dispatchEvent('showMessage', { error: 'Sua sessão expirou. Por favor, faça o login novamente.' })
			dispatchEvent('logout')
		}
		else
			dispatchEvent('showMessage', { error, field })
	}
	else
		dispatchEvent('showMessage', { error: 'Erro inesperado' })
	return Promise.reject(err)
})

const configs = () => {
	const token = sessionStorage.getItem('userProfile') ?
		JSON.parse(sessionStorage.getItem('userProfile')).token :
		JSON.parse(localStorage.getItem('userProfile')).token
	return {
		headers: {
			Authorization: token
		}
	}
}

export default {
	createBoard({ name, sharedWith }) {
		return taskboardApi.post('taskboard/boards/create', { name, sharedWith }, configs())
	},
	listBoards() {
		return taskboardApi.get('taskboard/boards/list', configs())
	},
	getBoardDetails(boardId) {
		return taskboardApi.get(`taskboard/boards/boardDetails/${ boardId }`, configs())
	},
	updateBoard({ boardId, name, sharedWith, listsOrder }) {
		return taskboardApi.put(`taskboard/boards/update/${ boardId }`, { name, sharedWith, listsOrder }, configs())
	},
	deleteBoard(boardId) {
		return taskboardApi.delete(`taskboard/boards/delete/${ boardId }`, configs())
	},
	createList({ boardId, name }) {
		return taskboardApi.post(`taskboard/lists/create`, { boardId, name }, configs())
	},
	updateList({ listId, name, cardsOrder }) {
		return taskboardApi.put(`taskboard/lists/update/${ listId }`, { name, cardsOrder }, configs())
	},
	deleteList(listId) {
		return taskboardApi.delete(`taskboard/lists/delete/${ listId }`, configs())
	},
	createCard(body) {
		return taskboardApi.post(`taskboard/cards/create`, body, configs())
	},
	updateCard(body) {
		return taskboardApi.patch(`taskboard/cards/update/${ body.cardId || body.get('cardId') }`, body, configs())
	},
	moveCard({ board, card, fromList, toList, index }) {
		return taskboardApi.post(`taskboard/boards/moveCard`, { board, card, fromList, toList, index }, configs())
	},
	deleteCard(cardId) {
		return taskboardApi.delete(`taskboard/cards/delete/${ cardId }`, configs())
	}
}