<template>
	<div class="app-main">
		<div :style="{ height: `calc(100vh - ${104}px); overflow: auto` }">
			<router-view />
		</div>
	</div>
</template>

<style scoped lang="scss">
.app-main {
	border-radius: 4px;
	height: 100%;
	box-sizing: border-box;
}
</style>
