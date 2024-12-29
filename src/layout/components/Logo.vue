<script setup lang="ts">
import { computed } from 'vue'

// 定义props
defineProps({
	collapse: {
		type: Boolean,
		default: false,
	},
})

// 计算logo图片的路径
const logoUrl = computed(() => {
	return new URL('../../assets/logo.png', import.meta.url).href
})
</script>

<template>
	<div class="sidebar-logo-container">
		<router-link to="/" class="sidebar-logo-link">
			<img :src="logoUrl" class="sidebar-logo" alt="logo" />
			<h1 v-show="!collapse" class="sidebar-title">North Admin</h1>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
	position: relative;
	width: 100%;
	height: 50px;
	line-height: 50px;
	text-align: center;
	overflow: hidden;
	border-right: 1px solid #f2f2f2;
	background: #fff;
	box-shadow: 0px 2px 2px 0px rgba(90, 90, 90, 0.05);

	.sidebar-logo-link {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		text-decoration: none;

		.sidebar-logo {
			width: 32px;
			height: 32px;
			vertical-align: middle;
			margin-right: 12px;
		}

		.sidebar-title {
			display: inline-block;
			margin: 0;
			color: #001529;
			font-weight: 600;
			font-size: 14px;
			font-family:
				Avenir,
				Helvetica Neue,
				Arial,
				Helvetica,
				sans-serif;
			vertical-align: middle;
		}
	}
}
</style>
