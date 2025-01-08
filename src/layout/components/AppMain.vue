<template>
	<div class="app-main">
		<el-scrollbar :height="`calc(100vh - ${104}px)`">
			<router-view />
		</el-scrollbar>
	</div>
</template>

<style scoped lang="scss">
.app-main {
	border-radius: 4px;
	height: 100%;
	box-sizing: border-box;
}
</style>
