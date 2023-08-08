<script setup lang='ts'>
import {onMounted} from 'vue';
import {NSpace, NH1, NH2, NText, useLoadingBar} from 'naive-ui';

type Props = {
	ip: string;
};

defineProps<Props>();

onMounted(() => {
	const loadingBar = useLoadingBar();
	loadingBar.start();
});
</script>

<template>
	<NSpace vertical>
		<NH1>
			<NText type='info'>
				Ждем создания игры...
			</NText>
		</NH1>
		<NH2>
			<NText type='info'>
				Адрес для подключения: {{ ip }}
			</NText>
		</NH2>
	</NSpace>
</template>
