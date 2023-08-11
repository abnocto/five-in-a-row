<script setup lang='ts'>
import {NAvatar, NH2, NText} from 'naive-ui';
import type {PlayerInfo} from '../../common/types/structures';

type Props = {
	player: PlayerInfo;
	active: boolean;
};

defineProps<Props>();
</script>

<template>
	<NAvatar
		class='player-info-avatar'
		round
		:size='100'
	>
		<NH2>
			<NText>
				{{ player.name }}
			</NText>
		</NH2>
	</NAvatar>
</template>

<style>
.player-info-avatar {
	background-color: v-bind('player.color');
	border: v-bind('active ? "3px solid #000000" : "none"');
	box-sizing: border-box;
}
</style>
