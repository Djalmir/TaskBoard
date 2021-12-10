const zionAttributes = [
	'@blur',				'z-on:blur',
	'@change',			'z-on:change',
	'@click',				'z-on:click',
	'@focus',				'z-on:focus',
	'@keydown', 		'z-on:keydown',
	'@keypress',		'z-on:keypress',
	'@keyup', 			'z-on:keyup',
	'@mouseenter',	'z-on:mouseenter',
	'@mouseleave',	'z-on:mouseleave',
	'@mousemove',		'z-on:mousemove',
	'@submit', 			'z-on:submit',

	'z-model'
]

const runZion = (el) => {
	let inShadow = false
	let child = Array.from(el.shadowRoot.children)[0]
	const nextChild = async () => {
		zionAttributes.map(async (attr) => {
			let funcName = child.getAttribute(attr)
			if (funcName) {
				if (attr == 'z-model') {
					
					const getNextComp = (comp) => {
						if (comp.children.length > 0)
							return comp.children[0]
						else if (comp.shadowRoot) {
							if (comp.nextElementSibling)
								inShadow = comp.nextElementSibling
							else if (comp.parentElement != el.shadowRoot.parentElement) {
								while ((comp.parentElement) && (!comp == el.shadowRoot.parentElement || !comp.nextElementSibling))
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


				}
				else {
					funcName = funcName.replace(/[()]/g, '')
					let func = eval(el[funcName])
					let htmlAttr = 'on' + attr.split(/[:@]/g)[1]
					child[htmlAttr] = (e) => {
						func(e)
					}
				}
			}
		})

		if (child.children.length > 0)
			child = child.children[0]
		else if (child.shadowRoot)
			child = Array.from(child.shadowRoot.children)[0]
		else if (child.nextElementSibling)
			child = child.nextElementSibling
		else if (child.parentElement != el.shadowRoot.parentElement) {
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