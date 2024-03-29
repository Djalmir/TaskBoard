<template>
	<Modal ref="modal" @close="close" @keypress.enter="() => editing ? updateList() : createList()">

		<template v-slot:header>
			<b>{{ editing ? 'Renomear' : 'Nova' }} Lista</b>
		</template>

		<Input class="input" label="Nome" v-model="name" autocomplete="getoff" @focus="message.closeByField('name')" />

		<template v-slot:footer>
			<Button class="secondary" @click="close">Cancelar</Button>
			<Button v-if="editing" type="submit" @click="updateList">Atualizar</Button>
			<Button v-else type="submit" @click="createList">Criar</Button>
		</template>
	</Modal>
</template>

<script setup>

import { ref, inject } from 'vue'
import { useRoute } from 'vue-router'
import { Modal, Input, Button } from 'RazionComponents'
import taskboardApi from '@/services/taskboardApi'

const modal = ref()
const route = useRoute()
const message = inject('Message').value

const boardId = route.params.boardId
const listId = ref('')
const name = ref('')
const editing = ref(false)

const emit = defineEmits(['listCreated', 'listRenamed'])

function show(list) {
	if (list) {
		const { _id, name: listName } = JSON.parse(JSON.stringify(list))
		listId.value = _id
		name.value = listName
		editing.value = true
	}
	else
		editing.value = false
	modal.value.show()
}

function createList() {
	taskboardApi.createList({
		boardId,
		name: name.value
	})
		.then((res) => {
			emit('listCreated', res.data)
			close()
		})
}

function updateList() {
	taskboardApi.updateList({
		listId: listId.value,
		name: name.value
	})
		.then((res) => {
			emit('listRenamed', res.data)
			close()
		})
}

function close() {
	listId.value = ''
	name.value = ''

	modal.value.close()
}

defineExpose({ show })

</script>

<style scoped>
b {
	font-size: 1.2rem;
	font-weight: bold;
}

.input {
	width: 100%;
}
</style>