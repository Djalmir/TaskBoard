<template>
	<section ref="section">
		<h1>SVG Lib</h1>
		<div id="searchInputWrapper">
			<Input placeholder="Pesquisa" v-model="iconSearch" id="iconSearchInput" :leftIcon="{ class: 'search', bold: true }" :rightIcon="{ class: 'x', action: () => iconSearch = '', style: { color: 'var(--danger)' }, bold: true, vIf: iconSearch }" />
		</div>
		<div id="svgLib">
			<div v-for="svgId in filteredSvgLib" class="svgCard" @click="copyIcon(svgId)" @keypress.enter="copyIcon(svgId)" tabindex="0">
				<Icon :class="svgId" :size="2.5"></Icon>
				<span>{{ svgId }}</span>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, inject } from 'vue'
import Input from '@/components/formElements/Input.vue'
import Icon from '@/components/uiElements/Icon.vue'

const svgLib = ref([])
const filteredSvgLib = ref([])
const iconSearch = ref('')
const section = ref()
const Message = inject('Message')
watch(iconSearch, () => {
	filteredSvgLib.value = []
	setTimeout(() => {
		if (iconSearch.value.trim()) {
			let filteredArr = svgLib.value.filter(svg => svg.includes(iconSearch.value))
			if (!filteredArr.length)
				filteredArr = ['Nenhum icone encontrado']
			filteredSvgLib.value = filteredArr
		}
		else
			filteredSvgLib.value = svgLib.value
	}, 0)
})

onMounted(() => {
	document.body.style.overflow = 'hidden'

	let viewContainer = document.querySelector('#viewContainer')
	if (viewContainer)
		viewContainer.style.padding = '0'

	fetch(`/src/assets/svgLib.svg`)
		.then(res => res.text())
		.then((res) => {
			let arr = []
			res.match(/(id=".+?")/g).forEach((idStr) => {
				arr.push(idStr.replace(`id="`, '').replace(`"`, ''))
			})
			svgLib.value = arr
			filteredSvgLib.value = arr
		})
})

let messageTimer
function copyIcon(id) {
	clearTimeout(messageTimer)
	// navigator.clipboard.writeText(`
	// 	<Icon :class="${id}" :size="1"></Icon>
	// `)
	let input = document.body.appendChild(document.createElement('input'))
	input.value = `<Icon class="${id}" :size="1" />`
	input.select()
	input.setSelectionRange(0, 99999)
	document.execCommand('copy')
	document.body.removeChild(input)
	Message.value.show({ success: 'Icon copiado' })
	messageTimer = setTimeout(() => {
		Message.value.closeAll()
	}, 2500)
}
</script>

<style scoped>
::-webkit-scrollbar {
	background: transparent;
	width: 7px;
	height: 7px;
}

::-webkit-scrollbar-track {
	background: transparent;
}

::-webkit-scrollbar-thumb {
	background: transparent;
	border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover,
.scrolling::-webkit-scrollbar-thumb {
	background: var(--dark-active);
}

section {
	/* background: linear-gradient(to right, #121212 2%, #202020, #121212 98%); */
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	overflow: auto;
	padding: 125px 5vw;
}

h1 {
	/* color: var(--color3); */
	font-size: 1.5rem;
	margin-bottom: 17px;
}

#searchInputWrapper {
	width: 100%;
	display: flex;
}

#iconSearchInput {
	margin-left: auto;
	width: 100%;
	max-width: 463px;
	min-width: 120px;
	transition: .2s;
}

#clearSearchButton {
	cursor: pointer;
	margin: 3px 3px 3px 5px;
}

#clearSearchButton:hover {
	fill: var(--primary);
	stroke: var(--primary);
}

#clearSearchButton:active {
	filter: brightness(.9);
}

#svgLib {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 17px;
	margin-top: 33px;
}

.svgCard {
	display: grid;
	grid-template-rows: 1fr;
	place-items: center;
	padding: 12px;
	gap: 7px;
	background: var(--secondary-transparent);
	color: var(--color-2);
	fill: var(--color-2);
	font-size: .9rem;
	text-align: center;
	border-radius: .4rem;
	cursor: pointer;
	flex: 1;
	min-width: 100px;
	max-width: 160px;
	box-shadow: var(--box-shadow);
	user-select: none;
	transition: .2s;
	position: relative;
}

.svgCard:hover,
.svgCard:focus {
	background: var(--primary);
	box-shadow: var(--hover-dark-box-shadow);
	color: var(--bg-1);
	fill: var(--bg-1);
}

.svgCard:active {
	filter: brightness(.7);
	box-shadow: var(--inset-dark-box-shadow);
}
</style>