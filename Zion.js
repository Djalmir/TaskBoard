const zionAttributes = [
	'@blur', 'z-on:blur',
	'@change', 'z-on:change',
	'@click', 'z-on:click',
	'@focus', 'z-on:focus',
	'@keydown', 'z-on:keydown',
	'@keypress', 'z-on:keypress',
	'@keyup', 'z-on:keyup',
	'@mouseenter', 'z-on:mouseenter',
	'@mouseleave', 'z-on:mouseleave',
	'@mousemove', 'z-on:mousemove',
	'@submit', 'z-on:submit',

	'z-model', 'z-for'
]

const runZion = (el) => {
	let inShadow = false
	let zForHistory = []
	let child = Array.from(el.shadowRoot.children)[0]
	const nextChild = async () => {
		zionAttributes.map(async (attr) => {
			let funcName = child.getAttribute(attr)
			if (funcName) {
				switch (attr) {
					case ('z-model'):
						const getNextComp = (comp) => {
							if (comp.children.length > 0)
								return comp.children[0]
							else if (comp.shadowRoot) {
								if (comp.nextElementSibling)
									inShadow = comp.nextElementSibling
								else if (comp.parentElement != el.shadowRoot) {
									while ((comp.parentElement) && (!comp == el.shadowRoot || !comp.nextElementSibling))
										inShadow = comp.parentElement

									if (inShadow.nextElementSibling)
										inShadow = inShadow.nextElementSibling
								}
								return Array.from(comp.shadowRoot.children)[0]
							}
							else if (comp.nextElementSibling)
								return comp.nextElementSibling
							else if (comp.parentElement != el.shadowRoot) {
								while ((comp.parentElement) && (!comp == el.shadowRoot || !comp.nextElementSibling))
									comp = comp.parentElement
								if (comp.nextElementSibling)
									return comp.nextElementSibling
								else if (inShadow) {
									return inShadow
								}
								else {
									return false
								}
							}
							else
								return false
						}

						const updateChild = (value) => {
							let updated = false
							let comp = Array.from(el.shadowRoot.children)[0]

							const getInput = async () => {
								if (comp.getAttribute('z-model') == funcName) {
									const getCompInput = async () => {
										if (comp.id != 'input') {
											comp = await getNextComp(comp)
										}
										else {
											comp.value = value
											if (comp.value.trim() != '')
												comp.nextElementSibling.classList.add('active')
											updated = true
										}

										if (comp && !updated)
											await getCompInput()
									}
									await getCompInput()
								}
								else {
									comp = await getNextComp(comp)
								}
								if (comp && !updated)
									getInput()
							}
							getInput()
						}

						child.addEventListener('keyup', function (e) {
							let target = e.target
							if (target.id !== 'input') {
								let comp = Array.from(target.shadowRoot.children)[0]
								const getInput = async () => {
									if (comp.id == 'input') {
										target = comp
										el[funcName] = target.value
										comp = false
									}
									else {
										comp = await getNextComp(comp)
									}

									if (comp)
										getInput()
								}
								getInput()
							}
							else {
								el[funcName] = target.value
							}
						})

						if (!this[funcName]) {
							this[funcName] = el[funcName]
							await updateChild(el[funcName])
						}

						Object.defineProperty(el, funcName, {
							get: () => {
								return this[funcName]
							},
							set: (value) => {
								this[funcName] = value
								updateChild(value)
							}
						})
						break

					case ('z-for'):
						function setZfor(child) {
							let attrs = child.getAttribute('z-for').split(' in ')
							let matches = child.innerHTML.match(/{{.+?}}/g)

							if (el[attrs[1]]) {
								el[attrs[1]].map((nick, index) => {
									//SETAR OS ATRIBUTOS DA CHILD NA TAG
									let tag = child.parentElement.insertBefore(document.createElement(child.tagName), child)
									tag.innerHTML = child.innerHTML

									matches.map((match, i) => {
										let clearMatch = match.replace(/[{}]/g, '')
										if (clearMatch.includes('.')) {
											clearMatch = clearMatch.split('.')
											if (clearMatch[0] == attrs[0])
												clearMatch = clearMatch[1]
										}
										if (nick[clearMatch])
											tag.innerHTML = tag.innerHTML.replace(match, nick[clearMatch])
									})

									//NÃO ESTÁ FUNCIONANDO MAIS DE UM ANINHAMENTO.
									//TAMBÉM NÃO ESTÁ FUNCIONANDO DOIS IRMÃOS Z-FOR FILHOR DE OUTRO Z-FOR
									while (tag.innerHTML.includes(`z-for`)) {
										let newChild = Array.from(tag.children).find(c => c.getAttribute('z-for'))
										let newAttrs = newChild.getAttribute('z-for').split(' in ')
										let newMatches = newChild.innerHTML.match(/{{.+?}}/g)
										let aux = newAttrs[1].split('.')

										if (aux.length > 1)
											newAttrs[1] = nick[aux[1]]
										else
											newAttrs[1] = el[aux]

										newAttrs[1].map((newNick, i) => {
											tag = newChild.parentElement.insertBefore(document.createElement(newChild.tagName), newChild)
											tag.innerHTML = newChild.innerHTML
											if (newMatches)
												newMatches.map((match, o) => {
													let newClearMatch = match.replace(/[{}]/g, '')
													if (newClearMatch.includes('.')) {
														newClearMatch = newClearMatch.split('.')
														if (newClearMatch[0] == newAttrs[0])
															newClearMatch = newClearMatch[1]
													}
													if (newNick[newClearMatch])
														tag.innerHTML = tag.innerHTML.replace(match, newNick[newClearMatch])
													else {
														tag.innerHTML = tag.innerHTML.replace(match, newNick)
													}
												})
										})
										newChild.style.display = 'none'
									}
								})
							}
							child.style.display = 'none'
						}
						setZfor(child)
						break

					default:
						funcName = funcName.replace(/[()]/g, '')
						let func = eval(el[funcName])
						let htmlAttr = 'on' + attr.split(/[:@]/g)[1]
						child[htmlAttr] = (e) => {
							func(e)
						}
						break
				}
			}
		})

		if (child.children.length > 0)
			child = child.children[0]
		else if (child.shadowRoot)
			child = Array.from(child.shadowRoot.children)[0]
		else if (child.nextElementSibling)
			child = child.nextElementSibling
		else if (child.parentElement != el.shadowRoot) {
			while (child.parentElement && (!child == el.shadowRoot || !child.nextElementSibling))
				child = child.parentElement

			if (child.nextElementSibling)
				child = child.nextElementSibling
			else
				child = false
		}
		else
			child = false

		if (child)
			nextChild()
	}
	nextChild()
}