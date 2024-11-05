<template>
	<input type="radio" :name="name" :value="value" @change="$emit('update:modelValue', value)" v-bind="$attrs" :checked="modelValue === value" />
</template>

<script setup>
defineProps({
	name: {
		type: String,
		required: true
	},
	value: {
		type: [String, Number, Boolean],
		required: true
	},
	modelValue: {
		type: [String, Number, Boolean],
		required: true
	}
})

</script>

<style scoped>
input {
	appearance: none;
	background: var(--dark-bg1);
	margin: 0;
	font: inherit;
	min-width: 16px;
	min-height: 16px;
	width: 16px;
	height: 16px;
	max-width: 16px;
	max-height: 16px;
	border: 1px solid var(--dark-bg1);
	border-radius: 50%;
	transform: translateY(-0.075em);
	vertical-align: middle;
	transition: .2s;
	cursor: pointer;
	box-shadow: var(--dark-box-shadow);
}

.light-theme input {
	background: var(--light-bg4);
	border: 1px solid var(--light-bg4);
}

input:hover,
input:focus {
	box-shadow: var(--hover-dark-box-shadow);
	border: 1px solid var(--primary);
}

.light-theme input:hover,
.light-theme input:focus {
	box-shadow: var(--hover-light-box-shadow);
	border: 1px solid var(--primary);
}

input:active {
	box-shadow: 1px 2px 5px -2px var(--inset-dark-box-shadow);
}

.light-theme input:active {
	box-shadow: 1px 2px 5px -2px var(--inset-light-box-shadow);
}

input:checked {
	background: radial-gradient(var(--primary) 51%, var(--dark-bg1)70%);
	border: 1px solid var(--primary);
}

.light-theme input:checked {
	background: radial-gradient(var(--primary) 51%, var(--light-bg4)70%);
}
</style>