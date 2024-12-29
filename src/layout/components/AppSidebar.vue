<script setup lang="ts">
import Logo from './Logo.vue'

const activeMenu = ref('1')
</script>

<template>
	<div class="sidebar">
		<Logo :collapse="false" />
		<el-menu :default-active="activeMenu" class="el-menu-vertical" :collapse="false">
			<!-- 菜单项 -->
		</el-menu>
	</div>
</template>

<style scoped lang="scss"></style>
