const baseUrl = 'https://razion-apis.herokuapp.com/'
// const baseUrl = 'http://192.168.100.100:3333/'

const Visitor = {

	login: (body) => {
		return zPost(`${ baseUrl }session/login`, body)
	},

	signup: (body) => {
		return zPost(`${ baseUrl }session/signup`, body)
	}
	
}

export default Visitor