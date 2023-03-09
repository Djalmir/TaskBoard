const template = document.createElement('template')
template.innerHTML = /*html*/`
<style>
	section {
		padding: 60px 20px 20px;
		box-sizing: border-box;
		width: 100%;
		height: 100%;
		overflow-x: auto;
		overflow-y: hidden;
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

	#formContainer,
	#cardFormContainer {
		position: fixed;
		inset: 53px 0 0;
		display: none;
		justify-content: center;
		align-items: flex-start;
	}

	#shadow,
	#cardShadow {
		position: fixed;
		top:0;
		left:0;
		width:100%;
		height: 100vh;
		background: var(--transparentBg);
		z-index: 1;
	}

	#form,
	#cardForm {
		z-index: 2;
		width: 98%;
		max-width: 400px;
		max-height: 90%;
		overflow: auto;
		padding: 30px 20px 20px;
		box-sizing: border-box;
		border-radius: .3rem;
		box-shadow: 0 0 5px var(--transparentBg);
		display: flex;
		gap: 22px;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		background: var(--darkgray3);
	}

	z-input {
		width: 100%;
	}

	.blueBt {
		width: 100%;
		padding: 8px;
	}

	#container {
		display: flex;
		gap: 16px;
		width: fit-content;
		height: fit-content;
		min-height: calc(100% - 40px);
		/*height: 200%;
		min-height: 200%;*/
	}

	.list {
		background: linear-gradient(157deg, var(--gray1), var(--darkgray4));
		padding: 8px 8px 32px;
		box-sizing: border-box;
		width: 250px;
		min-width: 250px;
		max-width: 250px;
		height: fit-content;
		min-height: 93px;
		max-height: calc(100vh - 80px);
		border-radius: .3rem;
		box-shadow: 0 0 4px var(--darkgray2);
		user-select: none;
		position: relative;
	}

	.listContainer{
		margin: 18px 0;
		padding: 3px;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		gap: 5px;
		max-height: calc(100vh - 180px);
		overflow-y: scroll;
		overflow-x: hidden;
		border-top: 1px solid var(--darkgray2);
		border-left: 1px solid var(--darkgray2);
		border-bottom: 1px solid var(--gray2);
		border-right: 1px solid var(--gray2);
		border-radius: .3rem;
		background: linear-gradient(-23deg, var(--gray1), var(--darkgray4));
	}

	.listContainer:empty{
		display: none
	}

	.listContainer::-webkit-scrollbar{
		width: 0;
		height: 0;
	}

	.card {
		border-top: 1px solid var(--gray1);
		border-left: 1px solid var(--gray1);
		border-bottom: 1px solid var(--darkgray2);
		border-right: 1px solid var(--darkgray2);
		border-radius: .3rem;
		padding: 4px 8px;
		background: linear-gradient(157deg, var(--darkgray4), var(--darkgray3));
		width: 225px;
		min-width: 225px;
		max-width: 225px;
		box-sizing: border-box;
		position: relative;
	}

	.card * {
		pointer-events: none;
		color: var(--gray3);
	}

	.card hr {
		margin: 7px 0 13px;
		border: none;
		border-bottom: 1px solid var(--gray1);
	}

	.cardHistory {
		font-size: 12px;
		position: absolute;
		bottom: 2px;
		right: 4px;
		opacity: .5;
	}

	.addCardBt {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 0;
		margin: 18px 8px 8px;
		width: calc(100% - 16px);
		height: 28px;
		border-top: 1px solid var(--gray1);
		border-left: 1px solid var(--gray1);
		border-bottom: 1px solid var(--darkgray2);
		border-right: 1px solid var(--darkgray2);
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
		background: linear-gradient(157deg, var(--darkgray4), var(--darkgray3));
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

<section id="section">
	<div id="container">
		<button id="addListBt" z-onclick="showForm">
			<b>
				+
			</b>
			<b>
				Nova Lista
			</b>
		</button>
	</div>

	<div id="formContainer">
		<div id="shadow" z-onclick="hideForm"></div>
		<form action="javascript:void(0)" id="form" z-onsubmit="submit">
			<z-input placeholder="Nome da Lista" z-model="listName" id="zInput" z-onfocus="removeErrMsg('name')" z-onkeydown="keydown"></z-input>
			<button type="submit" class="blueBt">{{editingList?'Renomear':'Adicionar'}}</button>
		</form>
	</div>

	<div id="cardFormContainer">
		<div id="cardShadow" z-onclick="hideCardForm"></div>
		<form action="javascript:void(0)" id="cardForm" z-onsubmit="cardSubmit">
			<z-input placeholder="Título" z-model="cardTitle" id="cardTitleInput" z-onfocus="removeErrMsg('cardTitle')" z-onkeydown="cardKeydown"></z-input>
			<z-input zTag="textarea" z-model="cardDescription" zStyle="resize: none; min-height: 73px;" placeholder="Descrição" id="cardDescriptionInput" z-onfocus="removeErrMsg('cardDescription')" z-onkeydown="cardKeydown"></z-input>
			<button type="submit" class="blueBt">{{editingCard?'Editar':'Adicionar'}}</button>
		</form>
	</div>
</section>
`

import User from "../services/User.js"
export default class Board extends HTMLElement {
	constructor() {
		super()

		if (localStorage.getItem('RazionTaskboard.boards') && appMenu.boards.length == 0) {
			appMenu.updateBoards(JSON.parse(localStorage.getItem('RazionTaskboard.boards')))
		}

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
		this.autoScroll = 0
		this.autoScrolling = false
		this.listAutoScroll = null
		this.scrollMouseDownPos = null
		this.newCardOwner = null
		this.cardTitle = ''
		this.cardDescription = ''
		this.editingCard = null
		this.oldContainer = null
		this.isTouchScreen = window.matchMedia('(hover: none)').matches
		this.touchedMoreThanOnce = false // Usada para respeitar a regra de não vibrar antes do primeiro toque do usuário
		this.shiftDown = false
		this.scrollListMouseDown = null

		let event = new CustomEvent('editingListUpdated')
		document.dispatchEvent(event)
		event = new CustomEvent('editingCardUpdated')
		document.dispatchEvent(event)

		this.updateListsView = () => {
			User.getLists({
				board_id: this.board
			})
				.then((res) => {
					this.lists = res.filter(l => l)
					let bt = this.shadowRoot.querySelector('#addListBt')
					let container = this.shadowRoot.querySelector('#container')
					while (container.firstChild)
						container.removeChild(container.firstChild)
					this.shadowRoot.querySelector('#container').appendChild(bt)
					if (!this.lists.length) {
						loadingLock = false
						appLoading.loading = false
					}
					else
						this.lists.map((list, index) => {
							this.addListToView(list, index)
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
			form.style.animation = 'rollIn .2s ease-out'
		}

		this.hideForm = () => {
			this.listName = ''
			removeErrMsg('name')
			const removeForm = () => {
				this.shadowRoot.removeEventListener('animationend', removeForm)
				form.style.animation = 'rollOut .5s ease-out forwards'
				this.shadowRoot.addEventListener('animationend', removeContainer)
			}
			const removeContainer = () => {
				this.editingList = null
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
				errorMsg.callAttention()
			}
			else {
				if (this.listName.trim() == '')
					errorMsg.show({field: 'name', message: 'Informe o nome da nova Lista.'})
				else {
					User.createList({
						name: this.listName,
						cards: []
					}, {
						board_id: this.board
					})
						.then((list) => {
							this.hideForm()
							this.addListToView(list, this.lists.length)
						})
						.catch((err) => {
							errorMsg.show({message: err.error})
						})
				}
			}
		}

		this.addListToView = (list, index) => {
			if (!this.lists.find(l => l == list))
				this.lists.push(list)
			let container = this.shadowRoot.querySelector('#container')
			let listDiv = container.insertBefore(document.createElement('div'), this.shadowRoot.querySelector('#addListBt'))
			listDiv.id = `list_${ list._id }`
			listDiv.classList.add('list')
			listDiv.oncontextmenu = (e) => {
				if (!this.isTouchScreen && Array.from(e.target.classList).includes('list'))
					this.showSubmenu(list)
				e.preventDefault()
			}
			listDiv.onmousedown = (e) => {
				let target = e.target
				if (Array.from(target.classList).includes('list')) {
					this.mouseDownPos = {
						x: (e.touches ? e.touches[0].clientX : e.clientX),
						y: (e.touches ? e.touches[0].clientY : e.clientY)
					}
					this.currentMousePos = this.mouseDownPos
					this.mouseDownTimer = setTimeout(() => {
						clearTimeout(this.mouseDownTimer)
						if (!this.mouseMoved()) {
							if (this.isTouchScreen && this.touchedMoreThanOnce)
								navigator.vibrate(['250'])
							this.draggingComponent = target
							target.style.animation = 'smoothAttention .2s linear 2'
							const removeAnimation = () => {
								target.removeEventListener('animationend', removeAnimation)
								target.style.animation = 'unset'
							}
							target.addEventListener('animationend', removeAnimation)

							if (this.isTouchScreen) {
								this.mouseDownTimer = setTimeout(() => {
									if (!this.mouseMoved()) {
										this.onmouseup()
										if (this.isTouchScreen && this.touchedMoreThanOnce)
											navigator.vibrate(['250'])
										this.showSubmenu(list)
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
			b.classList.add('listName')
			b.style.pointerEvents = 'none'

			let listContainer = listDiv.appendChild(document.createElement('div'))
			listContainer.classList.add('listContainer')

			listDiv.onmousemove = (e) => {
				if (this.mouseDownPos) {
					if (this.mouseMoved() && !this.draggingComponent && !e.touches) {
						let difX = this.mouseDownPos.x - this.currentMousePos.x
						if (difX < 0)
							difX = difX * -1
						let difY = this.mouseDownPos.y - this.currentMousePos.y
						if (difY < 0)
							difY = difY * -1

						if (!this.scrollListMouseDown)
							this.scrollListMouseDown = {
								x: this.mouseDownPos.x,
								y: this.mouseDownPos.y
							}
						listContainer.scrollBy(0, this.scrollListMouseDown.y - this.currentMousePos.y)
						this.scrollListMouseDown = {
							x: this.currentMousePos.x,
							y: this.currentMousePos.y
						}
					}
					else if (this.draggingShadow) {
						let y = this.currentMousePos.y - listContainer.offsetTop - 60
						let dif = (listContainer.offsetHeight) / 2 - y
						if (dif < 0)
							dif *= -1
						if (dif > (listContainer.offsetHeight) * 33 / 100)
							this.listAutoScroll = {
								container: listContainer,
								scroll: (y - listContainer.offsetHeight / 2) / 2
							}
					}
				}
			}
			listDiv.ontouchmove = listDiv.onmousemove

			this.updateCardsOnList(`list_${ list._id }`, index)

			let addCardBt = listDiv.appendChild(document.createElement('button'))
			addCardBt.classList.add('addCardBt')
			addCardBt.onclick = () => this.showCardForm(list)

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
				name: this.listName
			}, {
				list_id: this.editingList._id,
				board_id: this.board
			})
				.then((res) => {
					this.shadowRoot.querySelector(`#list_${ res._id }`).querySelector('.listName').innerText = res.name
					this.lists[this.lists.indexOf(this.lists.find(l => l._id == this.editingList._id))].name = res.name
					this.hideForm()
					this.editingList = null
				})
				.catch((err) => {
					errorMsg.show({message: err.error})
				})
		}

		this.showDeleteForm = async (list) => {
			if (await zionConfirm.confirm(`Quer mesmo deletar a lista "${ list.name }"?`, 'Essa ação não poderá ser desfeita')) {

				this.shadowRoot.querySelector('#container').removeChild(this.shadowRoot.querySelector(`#list_${ list._id }`))

				User.deleteList(list._id, {
					board_id: this.board
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

		this.updateCardsOnList = (listId, index) => {
			let clearId = listId.split('_')[1]
			let listDiv = this.shadowRoot.querySelector(`#${ listId }`)
			let listContainer = listDiv.querySelector('.listContainer')
			while (listContainer.firstChild)
				listContainer.removeChild(listContainer.firstChild)

			let loading = listContainer.appendChild(document.createElement('img'))
			loading.src = './assets/loading.svg'
			loading.style = `
					width: 32px;
					margin: auto;
				`
			User.getCards(clearId, {
				board_id: this.board
			})
				.then((res) => {
					res.map((r) => {
						this.addCardToList(clearId, r)
					})
					if (index >= this.lists.length - 1) {
						loadingLock = false
						appLoading.loading = false
					}
					listContainer.removeChild(loading)
				})
		}

		this.showCardForm = (list) => {
			this.newCardOwner = list
			let container = this.shadowRoot.querySelector('#cardFormContainer')
			let shadow = this.shadowRoot.querySelector('#cardShadow')
			let form = this.shadowRoot.querySelector('#cardForm')
			let titleInput = container.querySelector('#cardTitleInput')
			container.style.display = 'flex'
			titleInput.focus()
			shadow.style.animation = 'fadeIn .2s linear'
			form.style.animation = 'rollIn .2s ease-out'
		}

		this.hideCardForm = () => {
			this.cardTitle = ''
			this.cardDescription = ''
			removeErrMsg('cardTitle')
			removeErrMsg('cardDescription')
			const removeForm = () => {
				this.shadowRoot.removeEventListener('animationend', removeForm)
				form.style.animation = 'rollOut .5s ease-out forwards'
				this.shadowRoot.addEventListener('animationend', removeContainer)
				this.editingCard = null
			}
			const removeContainer = () => {
				this.shadowRoot.removeEventListener('animationend', removeContainer)
				this.shadowRoot.querySelector('#cardTitleInput').removeActiveClass()
				container.style.display = 'none'
				let event = new CustomEvent('editingCardUpdated')
				document.dispatchEvent(event)
			}
			let container = this.shadowRoot.querySelector('#cardFormContainer')
			let shadow = this.shadowRoot.querySelector('#cardShadow')
			let form = this.shadowRoot.querySelector('#cardForm')
			shadow.style.animation = 'fadeOut .2s linear forwards'
			this.shadowRoot.addEventListener('animationend', removeForm)
		}

		this.cardSubmit = () => {
			if (this.editingCard) {
				this.editCard()
			}
			else
				this.createCard()
		}

		this.createCard = () => {
			if (errorMsg.getMessages().length) {
				errorMsg.callAttention()
			}
			else {
				if (this.cardTitle.trim() == '')
					errorMsg.show({field: 'cardTitle', message: 'Informe o Título do novo Cartão.'})

				if (!errorMsg.getMessages().length) {
					User.createCard({
						title: this.cardTitle,
						description: this.cardDescription,
						history: [
							{
								type: 'create',
								date: new Date().toLocaleString('pt-br')
							}
						]
					}, {
						board_id: this.board,
						list_id: this.newCardOwner._id
					})
						.then((card) => {
							this.hideCardForm()

							this.newCardOwner.cards.push(card._id)

							User.editList({
								cards: this.newCardOwner.cards
							}, {
								list_id: this.newCardOwner._id,
								board_id: this.board
							})
								.then((res) => {
									this.lists.find(list => list._id == res._id).cards = res.cards
									this.addCardToList(this.newCardOwner._id, card)
								})
								.catch((err) => {
									errorMsg.show({message: err.error})
								})
						})
						.catch((err) => {
							errorMsg.show({message: err.error})
						})
				}
			}
		}

		this.addCardToList = (listId, card) => {
			let listDiv = this.shadowRoot.querySelector(`#list_${ listId }`)
			let container = listDiv.querySelector('.listContainer')

			let cardDiv = container.appendChild(document.createElement('div'))
			cardDiv.id = `card_${ card._id }`
			cardDiv.classList.add('card')

			let cardTitle = cardDiv.appendChild(document.createElement('b'))
			cardTitle.classList.add('cardTitle')
			cardTitle.innerText = card.title

			if (card.description && !cardDiv.querySelector('hr'))
				cardDiv.appendChild(document.createElement('hr'))

			let cardDescription = cardDiv.appendChild(document.createElement('p'))
			cardDescription.classList.add('cardDescription')
			cardDescription.innerText = card.description

			if (card.history.length > 0) {
				cardDescription.style.marginBottom = '30px'

				let history = cardDiv.appendChild(document.createElement('sub'))
				history.classList.add('cardHistory')
				let lastUpdate = card.history[card.history.length - 1]
				let date = lastUpdate.date.split(' ')[0]
				let time = lastUpdate.date.split(' ')[1].slice(0, 5)
				history.innerHTML = `&#x1F550 ${ date } - ${ time }`
			}

			cardDiv.oncontextmenu = (e) => {
				if (!this.isTouchScreen && Array.from(e.target.classList).includes('card')) {
					let theCard = this.shadowRoot.querySelector(`#card_${ card._id }`)
					let cardParent = theCard.parentElement.parentElement
					let cardParentId = cardParent.id.split('_')[1]
					this.showSubmenu(cardParentId, card)
				}
				e.preventDefault()
			}
			cardDiv.onmousedown = (e) => {
				let target = e.target
				if (Array.from(target.classList).includes('card')) {
					this.mouseDownPos = {
						x: (e.touches ? e.touches[0].clientX : e.clientX),
						y: (e.touches ? e.touches[0].clientY : e.clientY)
					}
					this.currentMousePos = this.mouseDownPos
					this.mouseDownTimer = setTimeout(() => {
						clearTimeout(this.mouseDownTimer)
						if (!this.mouseMoved()) {
							if (this.isTouchScreen && this.touchedMoreThanOnce)
								navigator.vibrate(['250'])
							this.draggingComponent = target

							target.style.animation = 'smoothAttention .2s linear 2'
							const removeAnimation = () => {
								target.removeEventListener('animationend', removeAnimation)
								target.style.animation = 'unset'
							}
							target.addEventListener('animationend', removeAnimation)

							if (this.isTouchScreen) {
								this.mouseDownTimer = setTimeout(() => {
									if (!this.mouseMoved()) {
										this.onmouseup()
										if (this.isTouchScreen && this.touchedMoreThanOnce)
											navigator.vibrate(['250'])
										let theCard = this.shadowRoot.querySelector(`#card_${ card._id }`)
										let cardParent = theCard.parentElement.parentElement
										let cardParentId = cardParent.id.split('_')[1]
										this.showSubmenu(cardParentId, card)
									}
								}, 750)
							}
						}
					}, 250)
				}
			}
			cardDiv.ontouchstart = cardDiv.onmousedown
		}

		this.showCardEditionForm = (list, card) => {
			this.editingCard = card
			let event = new CustomEvent('editingCardUpdated')
			document.dispatchEvent(event)

			this.cardTitle = this.editingCard.title
			event = new CustomEvent('cardTitleUpdated')
			document.dispatchEvent(event)
			this.cardDescription = this.editingCard.description
			event = new CustomEvent('cardDescriptionUpdated')
			document.dispatchEvent(event)

			list = this.lists.find((l) => {
				let lId = l._id
				if (typeof lId !== 'string') {
					lId = lId.toString()
				}
				if (typeof list !== 'string')
					list = list.toString()

				return lId == list
			})

			this.showCardForm(list)
		}

		this.editCard = () => {
			User.editCard({
				title: this.cardTitle,
				description: this.cardDescription,
				history: {
					type: 'edit',
					date: new Date().toLocaleString('pt-br'),
					from: {
						title: this.editingCard.title,
						description: this.editingCard.description
					},
					to: {
						title: this.cardTitle,
						description: this.cardDescription
					}
				}
			}, {
				board_id: this.board,
				list_id: this.newCardOwner._id,
				card_id: this.editingCard._id
			})
				.then((res) => {
					this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('.cardTitle').innerText = res.title
					if (res.description && !this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('hr'))
						this.shadowRoot.querySelector(`#card_${ res._id }`).insertBefore(document.createElement('hr'), this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('.cardDescription'))
					else if (!res.description && this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('hr'))
						this.shadowRoot.querySelector(`#card_${ res._id }`).removeChild(this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('hr'))
					this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('.cardDescription').innerText = res.description
					let cardHistory = this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('.cardHistory')
					if (!cardHistory) {
						cardHistory = this.shadowRoot.querySelector(`#card_${ res._id }`).appendChild(document.createElement('sub'))
						cardHistory.classList.add('cardHistory')
					}
					let lastUpdate = res.history[res.history.length - 1]
					let date = lastUpdate.date.split(' ')[0]
					let time = lastUpdate.date.split(' ')[1].slice(0, 5)
					cardHistory.innerHTML = `&#x1F550 ${ date } - ${ time }`
					this.editingCard.title = res.title
					this.editingCard.description = res.description
					this.hideCardForm()
				})
				.catch((err) => {
					if (err.error)
						errorMsg.show({message: err.error})
					else
						errorMsg.show({message: err})
				})
		}

		this.showCardDeleteForm = async (list, card) => {
			if (await zionConfirm.confirm(`Quer mesmo deletar o cartão "${ card.title }"?`, 'Essa ação não poderá ser desfeita')) {
				let theList = this.lists.find(l => l._id == list)
				theList.cards = theList.cards.filter(c => c != card._id)

				let theCard = this.shadowRoot.querySelector(`#card_${ card._id }`)
				let parent = theCard.parentElement
				parent.removeChild(theCard)

				User.deleteCard(card._id, {
					board_id: this.board,
					list_id: list
				})
			}
		}

		this.cardKeydown = (e) => {
			if (e.key == 'Shift')
				this.shiftDown = true
			if (e.key == 'Enter' && !this.shiftDown)
				this.cardSubmit()
		}

		this.onkeyup = (e) => {
			if (e.key == 'Shift')
				this.shiftDown = false
		}

		this.onmousedown = (e) => {
			if (!this.touchedMoreThanOnce)
				this.touchedMoreThanOnce = true

			this.scrollMouseDownPos = {
				x: (e.touches ? e.touches[0].clientX : e.clientX),
				y: (e.touches ? e.touches[0].clientY : e.clientY)
			}
		}

		this.onmousemove = async (e) => {

			this.currentMousePos = {
				x: e.touches ? e.touches[e.touches.length - 1].clientX : e.clientX,
				y: e.touches ? e.touches[e.touches.length - 1].clientY : e.clientY
			}

			if (this.draggingComponent) {
				if (!this.draggingShadow && !this.mouseMoved()) {
					this.oldContainer = this.draggingComponent.parentElement

					this.draggingShadow = this.draggingComponent.cloneNode(true)
					this.draggingShadow.classList = this.draggingComponent.classList

					this.draggingShadow.style.position = 'absolute'
					this.draggingShadow.style.pointerEvents = 'none'

					let compBounding = this.draggingComponent.getBoundingClientRect()
					this.draggingShadow.difX = this.mouseDownPos.x - compBounding.x
					this.draggingShadow.difY = this.mouseDownPos.y - compBounding.y

					this.shadowRoot.appendChild(this.draggingShadow)
					this.draggingComponent.style.opacity = '.1'
				}
				else if (this.draggingShadow) {
					let x = this.currentMousePos.x
					let dif = window.innerWidth / 2 - x
					if (dif < 0)
						dif *= -1
					if (dif > window.innerWidth * 33 / 100)
						this.autoScroll = (x - window.innerWidth / 2) / 2
					else
						this.autoScroll = 0
				}

				this.setDraggingShadowPos()

				let target = this.shadowRoot.elementFromPoint(this.currentMousePos.x, this.currentMousePos.y)
				if (target) {
					while (!this.isList(target) && !this.isCard(this.draggingComponent) && target.id != 'section')
						target = target.parentElement
					if (this.isList(this.draggingComponent) && this.isList(target)) {
						let container = this.shadowRoot.querySelector('#container')
						let lists = Array.from(container.children).filter(c => Array.from(c.classList).includes('list'))
						let draggingListIndex = lists.indexOf(this.draggingComponent)
						let targetIndex = lists.indexOf(target)

						if (draggingListIndex < targetIndex) {
							//arrastando da ESQ para a DIR
							lists.splice(lists.indexOf(target) + 1, 0, this.draggingComponent)
							lists.splice(lists.indexOf(this.draggingComponent), 1)
							if (target.nextElementSibling) {
								container.insertBefore(this.draggingComponent, target.nextElementSibling)
							}
							else {
								let bt = this.shadowRoot.querySelector('#addListBt')
								container.insertBefore(this.draggingComponent, bt)
							}

						}
						else if (draggingListIndex > targetIndex) {
							//arrastando da DIR para a ESQ
							lists.splice(lists.indexOf(this.draggingComponent), 1)
							lists.splice(lists.indexOf(target), 0, this.draggingComponent)
							container.insertBefore(this.draggingComponent, target)
						}
					}
					else if (this.isCard(this.draggingComponent) && (this.isCard(target) || this.isList(target))) {

						let container

						if (this.isList(target) && Array.from(target.querySelector('.listContainer').children).length == 0) {
							container = target.querySelector('.listContainer')
							container.appendChild(this.draggingComponent)
						}
						else if (this.isCard(target))
							container = target.parentElement

						if (this.isList(target)) {
							//Se o alvo for uma lista vazia ou, o mouse estiver sobre a lista, e não na div container dos cards
							container = target.querySelector('.listContainer')
							if (Array.from(container.children).length == 0)
								container.appendChild(this.draggingComponent)
							else
								container.insertBefore(this.draggingComponent, container.children[0])
						}
						else {
							let cards = Array.from(container.children).filter(c => Array.from(c.classList).includes('card'))
							let draggingCardIndex = cards.indexOf(this.draggingComponent)
							let targetIndex = cards.indexOf(target)
							let targetBounding = target.getBoundingClientRect()
							if (draggingCardIndex < targetIndex) {
								//arrastando de CIMA para BAIXO
								if (this.currentMousePos.y > targetBounding.y + targetBounding.height / 2) {
									cards.splice(cards.indexOf(target) + 1, 0, this.draggingComponent)
									cards.splice(cards.indexOf(this.draggingComponent), 1)
									if (target.nextElementSibling) {
										container.insertBefore(this.draggingComponent, target.nextElementSibling)
									}
									else {
										container.appendChild(this.draggingComponent)
									}
								}
							}
							else if (draggingCardIndex > targetIndex) {
								//arrastando de BAIXO para CIMA
								if (this.currentMousePos.y < targetBounding.y + targetBounding.height / 2) {
									cards.splice(cards.indexOf(this.draggingComponent), 1)
									cards.splice(cards.indexOf(target), 0, this.draggingComponent)
									container.insertBefore(this.draggingComponent, target)
								}
							}
						}
					}
				}

				if (!this.autoScrolling)
					this.runAutoScroll()

				e.preventDefault()
			}
			else if (this.scrollMouseDownPos) {
				let difX = this.scrollMouseDownPos.x - this.currentMousePos.x
				if (difX < 0)
					difX = difX * -1
				let difY = this.scrollMouseDownPos.y - this.currentMousePos.y
				if (difY < 0)
					difY = difY * -1

				let section = this.shadowRoot.querySelector('#section')
				section.scrollBy(this.scrollMouseDownPos.x - this.currentMousePos.x, this.scrollMouseDownPos.y - this.currentMousePos.y)
				this.scrollMouseDownPos = this.currentMousePos
			}
		}
		this.ontouchmove = this.onmousemove

		this.onmouseup = (e) => {
			this.autoScroll = 0
			this.scrollMouseDownPos = null
			this.mouseDownPos = null
			this.scrollListMouseDown = null
			this.listAutoScroll = null
			clearTimeout(this.mouseDownTimer)
			if (this.draggingComponent) {
				if (this.isList(this.draggingComponent)) {
					let container = this.shadowRoot.querySelector('#container')
					let lists = Array.from(container.children).filter(c => Array.from(c.classList).includes('list'))
					let updatedLists = []
					let listsIds = []
					lists.map((list) => {
						let cards = Array.from(list.querySelectorAll('.card')).map((card) => {
							return card.id.split('_')[1]
						})
						updatedLists.push({
							_id: list.id.split('_')[1],
							name: list.querySelector('.listName').innerText,
							cards: cards
						})
						listsIds.push(list.id.split('_')[1])
					})
					this.lists = updatedLists

					User.editBoard({
						board_id: this.board,
						lists: listsIds
					})
				}
				else if (this.isCard(this.draggingComponent)) {

					if (e) {
						let newContainer
						if (this.isList(e.composedPath()[0])) {//Se o mouse estiver sobre uma lista, pega a div container de cards dentro dela
							newContainer = e.composedPath()[0].querySelector('.listContainer')
						}
						else {
							newContainer = e.composedPath().find(p => this.isList(p))
							if (newContainer)
								newContainer = newContainer.querySelector('.listContainer')
							else
								newContainer = this.oldContainer
						}

						if (this.oldContainer) {
							let cId = this.draggingComponent.id.split('_')[1]

							//atualizando o newContainer
							let cards = Array.from(newContainer.children).filter(c => Array.from(c.classList).includes('card'))
							let updatedCards = []
							cards.map((card) => {
								updatedCards.push(card.id.split('_')[1])
							})

							appLoading.loading = true
							loadingLock = true
							User.editList({
								cards: updatedCards
							}, {
								board_id: this.board,
								list_id: newContainer.parentElement.id.split('_')[1]
							})
								.then((res) => {
									this.lists.find(list => list._id == res._id).cards = res.cards

									// atualizando o oldContainer
									cards = Array.from(this.oldContainer.children).filter(c => Array.from(c.classList).includes('card'))
									updatedCards = []
									cards.map((card) => {
										updatedCards.push(card.id.split('_')[1])
									})
									User.editList({
										cards: updatedCards
									}, {
										board_id: this.board,
										list_id: this.oldContainer.parentElement.id.split('_')[1]
									})
										.then((res) => {
											this.lists.find(list => list._id == res._id).cards = res.cards

											// atualizando histórico do card
											User.editCard({
												history: {
													type: 'move',
													date: new Date().toLocaleString('pt-br'),
													from: this.oldContainer.parentElement.querySelector('.listName').innerText,
													to: newContainer.parentElement.querySelector('.listName').innerText
												}
											}, {
												board_id: this.board,
												list_id: newContainer.parentElement.id.split('_')[1],
												card_id: cId
											})
												.then((res) => {
													let cardHistory = this.shadowRoot.querySelector(`#card_${ res._id }`).querySelector('.cardHistory')
													if (!cardHistory) {
														cardHistory = this.shadowRoot.querySelector(`#card_${ res._id }`).appendChild(document.createElement('sub'))
														cardHistory.classList.add('cardHistory')
													}
													let lastUpdate = res.history[res.history.length - 1]
													let date = lastUpdate.date.split(' ')[0]
													let time = lastUpdate.date.split(' ')[1].slice(0, 5)
													cardHistory.innerHTML = `&#x1F550 ${ date } - ${ time }`
													loadingLock = false
													appLoading.loading = false
												})
										})
								})
						}
					}
				}

				this.draggingComponent.style.opacity = '1'
				this.draggingComponent = null
			}
			if (this.draggingShadow) {
				this.shadowRoot.removeChild(this.draggingShadow)
				this.draggingShadow = null
			}
		}
		this.ontouchend = this.onmouseup

		this.mouseMoved = () => {
			let difX = this.mouseDownPos.x - this.currentMousePos.x
			if (difX < 0)
				difX = difX * -1
			let difY = this.mouseDownPos.y - this.currentMousePos.y
			if (difY < 0)
				difY = difY * -1

			return difX > 20 || difY > 20
		}

		this.showSubmenu = (list, card) => {
			if (card) {
				subMenu.show({
					clientX: this.currentMousePos.x,
					clientY: this.currentMousePos.y
				}, [
					{
						name: 'Editar',
						action: () => this.showCardEditionForm(list, card)
					},
					{
						name: 'Excluir',
						action: () => this.showCardDeleteForm(list, card)
					}
				])
			}
			else {
				subMenu.show({
					clientX: this.currentMousePos.x,
					clientY: this.currentMousePos.y
				}, [
					{
						name: 'Renomear',
						action: () => this.showEditionForm(list)
					},
					{
						name: 'Excluir',
						action: () => this.showDeleteForm(list)
					}
				])
			}
		}

		this.setDraggingShadowPos = () => {
			if (this.draggingShadow) {
				this.draggingShadow.style.left = `${ this.currentMousePos.x - this.draggingShadow.difX }px`
				this.draggingShadow.style.top = `${ this.currentMousePos.y - this.draggingShadow.difY }px`
			}
		}

		this.runAutoScroll = () => {
			if (this.draggingShadow) {
				this.autoScrolling = true

				let section = this.shadowRoot.querySelector('#section')
				section.scrollTo(section.scrollLeft + this.autoScroll / 10, 0)
				if (this.autoScroll) {
					requestAnimationFrame(this.runAutoScroll)
				}
				else {
					if (this.listAutoScroll) {
						let container = this.listAutoScroll.container
						let autoScroll = this.listAutoScroll.scroll

						container.scrollTo(0, container.scrollTop + autoScroll / 10)
						if (this.listAutoScroll)
							requestAnimationFrame(this.runAutoScroll)
						else {
							this.autoScrolling = false
							this.listAutoScroll = null
						}
					}
					else {
						this.autoScrolling = false
						this.listAutoScroll = null
					}
				}
			}
			else {
				this.autoScrolling = false
				this.listAutoScroll = null
			}
		}

		this.isList = (comp) => {
			if (!comp.classList)
				return false
			return Array.from(comp.classList).includes('list')
		}

		this.isCard = (comp) => {
			return Array.from(comp.classList).includes('card')
		}

	}

	connectedCallback() {
		if (app.user) {
			if (appMenu.showingMenu)
				appMenu.showMenu()

			appLoading.loading = true
			loadingLock = true

			this.updateListsView()

		}
	}
}

customElements.define('view-board', Board)