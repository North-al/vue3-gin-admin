<script setup lang="tsx">
// import AppHeader from './components/AppHeader.vue'
// import AppSidebar from './components/AppSidebar.vue'
import AppMain from './components/AppMain.vue'
// import AppFooter from './components/AppFooter.vue'

const AppHeader = defineAsyncComponent(() => import('./components/AppHeader.vue'))
const AppFooter = defineAsyncComponent(() => import('./components/AppFooter.vue'))
const AppSidebar = defineAsyncComponent(() => import('./components/AppSidebar.vue'))
</script>

<template>
	<div class="app-wrapper">
		<AppSidebar class="sidebar-container" />
		<div class="main-container">
			<AppHeader />
			<div class="main-content">
				<AppMain />
			</div>
			<AppFooter />
		</div>
	</div>
</template>

<style scoped lang="scss">
.app-wrapper {
	display: flex;
	width: 100%;
	height: 100vh;
	// 使用 transform 替代 position 动画
	transform: translate3d(0, 0, 0);
	will-change: transform; // 仅在动画元素上使用

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
		box-sizing: border-box;
		// 开启硬件加速
		transform: translateZ(0);
	}

	.main-content {
		flex: 1;
		padding: 8px;
		overflow: auto;
		// background: #eceef1;
	}
}
</style>
