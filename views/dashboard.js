const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section {
		padding: 40px 0;
		font-size: 16px;
	}

	#container {
		margin: 40px auto;
		width: fit-content;
		max-width: 90%;
		padding: 20px;
		box-sizing: border-box;
		border-radius: .3rem;
		box-shadow: 0 0 5px var(--darkgray2);
		display: flex;
		gap: 22px;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		background: var(--darkgray4);
	}

	.board {
		background: var(--gray2);
		padding: 8px 0 0;
		flex: 1;
		min-width: 160px;
		max-width: 400px;
		border-radius: .3rem;
		box-shadow: 0 0 4px var(--darkgray2);
	}

	.board b:nth-of-type(1) {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3em;
		margin: 0 auto 8px;
		background-image: linear-gradient(to bottom, var(--darkgray1), var(--darkgray4));
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.board b:nth-of-type(2) {
		font-size: 1.2em;
		font-weight: bold;
		background: var(--darkgray3);
		display: block;
		width: 100%;
		padding: 4px 8px;
		box-sizing: border-box;
		color: var(--gray3);
		border-radius: 0 0 .3rem .3rem;
	}

	#addBoardBt b:nth-of-type(1) {
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: linear-gradient(to bottom, var(--darkgray1) , var(--darkgray4));
		color: var(--gray2);
		-webkit-text-fill-color: unset;
	}

	#formContainer {
		position: fixed;
		inset: 0;
		display: none;
		justify-content: center;
		align-items: center;
	}

	#shadow {
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100vh;
		background: var(--transparentBg);
		z-index: 1;
	}

	#form {
		z-index: 2;
		max-width: 98%;
		padding: 30px 20px 20px;
		box-sizing: border-box;
		border-radius: .3rem;
		box-shadow: 0 0 5px var(--transparentBg);
		display: flex;
		gap: 22px;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--darkgray3);
	}

	.blueBt {
		width: 100%;
		padding: 8px;
	}
</style>
<link rel="stylesheet" href="style.css">

<section>
	<div id="container">
		<button class="board" id="addBoardBt" @click="showForm">
			<b>
				+
			</b>
			<b>
				Novo Quadro
			</b>			
		</button>
	</div>

	<div id="formContainer">
		<div id="shadow" @click="hideForm"></div>
		<form action="javascript:void(0)" id="form" @submit="submit">
			<z-input placeholder="Nome do Quadro" z-model="boardName" id="zInput" @focus="removeErrMsg('name')" @keydown="keydown"></z-input>
			<button type="submit" class="blueBt">{{editingBoard?'Renomear':'Adicionar'}}</button>
		</form>
	</div>

</section>
`

import User from '../services/User.js'
export default class Dashboard extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))

		this.boards = []
		this.boardName = ''
		this.editingBoard = null
		let event = new CustomEvent('editingBoardUpdated')
		document.dispatchEvent(event)

		this.updateBoardsList = () => {
			User.getBoards()
				.then((res) => {
					this.boards = res
					let bt = this.shadowRoot.querySelector('#addBoardBt')
					this.shadowRoot.querySelector('#container').innerHTML = ''
					this.shadowRoot.querySelector('#container').appendChild(bt)
					this.boards.map((board) => {
						this.addBoardToList(board)
					})
				})
				.catch((err) => {
					errorMsg.show({message: err.error})
				})
		}

		this.showForm = () => {
			let container = this.shadowRoot.querySelector('#formContainer')
			let shadow = this.shadowRoot.querySelector('#shadow')
			let form = this.shadowRoot.querySelector('#form')
			container.style.display = 'flex'
			let input = container.querySelector('#zInput')
			input.focus()
			shadow.style.animation = 'fadeIn .2s linear'
			form.style.animation = 'rollIn .5s ease-out'
		}

		this.hideForm = () => {
			this.boardName = ''
			this.editingBoard = null
			removeErrMsg('name')
			const removeForm = () => {
				this.shadowRoot.removeEventListener('animationend', removeForm)
				form.style.animation = 'rollOut .5s ease-out forwards'
				this.shadowRoot.addEventListener('animationend', removeContainer)
			}
			const removeContainer = () => {
				this.shadowRoot.removeEventListener('animationend', removeContainer)
				this.shadowRoot.querySelector('#zInput').removeActiveClass()
				container.style.display = 'none'
				let event = new CustomEvent('editingBoardUpdated')
				document.dispatchEvent(event)
			}
			let container = this.shadowRoot.querySelector('#formContainer')
			let shadow = this.shadowRoot.querySelector('#shadow')
			let form = this.shadowRoot.querySelector('#form')
			shadow.style.animation = 'fadeOut .2s linear forwards'
			this.shadowRoot.addEventListener('animationend', removeForm)
		}

		this.submit = () => {
			if (this.editingBoard) {
				this.editBoard()
			}
			else
				this.createBoard()
		}

		this.createBoard = () => {
			if (errorMsg.getMessages().length) {
				errorMsg.callAtention()
			}
			else {
				if (this.boardName.trim() == '')
					errorMsg.show({field: 'name', message: 'Informe o nome do novo Quadro.'})
				else
					User.createBoard({
						name: this.boardName
					})
						.then((board) => {
							this.hideForm()
							this.addBoardToList(board)
						})
						.catch((err) => {
							errorMsg.show({message: err.error})
						})
			}
		}

		this.addBoardToList = (board) => {
			let container = this.shadowRoot.querySelector('#container')
			let bt = container.appendChild(document.createElement('button'))
			bt.onclick = () => {
				window.location.hash = `#/board?id=${ board._id }`
			}
			bt.classList.add('board')
			bt.oncontextmenu = (e) => {
				subMenu.show(e, [
					{
						name: 'Renomear',
						action: () => this.showEditionForm(board)
					},
					{
						name: 'Excluir',
						action: () => this.showDeleteForm(board)
					}
				])
				e.preventDefault()
			}
			let b = bt.appendChild(document.createElement('b'))
			let words = board.name.split(' ')
			b.innerText = words[0][0].toUpperCase() + (words.length > 2 ? words[2][0].toUpperCase() : words.length > 1 ? words[1][0].toUpperCase() : '')
			b = bt.appendChild(document.createElement('b'))
			b.innerText = board.name
		}

		this.showEditionForm = (board) => {
			this.editingBoard = board
			let event = new CustomEvent('editingBoardUpdated')
			document.dispatchEvent(event)
			this.boardName = board.name
			this.showForm()
		}

		this.editBoard = () => {
			User.editBoard({
				board_id: this.editingBoard._id,
				name: this.boardName
			})
				.then((res) => {
					this.updateBoardsList()
					this.hideForm()
				})
				.catch((err) => {
					errorMsg.show({message: err.error})
				})
		}

		this.showDeleteForm = async (board) => {
			if (await zionConfirm.confirm(`Quer mesmo deletar o quadro "${ board.name }"?`, 'Essa ação não poderá ser desfeita')) {
				//REMOVER TODOS OS CARDS RELATIVOS AO QUADRO
				//REMOVER TODAS AS LISTAS RELATIVAS AO QUADRO

				User.deleteBoard(board._id)
					.then(() => {
						this.updateBoardsList()
					})
					.catch((err) => {
						errorMsg.show({message: err.error})
					})
			}
		}

		this.keydown = (e) => {
			if (e.key == 'Enter')
				this.submit()
		}

		runZion(this)
	}

	connectedCallback() {
		if (app.user) {
			if (appMenu.showingMenu)
				appMenu.showMenu()

			this.updateBoardsList()
		}
	}
}

customElements.define('view-dashboard', Dashboard)