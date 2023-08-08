<script setup lang='ts'>
import {ref, watchEffect} from 'vue';
import type {Ref} from 'vue';
import type {CellInfo, PointInfo} from '../../common/types/structures';

type Props = {
	cell: CellInfo;
	myColor: string;
	active: boolean;
};

type Emits = {
	(emit: 'choose', pointInfo: PointInfo): void
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isClickable: Ref<boolean> = ref(false);
const cellColor: Ref<string> = ref('');

watchEffect(() => {
	isClickable.value = props.active && !props.cell.color;
	cellColor.value = props.cell.color || '#ffffff';
});

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
	/>
</template>

<style>
.game-cell {
	width: 30px;
	height: 30px;
	border: 1px solid #aaaaaa;
	cursor: v-bind('isClickable ? "pointer" : "not-allowed"');
	background-color: v-bind('cellColor');
}

.game-cell:hover {
	background-color: v-bind('isClickable ? myColor : cellColor');
}
</style>
