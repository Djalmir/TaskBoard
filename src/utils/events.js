export function dispatchEvent(event, data) {
	document.dispatchEvent(new CustomEvent(event, { detail: data }))
}