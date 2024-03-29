<template>
	<Modal ref="modal" @close="close">

		<UserBadge :user="user" :size="3" class="userBadge" @imgClicked="profilePictureModal.show(user)" />

		<div class="info">
			<b>Email:</b><span>{{ user.email }}</span>
		</div>
		<div class="info" v-if="user.phone">
			<b>Telefone:</b><span>{{ user.phone }}</span>
		</div>
		<div class="info" v-if="user.birthDate">
			<b>Data de nascimento:</b><span>{{ dateToStr(user.birthDate) }}</span>
		</div>
		<div class="info" v-if="user.sex">
			<b>Sexo:</b><span>{{ user.sex == 'M' ? 'Masculino' : 'Feminino' }}</span>
		</div>

		<template v-slot:footer v-if="$slots.default">
			<slot></slot>
		</template>
		<ProfilePictureModal ref="profilePictureModal" :src="user.profilePictureUrl" alt="Profile picture" />
	</Modal>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Modal, ProfilePictureModal } from 'RazionComponents'
import { dateToStr } from 'RazionUtils'
import UserBadge from '@/components/uiElements/UserBadge.vue'

const modal = ref()
const profilePictureModal = ref()

const user = ref(null)

function show(receivingUser) {
	if (!receivingUser)
		return
	user.value = receivingUser
	modal.value.show()
}

function close() {
	modal.value.close()
}

defineExpose({ show, user, close })
</script>

<style scoped>
.userBadge {
	font-weight: bold;
	font-size: 1.5rem;
	margin-bottom: 17px;
	gap: 17px;
}

.info {
	margin-bottom: 7px;
	display: flex;
	gap: 7px;
	align-items: center;

}

footer {
	display: flex;
	gap: 17px;
	flex-wrap: wrap;
	margin-top: 33px;
}

footer>* {
	flex: 1;
}
</style>