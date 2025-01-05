<template>
	<div class="app-main">
		<el-scrollbar>
			<router-view />
		</el-scrollbar>
	</div>
</template>

<style scoped lang="scss">
.app-main {
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.15);
	height: 100%;
	padding: 12px 12px 0 12px;
}
</style>
