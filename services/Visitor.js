const baseUrl = 'https://razion-apis.herokuapp.com/'

const Visitor = {

	login: (body) => {
		return zPost(`${ baseUrl }session/login`, body)
	},

	signup: (body) => {
		return zPost(`${ baseUrl }session/signup`, body)
	}
	
}

export default Visitor