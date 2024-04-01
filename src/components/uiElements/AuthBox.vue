<template>
	<div class="authCube">
		<transition name="leftRoll">
			<Login v-if="hasAccount" @goToSignup="hasAccount = false" @loggedIn="$emit('loggedIn', $event)" />
		</transition>
		<transition name="rightRoll">
			<Signup v-if="!hasAccount" @goToLogin="hasAccount = true" @signedUp="$emit('signedUp', $event)" />
		</transition>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Login from '@/components/componentElements/AuthBox/Login.vue'
import Signup from '@/components/componentElements/AuthBox/Signup.vue'

const hasAccount = ref(true)

const emit = defineEmits(['loggedIn', 'signedUp'])
</script>

<style scoped>
.authCube {
	position: relative;
	width: 100%;
	perspective: 1000px;
	display: flex;
	gap: 0;
	justify-content: center;
	align-items: flex-start;
}

.leftRoll-enter-active,
.leftRoll-leave-active,
.rightRoll-enter-active,
.rightRoll-leave-active {
	transition: .5s ease-in-out;
	backface-visibility: hidden;
	position: absolute;
	transform-origin: center;
}

.leftRoll-enter-from,
.leftRoll-leave-to {
	transform: scale(0) translate(-100%, 0%) rotateY(-90deg);
}

.rightRoll-enter-from,
.rightRoll-leave-to {
	transform: scale(0) translate(100%, 0%) rotateY(90deg);
}
</style>