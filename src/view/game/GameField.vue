<script setup lang='ts'>
import GameCell from './GameCell.vue';
import type {FieldInfo, PointInfo, PlayerInfo} from '../../common/types/structures';

type Props = {
	field: FieldInfo;
	player: PlayerInfo;
	active: boolean;
};

type Emits = {
	(emit: 'chooseCell', pointInfo: PointInfo): void
};

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleChooseCell = (pointInfo: PointInfo) => {
	emit('chooseCell', pointInfo);
};
</script>

<template>
	<div
		v-for='(cellRow, cellRowIndex) in field.cellsMap'
		:key='cellRowIndex'
		class='game-field-cell-row'
	>
		<GameCell
			v-for='(cell, cellIndex) in cellRow'
			:key='cellIndex'
			:cell='cell'
			:player='player'
			:active='active'
			:is-last-filled-cell='field.lastFilledCell?.point.x === cell.point.x
				&& field.lastFilledCell.point.y === cell.point.y'
			@choose='handleChooseCell'
		/>
	</div>
</template>

<style>
.game-field-cell-row {
	display: flex;
}
</style>
