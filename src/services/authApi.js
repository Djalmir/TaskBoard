import axios from 'axios'
import { dispatchEvent } from '@/utils/events.js'

export const authApi = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json',
		common: {
			'X-Requested-With': 'XMLHttpRequest'
		}
	}
})

authApi.interceptors.request.use((config) => {
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

authApi.interceptors.response.use((res) => {
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
	signup({ name, email, password }) {
		return authApi.post('auth/signup', { name, email, password })
	},
	login({ email, password }) {
		return authApi.post('auth/login', { email, password })
	},
	getProfile() {
		return authApi.get('auth/profile', configs())
	},
	updateProfile(body) {
		return authApi.put('auth/updateProfile', body, { headers: { ...configs().headers, 'Content-Type': 'multipart/form-data' } })
	},
	deleteAccount({ password }) {
		return authApi.delete(`auth/deleteAccount/${ password }`, configs())
	},
	searchProfile({ search }) {
		return authApi.post('auth/search', { search }, configs())
	},
	sendInvitationEmail({ name, email }) {
		return authApi.post('auth/sendInvitationEmail', { name, email }, configs())
	}
}