<script setup lang="ts">
import Logo from './Logo.tsx'

const activeMenu = ref('1')
</script>

<template>
	<div class="sidebar">
		<Logo :collapse="false" />
		<a-menu :default-active="activeMenu" :collapse="false">
			<!-- 菜单项 -->
		</a-menu>
	</div>
</template>

<style scoped lang="scss"></style>
