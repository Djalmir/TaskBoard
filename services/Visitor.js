// const baseUrl = 'https://razion-apis.onrender.com/'
// const baseUrl = 'http://192.168.100.100:3333/'
const baseUrl = 'http://vps49327.publiccloud.com.br:3333/'

const Visitor = {

	login: (body) => {
		return zPost(`${ baseUrl }session/login`, body)
	},

	signup: (body) => {
		return zPost(`${ baseUrl }session/signup`, body)
	}
	
}

export default Visitor