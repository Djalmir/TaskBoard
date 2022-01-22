const zionAttributes = [
	'@blur', 'z-on:blur', 'zion_blur',
	'@change', 'z-on:change',
	'@click', 'z-on:click',
	'@focus', 'z-on:focus', 'zion_focus',
	'@keydown', 'z-on:keydown',
	'@keypress', 'z-on:keypress',
	'@keyup', 'z-on:keyup',
	'@mouseenter', 'z-on:mouseenter',
	'@mouseleave', 'z-on:mouseleave',
	'@mousemove', 'z-on:mousemove',
	'@paste', 'z-on:paste',
	'@submit', 'z-on:submit',

	'z-model', 'z-for'
]

let childInShadow = false

const runZion = async (el) => {
	let inShadow = false
	let zForHistory = []
	let zionComps = []
	let child = Array.from(el.shadowRoot.children)[0]

	const nextChild = async () => {

		let matches = child.innerHTML.match(/{{.+?}}/g)
		if (matches) {
			matches.forEach((match) => {
				let clearMatch = match.replace(/[{}]/g, '')
				let keys = Array.from(Object.keys(el)).filter(key => key == clearMatch)
				if (keys.length > 0 && !Array.from(child.children).find(c => c.innerHTML.includes(match))) {

					let comp = document.createElement('zion-tag')
					zionComps.push(comp)
					comp.id = 'zionComp' + zionComps.length
					comp.innerHTML = el[clearMatch]
					child.innerHTML = child.innerHTML.replace(match, comp.outerHTML)

					let theChild = child
					const updateComp = (value) => {
						theChild.querySelector('#' + comp.id).innerHTML = value
					}

					if (!this[clearMatch]) {
						this[clearMatch] = el[clearMatch]
						updateComp(el[clearMatch])
					}

					Object.defineProperty(el, clearMatch, {
						get: () => {
							return this[clearMatch]
						},
						set: (value) => {
							this[clearMatch] = value
							updateComp(value)
							let event = new CustomEvent(`${ clearMatch }Updated`)
							document.dispatchEvent(event)
						}
					})

					let keys = Array.from(Object.keys(el))
					let keyFound = false

					keys.map(key => {
						if (clearMatch.includes(key)) {
							keyFound = key
						}
					})
					if (keyFound)
						document.addEventListener(`${ keyFound }Updated`, () => updateComp(el[keyFound]))
				}
				else if (!Array.from(child.children).find(c => c.innerHTML.includes(match))) {
					try {
						clearMatch = clearMatch
							.replace('&gt;', '>')
							.replace('&lt;', '<')

						let keys = Array.from(Object.keys(el))
						let keyFound = false

						keys.map(key => {
							if (clearMatch.includes(key)) {
								keyFound = key
								clearMatch = clearMatch.replace(key, `el['${ key }']`)
							}
						})

						if (!keyFound) {
							child.innerHTML = child.innerHTML.replace(match, eval(clearMatch))
						}
						else {
							let comp = document.createElement('zion-tag')
							zionComps.push(comp)
							comp.id = 'zionComp' + zionComps.length
							comp.innerHTML = eval(clearMatch)
							child.innerHTML = child.innerHTML.replace(match, comp.outerHTML)

							let theChild = child
							const updateComp = (value) => {
								theChild.querySelector('#' + comp.id).innerHTML = value
							}

							document.addEventListener(`${ keyFound }Updated`, () => {
								updateComp(eval(clearMatch))
							})
						}
					}
					catch (err) {
						let error = err.toString()

						if (error.includes('is not defined')) {
							let prop = error.split(' ')[1]
							if (el[prop]) {
								clearMatch = clearMatch
									.replace(prop, el[prop])
									.replace('&lt;', '<')
									.replace('&gt;', '>')

								let comp = document.createElement('zion-tag')
								zionComps.push(comp)
								comp.id = 'zionComp' + zionComps.length
								comp.innerHTML = eval(clearMatch)
								child.innerHTML = child.innerHTML.replace(match, comp.outerHTML)

								let theChild = child
								const updateComp = (value) => {
									theChild.querySelector('#' + comp.id).innerHTML = eval(clearMatch)
								}

								if (!this[prop]) {
									this[prop] = el[prop]
									updateComp()
								}

								Object.defineProperty(el, prop, {
									get: () => {
										return this[prop]
									},
									set: (value) => {
										this[prop] = value
										updateComp(value)
									}
								})
							}
						}
					}
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
										if (comp.id != 'input' && !comp.id.includes('ZionInput')) {
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
							if (target.id !== 'input' || target.id.includes('ZionInput')) {
								let comp = Array.from(target.shadowRoot.children)[0]
								const getInput = async () => {
									if (comp.id == 'input' || comp.id.includes('ZionInput')) {
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

						const setGetAndSet = () => {
							Object.defineProperty(el, funcName, {
								get: () => {
									return this[funcName]
								},
								set: (value) => {
									this[funcName] = value
									updateChild(value)
									let event = new CustomEvent(`${ funcName }Updated`)
									document.dispatchEvent(event)
								}
							})
						}

						if (this[funcName]) {
							setGetAndSet()
						}
						else {
							this[funcName] = el[funcName]
							await updateChild(el[funcName])
							setGetAndSet()
						}

						document.addEventListener(`${ funcName }Updated`, () => updateChild(el[funcName]))
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


									//verifica se tem atributos que contenham alguma variável declarada no z-for
									//e atualiza de acordo
									let tagAttributes = Array.from(tag.attributes)
									tagAttributes.map((attr) => {
										let attrMatches = attr.nodeValue.match(/{{.+?}}/g)
										if (attrMatches) {
											attrMatches.map((match) => {
												let attrClearMatch = match.replace(/[{}]/g, '').split('.')
												attrClearMatch.map((acm) => {
													let found = zForHistory.filter(hist => hist.label == acm)
													if (found.length > 0) {
														tag.setAttribute(attr.nodeName, attr.nodeValue.replace(match, found[found.length - 1].comp[attrClearMatch[1]]))
													}
												})

											})
										}
									})

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

											if (child.getAttribute('z-for'))
												child.parentElement.removeChild(child)
										})
									}
								})
							}

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
							if (el[funcName])
								func = () => eval(el[funcName](...params))
							else if (child[funcName])
								func = () => eval(child[funcName](...params))
							else if (this[funcName]) {
								func = () => eval(this[funcName](...params))
							}
						}
						else {
							if (el[funcName])
								func = eval(el[funcName])
							else if (child[funcName])
								func = eval(child[funcName])
							else if (this[funcName])
								func = eval(this[funcName])
						}
						let htmlAttr = 'on' + attr.split(/[:@_]/g)[1]

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

let timer
const removeLoading = () => {
	clearTimeout(timer)
	if (!loadingLock) {
		if (useMiniLoading)
			setMiniLoading(false)
		if (setLoading)
			setLoading(false)
	}
	else
		timer = setTimeout(() => {
			removeLoading()
		}, 100)
}

const zGet = async (url, headers) => {
	if (!loadingLock) {
		if (useMiniLoading)
			setMiniLoading(true)
		else if (setLoading)
			setLoading(true)
	}
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'get',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				removeLoading()
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}
			})
	})
}

const zPost = async (url, body, headers) => {
	if (!loadingLock) {
		if (useMiniLoading)
			setMiniLoading(true)
		else if (setLoading)
			setLoading(true)
	}
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
				removeLoading()
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}
			})
	})
}

const zPut = async (url, body, headers) => {
	if (!loadingLock) {
		if (useMiniLoading)
			setMiniLoading(true)
		else if (setLoading)
			setLoading(true)
	}
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
				removeLoading()
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}
			})
	})
}

const zDelete = async (url, headers) => {
	if (!loadingLock) {
		if (useMiniLoading)
			setMiniLoading(true)
		else if (setLoading)
			setLoading(true)
	}
	return new Promise((result, rej) => {
		fetch(url, {
			method: 'delete',
			headers: headers ? {
				...headers,
				'Content-Type': 'application/json'
			} : {
				'Content-Type': 'application/json'
			}
		})
			.then(res => {
				return (res.json())
			})
			.then(res => {
				removeLoading()
				if (res.error) {
					rej(res)
				}
				else {
					result(res)
				}
			})
	})
}