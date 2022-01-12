const baseUrl = 'https://razion-apis.herokuapp.com/'
// const baseUrl = 'http://192.168.100.100:3333/'
const headers = () => {
	if (!app.user)
		return
	return {
		user_id: app.user._id
	}
}

const User = {

	//Quadros
	createBoard: (body) => {
		return zPost(`${ baseUrl }taskBoard/board/create`, body, headers())
	},
	getBoards: () => {
		return zGet(`${ baseUrl }taskBoard/board/listAll`, headers())
	},
	editBoard: (infos) => {
		return zPut(`${ baseUrl }taskBoard/board/update/${ infos.board_id }`, infos, headers())
	},
	deleteBoard: (board_id) => {
		return zDelete(`${ baseUrl }taskBoard/board/delete/${ board_id }`, headers())
	},

	//Listas
	createList: (body, h) => {
		let head = headers()
		head = {...head, ...h}
		return zPost(`${ baseUrl }taskBoard/list/create`, body, head)
	},
	getLists: (h) => {
		let head = headers()
		head = {...head, ...h}
		return zGet(`${ baseUrl }taskboard/list/listAll`, head)
	},
	editList: (infos, h) => {
		let head = headers()
		head = {...head, ...h}
		console.log('head: ',head)
		return zPut(`${ baseUrl }taskboard/list/update/${ infos.list_id }`, infos, head)
	},
	deleteList: (list_id, h) => {
		let head = headers()
		head = {...head, ...h}
		return zDelete(`${ baseUrl }taskboard/list/delete/${ list_id }`, head)
	}

}

export default User