const zionAttributes = [
  'z-on:click',
  '@click',
]
  
const setOnClicks = (el) => {
	let child = Array.from(el.shadowRoot.children)[0]
	const nextChild = () => {
		zionAttributes.map((attr)=>{
  		let funcName = child.getAttribute(attr)
  		if (funcName) {
  			funcName = funcName.replace(/[()]/g, '')
  			let func = eval(el[funcName])
  			child.onclick = () => func()
  		}
		})

		if (child.children.length > 0)
			child = child.children[0]
		else if (child.nextElementSibling)
			child = child.nextElementSibling
		else if (child.parentElement != el.shadowRoot.parentElement) {
			while (child.parentElement && (child != el.shadowRoot.parentElement || !child.nextElementSibling))
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