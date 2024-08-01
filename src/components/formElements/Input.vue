<template>
	<label>
		<span v-if="label">
			{{ label }}
		</span>
		<div class="inputWrapper">
			<Icon v-if="showLeftIcon" :class="`${leftIcon.class} icon`" @click="leftIcon.action" :size="leftIcon.size || 1.2" :style="leftIcon.style" :bold="leftIcon.bold"></Icon>
			<input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" />
			<Icon v-if="showRightIcon" :class="`${rightIcon.class} icon rightIcon`" @click="rightIcon.action" :size="rightIcon.size || 1.2" :style="rightIcon.style" :bold="rightIcon.bold"></Icon>
		</div>
	</label>
</template>

<script setup>
import { computed } from 'vue'
import Icon from '@/components/uiElements/Icon.vue'
const props = defineProps(['modelValue', 'label', 'leftIcon', 'rightIcon'])
const showLeftIcon = computed(() => {
	return props.leftIcon && (props.leftIcon.vIf != undefined ? props.leftIcon.vIf : true)
})
const showRightIcon = computed(() => {
	return props.rightIcon && (props.rightIcon.vIf != undefined ? props.rightIcon.vIf : true)
})
const iconPadding = computed(() => {
	return props.leftIcon || props.rightIcon ? '33px' : '7px'
})
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

.inputWrapper {
	position: relative;
}

.inputWrapper .icon {
	position: absolute;
	top: 50%;
	left: 7px;
	transform: translateY(-50%);
	/* padding: 7px; */
	cursor: pointer;
}

.inputWrapper .icon.rightIcon {
	right: 7px;
	left: auto;
}

input {
	font-family: 'Roboto', sans-serif;
	font-size: 1rem;
	padding: 7px v-bind(iconPadding);
	border-radius: .3rem;
	box-shadow: var(--inset-dark-box-shadow);
	background: linear-gradient(145deg, var(--dark-bg2), var(--dark-bg1));
	color: var(--dark-font1);
	width: 100%;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus {
	-webkit-box-shadow: var(--inset-dark-box-shadow), inset 0 0 0 1000px var(--dark-bg1) !important;
	box-shadow: var(--inset-dark-box-shadow), inset 0 0 0 1000px var(--dark-bg1) !important;
}

.light-theme input {
	background: linear-gradient(145deg, var(--light-bg4), var(--light-bg3));
	color: var(--light-font2);
}

.light-theme input:-webkit-autofill,
.light-theme input:-webkit-autofill:hover,
.light-theme input:-webkit-autofill:focus {
	-webkit-box-shadow: var(--inset-light-box-shadow), inset 0 0 0 1000px var(--light-bg4) !important;
	box-shadow: var(--inset-light-box-shadow), inset 0 0 0 1000px var(--light-bg4) !important;
	-webkit-text-fill-color: var(--light-font2) !important;
}
</style>