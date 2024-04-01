<template>
	<div :class="`${rounded ? 'rounded' : ''}`" v-bind="$attrs">
		<img :src="props.src" :alt="alt">
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	src: {
		type: String,
		required: true
	},
	alt: {
		type: String,
		required: true
	},
	size: {
		type: Number,
		default: 1
	},
	rounded: {
		type: Boolean,
		default: false
	}
})

const size = computed(() => {
	return props.size + 'em'
})

</script>

<style scoped>
div {
	width: v-bind(size);
	height: v-bind(size);
	min-width: v-bind(size);
	min-height: v-bind(size);
	overflow: hidden;
	/* background-image: v-bind(src);
	background-position: center;
	background-size: cover; */
}

div.rounded {
	border-radius: 50%;
}

img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	-webkit-user-drag: none;
}
</style>