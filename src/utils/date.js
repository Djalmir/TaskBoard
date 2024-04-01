export function strToDate(str) {
	if (!str)
		return new Date()
	return new Date(str.split('/').reverse().join('-')+'T00:00:00')
}

export function dateToStr(date) {
	if (!date)
		return ''
	return new Date(date).toISOString().split('T')[0].split('-').reverse().join('/')
}