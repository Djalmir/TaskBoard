<template>
	<div class="tableWrapper">
		<div v-if="renderingTable" class="loaderWrapper">
			<div class="loaderDiv">
				<Icon class="loader" :size="2" />
				Carregando...
			</div>
		</div>
		<div class="table" :style="{ display: renderingTable ? 'none' : 'block' }">
			<div class="headingRow" ref="headingRow">
				<slot name="headingRow"></slot>
			</div>
			<div class="rows" ref="rows">
				<slot name="rows"></slot>
			</div>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref, computed, onBeforeUnmount } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'

const props = defineProps({
	templateColumns: {
		type: String,
		default: "minmax(220px, 1fr) minmax(120px, .5fr) minmax(180px, 1fr) 1fr",
	},
})

const headingRow = ref(null)
const rows = ref(null)
const observer = ref(null)
const themeObserver = ref(null)
const renderingTable = ref(true)
const autoUpdating = ref(false)
const windowHeight = ref(window.innerHeight)
const bounding = computed(() => { return document.querySelector('.table').getBoundingClientRect() })
const rowsWrapperHeight = computed(() => {
	return windowHeight.value - bounding.value.top - 62 + 'px'
})

onMounted(() => {
	if (props.templateColumns) {
		document.documentElement.style.setProperty('--template-columns', props.templateColumns)
	}

	initObserver()
	window.addEventListener('resize', () => {
		windowHeight.value = window.innerHeight
	})

	document.addEventListener('setLoading', setLoading)
})

const darkTheme = ref(document.documentElement.classList.contains('dark-theme'))
const darkTitlesRow = `
	display: grid;
	grid-template-columns: var(--template-columns);
	padding: 0 17px;
	color: var(--dark-font2);
`
const lightTitlesRow = `
	display: grid;
	grid-template-columns: var(--template-columns);
	padding: 0 17px;
	color: var(--light-font2);
`
const titleSpanStyle = `
	white-space: nowrap;
	overflow: hidden;
	padding: 11px 7px;
	font-weight: bold;
	font-size: 1.2rem;
`
const darkRow = (idx) => {
	return `
		display: grid;
		grid-template-columns: var(--template-columns);
		background: ${ idx % 2 ? 'var(--dark-bg1)' : 'var(--dark-bg3)' };
		padding: 0 17px;
		color: var(--dark-font1);
		cursor: pointer;
		transition: .1s;
	`
}
const lightRow = (idx) => {
	return `
		display: grid;
		grid-template-columns: var(--template-columns);
		background: ${ idx % 2 ? 'var(--light-bg1)' : 'var(--light-bg3)' };
		padding: 0 17px;
		color: var(--light-font1);
		cursor: pointer;
		transition: .1s;
	`
}
const spanStyle = `
	overflow: hidden;
	padding: 11px 7px;
`
let titleStyleDone = false
function handleChildrenChanged() {
	renderingTable.value = true
	autoUpdating.value = true

	setTimeout(() => {
		if (!titleStyleDone) {
			let titlesRow = headingRow.value.children[0]
			titlesRow.classList.add('titlesRow')
			titlesRow.style = darkTheme.value ? darkTitlesRow : lightTitlesRow
			let tds = titlesRow.innerText.split('%|').reduce((arr, curr) => {
				arr.push(curr.trim())
				return arr
			}, [])
			titlesRow.innerText = ''
			tds.map((td) => {
				let span = titlesRow.appendChild(document.createElement('span'))
				span.style = titleSpanStyle
				span.innerText = td
			})
			titleStyleDone = true
		}

		let rowsChildren = Array.from(rows.value.children)
		rowsChildren.map((row, idx) => {
			if (row.innerText.includes('%|')) {
				row.style = darkTheme.value ? darkRow(idx) : lightRow(idx)
				row.onmouseenter = () => {
					row.style.filter = 'brightness(1.2)'
					row.style.padding = '7px 17px'
				}
				row.onmousedown = () => {
					row.style.filter = 'brightness(.7)'
				}
				row.onmouseup = () => {
					row.style.filter = 'brightness(1.2)'
				}
				row.onmouseleave = () => {
					row.style.filter = 'brightness(1)'
					row.style.padding = '0 17px'
				}
				let tds = row.innerText.split('%|').reduce((arr, curr) => {
					arr.push(curr.trim())
					return arr
				}, [])
				row.innerText = ''
				tds.map((td) => {
					let span = row.appendChild(document.createElement('span'))
					span.style = spanStyle
					span.innerText = td
				})
			}
		})
		setTimeout(() => {
			renderingTable.value = false
			autoUpdating.value = false
		}, 0)
	}, 0)
}

function themeUpdated() {
	darkTheme.value = document.documentElement.classList.contains('dark-theme')
	let titlesRow = headingRow.value.children[0]
	let rowsChildren = Array.from(rows.value.children)
	titlesRow.style = darkTheme.value ? darkTitlesRow : lightTitlesRow
	rowsChildren.map((row, idx) => {
		row.style = darkTheme.value ? darkRow(idx) : lightRow(idx)
	})
}

function initObserver() {
	let config = {
		childList: true,
		// subtree: true,
		// attributes: true,
		// attributeList: [ 'id' ] 
	}
	observer.value = new MutationObserver(() => {
		if (!autoUpdating.value)
			handleChildrenChanged()
	})
	observer.value.observe(headingRow.value, config)
	observer.value.observe(rows.value, config)

	setTimeout(() => {
		themeObserver.value = new MutationObserver(() => {
			themeUpdated()
		})
		config = {
			attributes: true
		}
		themeObserver.value.observe(document.documentElement, config)
	}, 0)
}

function refresh() {
	handleChildrenChanged()
}

function setLoading(loading) {
	if (loading)
		renderingTable.value = true
}

onBeforeUnmount(() => {
	observer.value?.disconnect()
	themeObserver.value?.disconnect()
})

defineExpose({
	refresh
})
</script>

<style scoped>
.tableWrapper {
	width: 100%;
	height: v-bind(rowsWrapperHeight);
	overflow: auto;
	padding: 0 0 70px;
	position: relative;
	user-select: none;
}

.table {
	min-width: 1024px;
}

.headingRow {
	position: sticky;
	top: -35px;
	left: 0;
	z-index: 1;
	padding-top: 47px;
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	box-shadow: var(--dark-box-shadow);
}

.light-theme .headingRow {
	background: linear-gradient(145deg, var(--light-bg2), var(--light-bg1));
	box-shadow: var(--light-box-shadow);
}

.loaderWrapper {
	position: absolute;
	inset: 0;
	display: grid;
	place-items: center;
}

.loaderDiv {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: .5rem;
	width: fit-content;
}
</style>./Icon.vue./Icon.vue./Icon.vue./Icon.vue