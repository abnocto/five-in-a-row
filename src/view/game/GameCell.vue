<script setup lang='ts'>
import {computed} from 'vue';
import type {CellInfo, PointInfo, PlayerInfo} from '../../common/types/structures';

type Props = {
	cell: CellInfo;
	player: PlayerInfo;
	active: boolean;
	isLastFilledCell: boolean;
};

type Emits = {
	(emit: 'choose', pointInfo: PointInfo): void
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isClickable = computed(() => props.active && !props.cell.color);
const cellColor = computed(() => props.cell.color || '#ffffff');

const handleClick = () => {
	if (!isClickable.value) {
		return;
	}

	emit('choose', {
		x: props.cell.point.x,
		y: props.cell.point.y
	});
};
</script>

<template>
	<div
		class='game-cell'
		@click='handleClick'
	>
		{{ isLastFilledCell ? '*' : '' }}
	</div>
</template>

<style>
.game-cell {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	border: 1px solid #aaaaaa;
	cursor: v-bind('isClickable ? "pointer" : "not-allowed"');
	background-color: v-bind('cellColor');
}

.game-cell:hover {
	background-color: v-bind('isClickable ? player.color : cellColor');
	opacity: v-bind('isClickable ? "0.5" : "1"');
}
</style>
