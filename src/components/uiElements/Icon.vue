<template>
	<svg :width="size" :height="size" :class="`${rounded ? 'rounded' : ''} ${className}`">
		<use :href="getIcon" />
	</svg>
</template>

<script setup>
import { computed } from 'vue'
import svgLib from '@/assets/svgLib.svg'
const props = defineProps({
	size: {
		type: Number,
		default: 1
	},
	class: {
		type: String,
		required: true
	},
	rounded: {
		type: Boolean,
		default: false
	}
})
const getIcon = computed(() => {
	return `${ svgLib }#${ className.value.split(' ')[0] }`
})
const className = computed(() => { return props.class })
const minSize = props.size + 'rem'
</script>

<style scoped>
svg {
	fill: currentColor;
	/* border-radius: .4rem; */
	min-width: v-bind(minSize);
	min-height: v-bind(minSize);
	width: v-bind(minSize);
	height: v-bind(minSize);
}

svg.rounded {
	border-radius: 50%;
}
</style>