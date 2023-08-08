<script setup lang='ts'>
import type {Ref} from 'vue';
import {onMounted, ref} from 'vue';
import {NLoadingBarProvider} from 'naive-ui';
import {Status} from '../common/enums/status';
import StepInitial from './steps/StepInitial.vue';
import StepWaitingForPlayer from './steps/StepWaitingForPlayer.vue';
import StepGame from './steps/StepGame.vue';
import type {State} from '../common/types/state';

const state: Ref<State> = ref({status: Status.Initial});

onMounted(() => {
	api.addStateUpdateListener((updatedState: State) => {
		state.value = updatedState;
	});
});
</script>

<template>
	<NLoadingBarProvider>
		<div class='app'>
			<StepInitial
				v-if='state.status === Status.Initial'
			/>
			<StepWaitingForPlayer
				v-if='state.status === Status.WaitingForPlayer'
				:ip='state.ip'
			/>
			<StepGame
				v-if='state.status === Status.GameInProgress || state.status === Status.Finished'
				:game='state.game'
			/>
		</div>
	</NLoadingBarProvider>
</template>

<style>
body {
	margin: 0;
	box-sizing: border-box;
	background-color: #f0ffff;
}

.app {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100vh;
}
</style>
