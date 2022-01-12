const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section {
		padding: 60px 20px 20px;
		box-sizing: border-box;
		width: fit-content;
		height: 100%;
	}

	#addListBt {
		background: var(--darkgray4);
		padding: 8px 0;
		width: 200px;
		min-width: 200px;
		max-width: 200px;
		height: 93px;
		border-radius: .3rem;
		box-shadow: 0 0 4px var(--darkgray2);
		user-select: none;
	}

	#addListBt b:nth-of-type(1) {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 3em;
		margin: 0 auto;
		width: 42px;
		height: 42px;
		border-radius: 50%;
		background: linear-gradient(to bottom, var(--gray3) , var(--gray1));
		color: var(--darkgray4);
	}

	#addListBt b:nth-of-type(2) {
		font-size: 1.2em;
		font-weight: bolder;
		background: var(--darkgray4);
		display: block;
		width: 100%;
		padding: 4px 8px;
		box-sizing: border-box;
		color: var(--gray3);
		border-radius: 0 0 .3rem .3rem;
		text-transform: capitalize;
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

	#container {
		height: 100%;
		display: flex;
		gap: 16px;
	}

	.list {
		background: var(--darkgray4);
		padding: 8px;
		box-sizing: border-box;
		width: 250px;
		min-width: 250px;
		max-width: 250px;
		height: fit-content;
		min-height: 93px;
		border-radius: .3rem;
		box-shadow: 0 0 4px var(--darkgray2);
		user-select: none;
		position: relative;
	}

	.addCardBt {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0;
		margin: 18px 8px 8px;
		width: calc(100% - 16px);
		height: 28px;
		border: 1px solid var(--darkgray2);
		border-radius: .4rem;
		display: flex;
		background: var(--transparent);
	}

	.addCardBt b:nth-of-type(1) {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2em;
		margin: 0 auto 8px;
		width: 32px;
		height: 100%;
		background: var(--blue);
		color: var(--darkgray3);
		border-radius: .3rem 0 0 .3rem;
	}

	.addCardBt b:nth-of-type(2) {
		font-size: 1.2em;
		font-weight: bold;
		background: var(--darkgray3);
		width: 100%;
		height: 100%;
		padding: 4px;
		box-sizing: border-box;
		color: var(--gray3);
		border-radius: 0 .3rem .3rem 0;
		text-transform: capitalize;
	}

</style>
<link rel="stylesheet" href="style.css">

<section>
	<div id="container">
		<button id="addListBt" @click="showForm">
			<b>
				+
			</b>
			<b>
				Nova Lista
			</b>
		</button>
	</div>

	<div id="formContainer">
		<div id="shadow" @click="hideForm"></div>
		<form action="javascript:void(0)" id="form" @submit="submit">
			<z-input placeholder="Nome da Lista" z-model="listName" id="zInput" @focus="removeErrMsg('name')" @keydown="keydown"></z-input>
			<button type="submit" class="blueBt">{{editingList?'Renomear':'Adicionar'}}</button>
		</form>
	</div>
</section>
`

import User from "../services/User.js"
export default class Board extends HTMLElement {
	constructor() {
		super()
		this.board = window.location.hash.split('?')[1].split('=')[1]

		this.attachShadow({mode: 'open'})
		this.shadowRoot.appendChild(template.content.cloneNode(true))
		this.lists = []
		this.listName = ''
		this.editingList = null
		this.mouseDownPos = null
		this.mouseDownTimer = null
		this.currentMousePos = null
		this.draggingComponent = null
		this.draggingShadow = null
		this.isTouchScreen = window.matchMedia('(hover: none)').matches

		let event = new CustomEvent('editingListUpdated')
		document.dispatchEvent(event)

		this.updateListsView = () => {
			User.getLists({
				board_id: this.board
			})
				.then((res) => {
					this.lists = res
					let bt = this.shadowRoot.querySelector('#addListBt')
					this.shadowRoot.querySelector('#container').innerHTML = ''
					this.shadowRoot.querySelector('#container').appendChild(bt)
					this.lists.map((list) => {
						this.addListToView(list)
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
			let input = container.querySelector('#zInput')
			container.style.display = 'flex'
			input.focus()
			shadow.style.animation = 'fadeIn .2s linear'
			form.style.animation = 'rollIn .5s ease-out'
		}

		this.hideForm = () => {
			this.listName = ''
			this.editingList = null
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
				let event = new CustomEvent('editingListUpdated')
				document.dispatchEvent(event)
			}
			let container = this.shadowRoot.querySelector('#formContainer')
			let shadow = this.shadowRoot.querySelector('#shadow')
			let form = this.shadowRoot.querySelector('#form')
			shadow.style.animation = 'fadeOut .2s linear forwards'
			this.shadowRoot.addEventListener('animationend', removeForm)
		}

		this.submit = () => {
			if (this.editingList) {
				this.editList()
			}
			else
				this.createList()
		}

		this.createList = () => {
			if (errorMsg.getMessages().length) {
				errorMsg.callAtention()
			}
			else {
				if (this.listName.trim() == '')
					errorMsg.show({field: 'name', message: 'Informe o nome da nova Lista.'})
				else
					User.createList({
						name: this.listName,
						index: this.lists.length
					}, {
						board_id: this.board
					})
						.then((list) => {
							this.hideForm()
							this.addListToView(list)
						})
						.catch((err) => {
							errorMsg.show({message: err.error})
						})
			}
		}

		this.addListToView = (list) => {
			let container = this.shadowRoot.querySelector('#container')
			let listDiv = container.insertBefore(document.createElement('div'), this.shadowRoot.querySelector('#addListBt'))
			listDiv.classList.add('list')
			listDiv.oncontextmenu = (e) => {
				if (!this.isTouchScreen)
					this.showSubmenu('list', list)
				e.preventDefault()

			}
			listDiv.onmousedown = (e) => {
				let target = e.target
				if (Array.from(target.classList).includes('list')) {
					this.mouseDownPos = {
						x: this.isTouchScreen ? e.touches[0].clientX : e.clientX,
						y: this.isTouchScreen ? e.touches[0].clientY : e.clientY
					}
					this.currentMousePos = this.mouseDownPos
					this.mouseDownTimer = setTimeout(() => {
						clearTimeout(this.mouseDownTimer)
						console.log(this.mouseMoved())
						if (!this.mouseMoved()) {
							navigator.vibrate(['250'])
							this.draggingComponent = target
							target.style.animation = 'smoothAtention .2s linear 2'
							const removeAnimation = () => {
								target.removeEventListener('animationend', removeAnimation)
								target.style.animation = 'unset'
							}
							target.addEventListener('animationend', removeAnimation)

							if (this.isTouchScreen) {
								this.mouseDownTimer = setTimeout(() => {
									if (!this.mouseMoved()) {
										this.draggingComponent = null
										this.draggingShadow = null
										navigator.vibrate(['250'])
										this.showSubmenu('list', list)
									}
								}, 750)
							}
						}
					}, 250)
				}
			}
			listDiv.ontouchstart = listDiv.onmousedown

			let b = listDiv.appendChild(document.createElement('b'))
			b.innerText = list.name
			b.style.pointerEvents = 'none'

			let listContainer = listDiv.appendChild(document.createElement('div'))

			let addCardBt = listContainer.appendChild(document.createElement('button'))
			addCardBt.classList.add('addCardBt')

			b = addCardBt.appendChild(document.createElement('b'))
			b.innerText = '+'

			b = addCardBt.appendChild(document.createElement('b'))
			b.innerText = 'Novo Card'
		}

		this.showEditionForm = (list) => {
			this.editingList = list
			let event = new CustomEvent('editingListUpdated')
			document.dispatchEvent(event)
			this.listName = list.name
			this.showForm()
		}

		this.editList = () => {
			User.editList({
				list_id: this.editingList._id,
				name: this.listName
			}, {
				board_id: this.board
			})
				.then((res) => {
					this.updateListsView()
					this.hideForm()
				})
				.catch((err) => {
					errorMsg.show({message: err.error})
				})
		}

		this.showDeleteForm = async (list) => {
			if (await zionConfirm.confirm(`Quer mesmo deletar a lista "${ list.name }"?`, 'Essa ação não poderá ser desfeita')) {
				//REMOVER TODOS OS CARDS RELATIVOS À LISTA
				User.deleteList(list._id, {
					board_id: this.board
				})
					.then(() => {
						this.updateListsView()
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

		this.onmousemove = (e) => {
			this.currentMousePos = {
				x: (this.isTouchScreen ? e.touches[e.touches.length - 1].clientX : e.clientX),
				y: this.isTouchScreen ? e.touches[e.touches.length - 1].clientY : e.clientY
			}
			
			if (this.draggingComponent) {
				if (!this.draggingShadow && !this.mouseMoved()) {
					this.draggingShadow = this.draggingComponent.cloneNode(true)
					this.draggingShadow.classList = this.draggingComponent.classList
					this.draggingShadow.style.position = 'absolute'
					this.shadowRoot.querySelector('#container').appendChild(this.draggingShadow)
					this.draggingComponent.style.opacity = '.1'
				}
				else if (this.draggingShadow) {

					let difX = this.mouseDownPos.x - this.draggingComponent.offsetLeft
					let difY = this.mouseDownPos.y - this.draggingComponent.offsetTop

					this.draggingShadow.style.top = `${ this.currentMousePos.y - difY + window.scrollY }px`
					let x = this.currentMousePos.x - difX
					if (x < window.scrollX)
						x = window.scrollX
					else if (x + this.draggingShadow.offsetWidth > window.innerWidth + window.scrollX)
						x = window.innerWidth - this.draggingShadow.innerWidth
					this.draggingShadow.style.left = `${ x }px`
				}
				e.preventDefault()
			}
		}
		this.ontouchmove = this.onmousemove

		this.onmouseup = () => {
			this.mouseDownPos = null
			clearTimeout(this.mouseDownTimer)
			if (this.draggingComponent) {
				this.draggingComponent.style.opacity = '1'
			}
			this.draggingComponent = null
			if (this.draggingShadow) {
				this.shadowRoot.querySelector('#container').removeChild(this.draggingShadow)
			}
			this.draggingShadow = null
		}
		this.ontouchend = this.onmouseup

		this.mouseMoved = () => {
			console.log(this.mouseDownPos, this.currentMousePos)
			let difX = this.mouseDownPos.x - this.currentMousePos.x
			if (difX < 0)
				difX = difX * -1
			let difY = this.mouseDownPos.y - this.currentMousePos.y
			if (difY < 0)
				difY = difY * -1

			return difX > 20 || difY > 20
		}

		this.showSubmenu = (type, comp) => {
			switch (type) {
				case 'list':
					subMenu.show({
						clientX: this.currentMousePos.x,
						clientY: this.currentMousePos.y
					}, [
						{
							name: 'Renomear',
							action: () => this.showEditionForm(comp)
						},
						{
							name: 'Excluir',
							action: () => this.showDeleteForm(comp)
						}
					])
					break
			}
		}

		runZion(this)
	}

	connectedCallback() {
		if (app.user) {
			if (appMenu.showingMenu)
				appMenu.showMenu()

			this.updateListsView()
		}
	}
}

customElements.define('view-board', Board)