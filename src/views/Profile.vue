<template>
	<section>
		<form action="javascript:void(0)">
			<div class="flexDiv">
				<div id="pictureWrapper" @mouseenter="mouseInPicture = true" @mouseleave="mouseInPicture = false">
					<input type="file" accept="image/*" ref="filePicker" id="filePicker" hidden @change="updateProfilePicture" />
					<div id="pictureInnerWrapper">
						<Image v-if="profilePicture" :src="profilePicture" alt="Profile picture" :size="4.5" @click="() => { if (!editing) profilePictureModal.show() }" />
						<Icon v-else class="user" :size="4.5" />
					</div>
					<transition name="grow">
						<Button v-if="editing && mouseInPicture" id="editPictureBt" class="secondary" @click="filePicker.click()">
							<Icon class="edit-2" :size="1.15" />
						</Button>
					</transition>
				</div>
				<Input v-if="editing" class="input" type="text" label="Nome" v-model="name" required />
				<div v-else class="info">
					<b>Nome</b>
					<span>{{ name }}</span>
				</div>
			</div>
			<Input v-if="editing" class="input" type="email" label="Email" v-model="email" required />
			<div v-else class="info">
				<b>Email</b>
				<span>{{ email }}</span>
			</div>
			<div class="flexDiv">
				<Input v-if="editing" class="input" type="text" inputmode="numeric" label="Telefone" v-model="phone" @input="phoneMask" />
				<div v-else class="info">
					<b>Telefone</b>
					<span>{{ phone }}</span>
				</div>
				<Input v-if="editing" class="input" type="text" inputmode="numeric" label="Data de nascimento" v-model="birthDate" @input="dateMask" />
				<div v-else class="info">
					<b>Data de nascimento</b>
					<span>{{ birthDate }}</span>
				</div>
			</div>

			<div class="flexDiv" style="align-items: flex-end; justify-content: space-between;">
				<fieldset>
					<legend>Sexo</legend>
					<div class="flexDiv">
						<label v-if="editing || sex == 'M'" style="cursor: pointer;">
							<Radio v-if="editing" v-model="sex" name="sex" value="M" label="Masculino" :checked="sex == 'M'" />
							<span style="padding-left:7px">Masculino</span>
						</label>
						<label v-if="editing || sex == 'F'" style="cursor: pointer;">
							<Radio v-if="editing" v-model="sex" name="sex" value="F" label="Feminino" :checked="sex == 'F'" />
							<span style="padding-left:7px">Feminino</span>
						</label>
					</div>
				</fieldset>
			</div>
			<Button v-show="editing" id="changePasswordBt" class="danger" @click="passwordEditionModal.show()">Alterar Senha</Button>
			<footer>
				<Button v-if="!editing" class="danger" @click="accountDeletionModal.show()">Excluir conta</Button>
				<Button v-if="!editing" class="primary" @click="editing = true">Editar</Button>
				<Button v-if="editing" class="secondary" @click="cancelEdition">Cancelar</Button>
				<Button v-if="editing" type="submit" @click="updateProfile">Salvar</Button>
			</footer>
		</form>
	</section>
	<PasswordEditionModal ref="passwordEditionModal" />
	<AccountDeletionModal ref="accountDeletionModal" />
	<ProfilePictureModal ref="profilePictureModal" :src="profilePicture" alt="Profile picture" />
</template>

<script setup>

import { ref, onMounted, inject } from 'vue'
import { useStore } from 'vuex'
import Image from '@/components/uiElements/Image.vue'
import Icon from '@/components/uiElements/Icon.vue'
import Input from '@/components/formElements/Input.vue'
import Button from '@/components/uiElements/Button.vue'
import Radio from '@/components/formElements/Radio.vue'
import PasswordEditionModal from '@/components/viewElements/Profile/PasswordEditionModal.vue'
import AccountDeletionModal from '@/components/viewElements/Profile/AccountDeletionModal.vue'
import ProfilePictureModal from '@/components/viewElements/Profile/ProfilePictureModal.vue'
import { strToDate, dateToStr } from '@/utils/date.js'
import { phoneMask, dateMask } from '@/utils/masks.js'
import { dispatchEvent } from '@/utils/events.js'
import authApi from '@/services/authApi.js'

const store = useStore()

const filePicker = ref()
const passwordEditionModal = ref()
const accountDeletionModal = ref()
const profilePictureModal = ref()
const Dialog = inject('Dialog').value

const editing = ref(false)

const profilePicture = ref('')
const name = ref('')
const email = ref('')
const phone = ref('')
const birthDate = ref('')
const sex = ref('')

const mouseInPicture = ref(false)

onMounted(() => {
	resetFields()
})

function resetFields() {
	filePicker.value.value = ''
	authApi.getProfile().then((res) => {
		store.dispatch('setUserProfile', { ...store.state.userProfile, ...res.data })
		profilePicture.value = res.data.profilePicture
		name.value = res.data.name
		email.value = res.data.email
		phone.value = res.data.phone
		birthDate.value = dateToStr(res.data.birthDate)
		sex.value = res.data.sex
	})
}

function updateProfilePicture() {
	const file = document.getElementById('filePicker').files[0]
	if (file) {
		profilePicture.value = URL.createObjectURL(file)
	}
}

function updateProfile() {
	let file = filePicker.value.files[0]
	let body = new FormData()
	if (!name.value)
		return dispatchEvent('showMessage', { error: 'O campo nome é obrigatório' })
	body.append('name', name.value)
	if (!email.value)
		return dispatchEvent('showMessage', { error: 'O campo email é obrigatório' })
	body.append('email', email.value)
	if (file)
		body.append('profilePicture', file)
	if (phone.value)
		body.append('phone', phone.value)
	if (birthDate.value)
		body.append('birthDate', strToDate(birthDate.value))
	if (sex.value)
		body.append('sex', sex.value)

	authApi.updateProfile(body)
		.then((res) => {
			store.dispatch('setUserProfile', { ...store.state.userProfile, ...res.data })
			dispatchEvent('showMessage', { success: 'Informações atualizadas com sucesso!' })
			editing.value = false
		})
}

function cancelEdition() {
	editing.value = false
	resetFields()
}
</script>

<style scoped>
section {
	display: grid;
	place-items: center;
	padding: 130px 17px;
	gap: 17px;
	min-height: 100dvh;
}

form {
	display: flex;
	flex-direction: column;
	gap: 17px;
	width: 90%;
}

.flexDiv {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 17px;
}

.info {
	flex: 1;
	margin: 0;
	min-width: 135px;
	overflow: auto;
}

.info b {
	display: block;
	position: sticky;
	top: 0;
	left: 0;
	margin: 0;
	font-size: .9rem;
	font-weight: bold;
	padding-left: 7px;
	white-space: nowrap;
}

.info span {
	font-size: 1rem;
	white-space: nowrap;
	display: block;
	padding: 10px 0 7px 7px;
	width: 0;
}

.input {
	width: 100%;
	min-width: 135px;
	flex: 1;
	margin: 0;
}

#pictureWrapper {
	width: 73px;
	height: 73px;
	border-radius: 50%;
	background: var(--dark-bg2);
	box-shadow: var(--dark-box-shadow);
	position: relative;
}

.light-theme #pictureWrapper {
	background: var(--light-bg2);
	box-shadow: var(--light-box-shadow);
}

#pictureInnerWrapper {
	width: 100%;
	height: 100%;
	border-radius: 50%;
	display: grid;
	place-items: center;
	overflow: hidden;
}

#editPictureBt {
	position: absolute;
	top: -7px;
	right: -7px;
	border-radius: 50%;
	width: 32px;
	height: 32px;
	display: grid;
	place-items: center;
	padding: 1px;
}

legend {
	margin-bottom: 3px;
	font-size: .9rem;
	font-weight: bold;
	padding-left: 7px;
}

#changePasswordBt {
	width: 100%;
	margin-top: 17px;
	padding: 0;
	height: 23px;
	line-height: 0;
}

footer {
	display: flex;
	flex-wrap: wrap;
	gap: 17px;
}

footer>* {
	flex: 1;
}
</style>