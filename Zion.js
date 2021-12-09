const zionAttributes = [
	'@blur',
	'z-on:blur',
	'@change',
	'z-on:change',
	'@click',
	'z-on:click',
	'@focus',
	'z-on:focus',
	'@mouseenter',
	'z-on:mouseenter',
	'@submit',
	'z-on:submit',
	'z-model'
	//ADICIONAR AQUI, OS EVENTOS QUE FOREM NECESSÁRIOS
]

const runZion = (el) => {
	let child = Array.from(el.shadowRoot.children)[0]
	const nextChild = () => {
		zionAttributes.map((attr) => {
			let funcName = child.getAttribute(attr)
			if (funcName) {

				if (attr == 'z-model') {
					Object.defineProperty(el.data, funcName, {
						get: () => {
							return this[funcName]
						},
						set: (value) => {
							this[funcName] = value
							updateChild(value)
						}
					})

					const getNextComp = (comp) => {
						if (comp.children.length > 0)
							return comp.children[0]
						else if (comp.shadowRoot)
							return Array.from(comp.shadowRoot.children)[0]
						else if (comp.nextElementSibling)
							return comp.nextElementSibling
						else if (comp.parentElement != el.shadowRoot.parentElement) {
							while (comp.parentElement && (!comp == el.shadowRoot.parentElement || !comp.nextElementSibling))
								comp = comp.parentElement

							if (comp.nextElementSibling)
								return comp.nextElementSibling
							else
								return false
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
									if (comp.tagName != 'INPUT') {
										comp = await getNextComp(comp)
									}
									else {
										comp.value = value
										comp.nextElementSibling.classList.add('active')
										updated = true
									}

									if (comp && !updated)
										getCompInput()
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
						//CASO O E.TARGET SEJA UM COMPONENTE ZION
						if (target.tagName !== 'INPUT') {
							let comp = Array.from(target.shadowRoot.children)[0]
							const getInput = async () => {
								if (comp.tagName == 'INPUT') {
									target = comp
									el.data[funcName] = target.value			
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
							el.data[funcName] = target.value
						}
					})
				}
				else {
					funcName = funcName.replace(/[()]/g, '')
					let func = eval(el[funcName])
					let htmlAttr = 'on' + attr.split(/[:@]/g)[1]
					child[htmlAttr] = () => func()
				}
			}
		})

		if (child.children.length > 0)
			child = child.children[0]
		else if (child.nextElementSibling)
			child = child.nextElementSibling
		else if (child.parentElement != el.shadowRoot.parentElement) {
			while (child.parentElement && (!child == el.shadowRoot.parentElement || !child.nextElementSibling))
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