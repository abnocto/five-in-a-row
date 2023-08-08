<script setup lang='ts'>
import {onMounted} from 'vue';
import {useLoadingBar} from 'naive-ui';
import GameField from '../game/GameField.vue';
import PlayerInfo from '../game/PlayerInfo.vue';
import GameResult from '../game/GameResult.vue';
import type {GameInfo, PointInfo} from '../../common/types/structures';

type Props = {
	game: GameInfo;
};

defineProps<Props>();

const chooseCellHandler = (pointInfo: PointInfo) => {
	api.fillCell({
		pointInfo
	});
};

onMounted(() => {
	const loadingBar = useLoadingBar();
	loadingBar.finish();
});
</script>

<template>
	<div class='step-game'>
		<div class='step-game-area'>
			<div class='step-game-area-player'>
				<PlayerInfo
					:player='game.player'
					:active='game.isPlayerTurn && !game.result'
				/>
			</div>
			<div class='step-game-area-field'>
				<GameField
					:field='game.field'
					:my-color='game.player.color'
					:active='game.isPlayerTurn && !game.result'
					@choose-cell='chooseCellHandler'
				/>
			</div>
			<PlayerInfo
				:player='game.opponent'
				:active='!game.isPlayerTurn && !game.result'
			/>
		</div>
		<GameResult :result='game.result' />
	</div>
</template>

<style>
.step-game-area {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 40px;
}

.step-game-area-player,
.step-game-area-field {
	margin-right: 40px;
}
</style>
