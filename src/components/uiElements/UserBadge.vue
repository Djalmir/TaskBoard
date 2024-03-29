<template>
	<div :class="`user ${props.class ? props.class : ''}`">
		<div class="userAvatar" @click="$emit('imgClicked')" v-if="user.profilePicture">
			<Image :src="user.profilePictureUrl" :size="size" alt="User Avatar" />
		</div>
		<Icon class="user" :size="size" v-else />
		<span>{{ user.name }}</span>
	</div>
</template>

<script setup>
import { computed } from 'vue'
import { Image, Icon } from 'RazionComponents'

const props = defineProps({
	user: {
		type: [Object, String],
		required: true
	},
	size: {
		type: Number,
		default: 2
	},
	class: {
		type: String
	}
})

const minSize = computed(() => {
	return `${ props.size }em`
})

</script>

<style scoped>
.user {
	display: flex;
	gap: 7px;
	align-items: center;
	user-select: none;
}

.userAvatar {
	width: v-bind(minSize);
	height: v-bind(minSize);
	min-width: v-bind(minSize);
	min-height: v-bind(minSize);
	border-radius: 50%;
	overflow: hidden;
	box-shadow: var(--dark-box-shadow);
}

.light-theme .userAvatar {
	box-shadow: var(--light-box-shadow);
}
</style>