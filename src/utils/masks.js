export function phoneMask(e) {
	e.target.maxLength = 15
	let value = e.target.value.replace(/\D/g, '')
		.replace(/^(\d{2})(\d)/g, '($1) $2')
		.replace(/(\d{3,5})(\d{3})/, '$1-$2')
	e.target.value = value
}

export function dateMask(e) {
	e.target.maxLength = 10
	let value = e.target.value
		.replace(/\D/g, '')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{2})(\d)/, '$1/$2')
		.replace(/(\d{4})(\d)/, '$1')
	e.target.value = value
}