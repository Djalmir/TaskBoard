export default class Login extends HTMLElement {
  constructor(){
    super()
    const template = document.createElement('template')
    
    const style = template.appendChild(document.createElement('style'))
    style.textContent = `
    
    `
    
    const h1 = template.appendChild(document.createElement('h1'))
    h1.innerText = 'Tela de login'
  }
}