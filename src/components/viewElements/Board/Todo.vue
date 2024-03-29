<template>
	<li class="todo" @click="() => { if (!todo.editing) todo.done = !todo.done }" @mouseenter="todo.mouseIn = true" @mouseleave="todo.mouseIn = false">
		<Checkbox v-model="todo.done" />
		<Input ref="input" :disabled="!todo.editing" @blur="blurTodo" @keypress.enter="enterKey" class="todoInput" v-model="todo.todo" placeholder="Descreva a tarefa" :style="`${todo.editing ? '' : 'box-shadow: none; background: transparent; cursor: pointer; pointer-events: none;'} width: 100%;`" />
		<div class="todoActions" v-if="todo.mouseIn && todo.canEdit">
			<Button class="flat actionButton" @click.stop="enterEditionMode" v-if="!todo.editing">
				<Icon class="edit" :size="1.25" />
			</Button>
			<Button class="flat actionButton" @click.stop="removeTodo" style="color: var(--danger-light);">
				<Icon class="trash-2" :size="1.25" />
			</Button>
		</div>
	</li>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Input, Checkbox, Button, Icon } from 'RazionComponents'

const props = defineProps({ todo: Object })
const input = ref()
const emit = defineEmits(['removeTodo', 'newTodo', 'editTodo'])

watch(() => props.todo.done, () => {
	emit('editTodo', props.todo)
})

function enterEditionMode() {
	props.todo.editing = true
	setTimeout(() => {
		input.value.$el.focus()
	}, 0)
}

function blurTodo() {
	if (!props.todo.todo?.trim())
		return false
	props.todo.editing = false
	emit('editTodo', props.todo)
}

function removeTodo() {
	emit('removeTodo', props.todo)
}

function enterKey() {
	blurTodo()
	emit('newTodo')
}

</script>

<style scoped>
li {
	display: flex;
	align-items: center;
	gap: 7px;
	border-radius: .3rem;
	padding: 0;
	cursor: pointer;
}

li>* {
	margin: 0;
}

li.todo {
	padding: 3px 7px;
}

li.todo:hover {
	background-color: var(--dark-bg2);
	box-shadow: var(--dark-box-shadow);
}

.light-theme li.todo:hover {
	background-color: var(--light-bg2);
	box-shadow: var(--light-box-shadow);
}

.todoActions {
	display: flex;
	align-items: center;
	gap: 3px;
}

button.actionButton {
	padding: 1px;
	color: var(--dark-font1);
	/* width: 32px;
	height: 32px; */
	display: grid;
	place-items: center;
}

.light-theme button.actionButton {
	color: var(--light-font2);
}
</style>