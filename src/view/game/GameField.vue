<script setup lang='ts'>
import GameCell from './GameCell.vue';
import type {FieldInfo, PointInfo} from '../../common/types/structures';

type Props = {
	field: FieldInfo;
	myColor: string;
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
			:my-color='myColor'
			:active='active'
			@choose='handleChooseCell'
		/>
	</div>
</template>

<style>
.game-field-cell-row {
	display: flex;
}
</style>
