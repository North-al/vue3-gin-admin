<script setup lang="tsx">
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
import AppMain from './components/AppMain.vue'
</script>

<template>
	<div class="app-wrapper">
		<AppSidebar class="sidebar-container" />
		<div class="main-container">
			<AppHeader />
			<div class="main-content">
				<AppMain />
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.app-wrapper {
	display: flex;
	width: 100%;
	height: 100vh;

	.sidebar-container {
		width: 220px;
		height: 100%;
		background: #fff;
		border-right: 1px solid #f2f2f2;
	}

	.main-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.main-content {
		flex: 1;
		padding: 10px;
		overflow: auto;
		background: #eceef1;
	}
}
</style>
