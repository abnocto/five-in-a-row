<script setup lang='ts'>
import {NH1, NText} from 'naive-ui';
import {GameResult} from '../../common/enums/game-result';

type Props = {
	result: GameResult | null
};

defineProps<Props>();
</script>

<template>
	<NH1
		v-if='result'
		class='game-result'
	>
		<NText
			v-if='result === GameResult.Victory'
			type='info'
		>
			Победа
		</NText>
		<NText
			v-if='result === GameResult.Draw'
			type='info'
		>
			Ничья
		</NText>
		<NText
			v-if='result === GameResult.Defeat'
			type='info'
		>
			Поражение
		</NText>
	</NH1>
</template>

<style>
.game-result {
	text-align: center;
}
</style>
