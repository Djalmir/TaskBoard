<template>
	<label>
		<span v-if="label">
			{{ label }}
		</span>
		<textarea :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
	</label>
</template>

<script setup>
const props = defineProps(['modelValue', 'label'])
</script>

<style scoped>
label {
	display: flex;
	flex-direction: column;
	gap: 3px;
	width: fit-content;
	margin: 7px 0 17px;
}

span {
	font-size: .9rem;
	padding-left: 7px;
	white-space: nowrap;
	font-weight: bold;
}

textarea {
	font-family: 'Roboto', sans-serif;
	font-size: inherit;
	padding: 7px;
	border-radius: .3rem;
	box-shadow: var(--inset-dark-box-shadow);
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	color: var(--dark-font1);
	min-height: 33px;
	resize: inherit;
}

textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus {
	-webkit-box-shadow: var(--inset-dark-box-shadow), inset 0 0 0 1000px var(--dark-bg1) !important;
	box-shadow: var(--inset-dark-box-shadow), inset 0 0 0 1000px var(--dark-bg1) !important;
}

.light-theme textarea {
	background: linear-gradient(145deg, var(--light-bg4), var(--light-bg3));
	color: var(--light-font2);
}

.light-theme textarea:-webkit-autofill,
.light-theme textarea:-webkit-autofill:hover,
.light-theme textarea:-webkit-autofill:focus {
	-webkit-box-shadow: var(--inset-light-box-shadow), inset 0 0 0 1000px var(--light-bg4) !important;
	box-shadow: var(--inset-light-box-shadow), inset 0 0 0 1000px var(--light-bg4) !important;
	-webkit-text-fill-color: var(--light-font2) !important;
}

textarea:disabled,
textarea.disabled
 {
	background: transparent;
	box-shadow: none;
}
</style>