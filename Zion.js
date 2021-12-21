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

let childInShadow = false

const runZion = async (el) => {
	let inShadow = false
	let zForHistory = []
	let child = Array.from(el.shadowRoot.children)[0]

	const nextChild = async () => {

		let matches = child.innerHTML.match(/{{.+?}}/g)
		if (matches) {
			// console.log(matches)
			matches.forEach((match) => {
				let clearMatch = match.replace(/[{}]/g, '')
				// let elArr = Array.from(el.shadowRoot.children)
				// console.log(elArr)
				// let lastChildChildren = elArr[elArr.length - 1].children
				// console.log(lastChildChildren)
				if (el[clearMatch]) {
					child.innerHTML = child.innerHTML.replace(match, el[clearMatch])
				}
				else {
					try {
						child.innerHTML = child.innerHTML.replace(match, eval(clearMatch))
					}
					catch {}
				}
			})
		}

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

						if (this[funcName]) {
							Object.defineProperty(el, funcName, {
								get: () => {
									return this[funcName]
								},
								set: (value) => {
									this[funcName] = value
									updateChild(value)
								}
							})
						}
						break

					case ('z-for'):
						function setZfor(child) {
							let attrs = child.getAttribute('z-for').split(' in ')
							let matches = child.innerHTML.match(/{{.+?}}/g)

							if (Number(attrs[1])) {
								el['temp'] = Array.from({length: Number(attrs[1])}, (v, i) => i)
								attrs[1] = 'temp'
							}

							if (el[attrs[1]]) {
								el[attrs[1]].map((nick, index) => {

									if (!zForHistory.find(z => z.comp == nick)) {
										zForHistory.push({
											label: attrs[0],
											comp: nick
										})
									}

									let tag = child.parentElement.insertBefore(document.createElement(child.tagName), child)
									Array.from(child.attributes).map((attr) => {
										if (attr.nodeName != 'z-for')
											tag.setAttribute(attr.nodeName, attr.nodeValue)
									})
									tag.innerHTML = child.innerHTML

									if (matches)
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

									if (tag.innerHTML.includes(`z-for`)) {
										let tagsArr = Array.from(tag.children).filter(t => t.getAttribute('z-for'))
										tagsArr.forEach((newChild) => {
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
												if (newMatches) {
													newMatches.map((match, o) => {
														let newClearMatch = match.replace(/[{}]/g, '')
														if (newClearMatch.includes('.')) {
															newClearMatch = newClearMatch.split('.')
															if (newClearMatch[0] == newAttrs[0])
																newClearMatch = newClearMatch[1]
														}
														if (newNick[newClearMatch]) {
															tag.innerHTML = tag.innerHTML.replace(match, newNick[newClearMatch])
														}
														else {
															if (Array.isArray(newClearMatch)) {
																let z = Array.from(tag.children).find(c => c.getAttribute('z-for'))
																if (z) {
																	setZfor(z)
																}
															}
															else
																tag.innerHTML = tag.innerHTML.replace(match, newNick)

														}
													})
												}
											})
											// newChild.style.display = 'none'
											if (child.getAttribute('z-for'))
												child.parentElement.removeChild(child)
										})
									}
								})
							}

							// child.style.display = 'none'
							if (child.getAttribute('z-for'))
								child.parentElement.removeChild(child)
						}
						setZfor(child)
						break

					default:

						let params = funcName.match(/\(.+?\)/g)
						if (params) {
							params = params[0].replace(/[()]/g, '').split(',').map((i) => {return eval(i.trim())})
						}
						funcName = funcName.replace(/\(.+?\)/g, '')
						let func
						if (params) {
							func = () => eval(el[funcName](...params))
						}
						else {
							if (el[funcName])
								func = eval(el[funcName])
							else if (child[funcName])
								func = eval(child[funcName])

						}
						let htmlAttr = 'on' + attr.split(/[:@]/g)[1]

						if (func) {
							child[htmlAttr] = (e) => {
								func(e)
							}
						}
						break
				}
			}
		})

		if (child.children.length > 0)
			child = child.children[0]
		else if (child.shadowRoot) {
			if (child.nextElementSibling)
				childInShadow = child.nextElementSibling
			else if (child.parentElement != el.shadowRoot) {
				while ((child.parentElement) && (!child == el.shadowRoot || !child.nextElementSibling))
					childInShadow = child.parentElement

				if (childInShadow.nextElementSibling)
					childInShadow = childInShadow.nextElementSibling
			}
			child = Array.from(child.shadowRoot.children)[0]
		}
		else if (child.nextElementSibling)
			child = child.nextElementSibling
		else if (child.parentElement != el.shadowRoot) {
			while (child.parentElement && (!child == el.shadowRoot || !child.nextElementSibling))
				child = child.parentElement

			if (child.nextElementSibling)
				child = child.nextElementSibling
			else if (childInShadow) {
				child = childInShadow
				childInShadow = null
			}
			else
				child = false
		}
		else
			child = false

		if (child)
			nextChild()
	}
	await nextChild()
}


const zGet = async (url, body, headers) => {
	if (setLoading)
		setLoading(true)
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'get',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : null
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}
				
				if (setLoading)
					setLoading(false)
			})
	})
}

const zPost = async (url, body, headers) => {
	if (setLoading)
		setLoading(true)
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'post',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : null
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}

				if (setLoading)
					setLoading(false)
			})
	})
}

const zPut = async (url, body, headers) => {
	if (setLoading)
		setLoading(true)
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'put',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : null
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}

				if (setLoading)
					setLoading(false)
			})
	})
}

const zDelete = async (url, body, headers) => {
	if (setLoading)
		setLoading(true)
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'delete',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			},
			body: body ? JSON.stringify(body) : null
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}

				if (setLoading)
					setLoading(false)
			})
	})
}