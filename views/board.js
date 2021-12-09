export default class Board extends HTMLElement {
  constructor(){
    super()
    const shadow = this.attachShadow({mode:'open'})
    
    const style = shadow.appendChild(document.createElement('style'))
    style.textContent = `
    
    `
    
    const h1 = shadow.appendChild(document.createElement('h1'))
    h1.innerText = 'Quadro'

		runZion(this)
  }
}

customElements.define('v-board', Board)