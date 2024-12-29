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
			<AppMain />
		</div>
	</div>
</template>

<style scoped lang="scss">
.app-wrapper {
	display: flex;
	width: 100%;
	height: 100vh;

	.sidebar-container {
		width: 210px;
		height: 100%;
		background: #fff;
		box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
	}

	.main-container {
		flex: 1;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
}
</style>
