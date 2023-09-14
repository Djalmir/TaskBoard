// const baseUrl = 'http://192.168.100.100:3333/'
const baseUrl = 'https://vps49327.publiccloud.com.br/api/'

const Visitor = {

	login: (body) => {
		return zPost(`${ baseUrl }session/login`, body)
	},

	signup: (body) => {
		return zPost(`${ baseUrl }session/signup`, body)
	}

}

export default Visitor