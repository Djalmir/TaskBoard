// const baseUrl = 'https://razion-apis.onrender.com/'
// const baseUrl = 'http://192.168.100.100:3333/'
const baseUrl = 'https://vps49327.publiccloud.com.br/'
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
	getBoardName: (id) => {
		return zGet(`${ baseUrl }taskBoard/board/get/${ id }`, headers())
	},
	editBoard: (infos) => {
		return zPut(`${ baseUrl }taskBoard/board/update/${ infos.board_id }`, infos, headers())
	},
	deleteBoard: (board_id) => {
		return zDelete(`${ baseUrl }taskBoard/board/delete/${ board_id }`, headers())
	},
	getLists: (h) => {
		let head = headers()
		head = {...head, ...h}
		return zGet(`${ baseUrl }taskboard/board/getLists/${ head.board_id }`, head)
	},

	//Listas
	createList: (body, h) => {
		let head = headers()
		head = {...head, ...h}
		return zPost(`${ baseUrl }taskBoard/list/create`, body, head)
	},
	editList: (infos, h) => {
		let head = headers()
		head = {...head, ...h}
		return zPut(`${ baseUrl }taskboard/list/update/${ head.list_id }`, infos, head)
	},
	deleteList: (list_id, h) => {
		let head = headers()
		head = {...head, ...h}
		return zDelete(`${ baseUrl }taskboard/list/delete/${ list_id }`, head)
	},
	getCards: (list_id, h) => {
		let head = headers()
		head = {...head, ...h}
		return zGet(`${ baseUrl }taskboard/list/getCards/${ list_id }`, head)
	},

	//Cartões
	createCard: (body, h) => {
		let head = headers()
		head = {...head, ...h}
		return zPost(`${ baseUrl }taskBoard/card/create`, body, head)
	},
	editCard: (infos, h) => {
		let head = headers()
		head = {...head, ...h}
		return zPut(`${ baseUrl }taskboard/card/update/${ head.card_id }`, infos, head)
	},
	deleteCard: (card_id, h) => {
		let head = headers()
		head = {...head, ...h}
		return zDelete(`${ baseUrl }taskboard/card/delete/${ card_id }`, head)
	}

}

export default User