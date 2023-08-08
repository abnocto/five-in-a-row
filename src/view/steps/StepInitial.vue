<script setup lang='ts'>
import {onMounted, ref} from 'vue';
import type {Ref} from 'vue';
import {NH1, NText, NInput, NButton} from 'naive-ui';

const hostname: Ref<string> = ref('');
const input: Ref<HTMLInputElement | null> = ref(null);

const createGameHandler = () => {
	api.createGame({
		hostname: hostname.value
	});
};

const waitForGameCreationHandler = () => {
	api.waitForGameCreation();
};

onMounted(() => {
	input.value?.focus();
});
</script>

<template>
	<div class='step-initial'>
		<NH1>
			<NText type='info'>
				Новая игра
			</NText>
		</NH1>
		<div class='step-initial-create'>
			<NInput
				ref='input'
				v-model:value.trim='hostname'
				class='step-initial-create-input'
				type='text'
				placeholder='Имя хоста (192.168.0.1)'
			/>
			<NButton
				type='primary'
				:disabled='!hostname'
				@click='createGameHandler'
			>
				Создать игру
			</NButton>
		</div>
		<NButton
			type='info'
			@click='waitForGameCreationHandler'
		>
			Ждать создания игры
		</NButton>
	</div>
</template>

<style>
.step-initial {
	display: flex;
	flex-direction: column;
}

.step-initial-create {
	display: flex;
	margin-bottom: 20px;
}

.step-initial-create-input {
	margin-right: 20px;
}
</style>
