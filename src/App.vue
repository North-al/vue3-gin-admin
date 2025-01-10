<script setup lang="ts"></script>

<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Transition mode="out-in">
				<KeepAlive>
					<Suspense>
						<!-- 主要内容 -->
						<component :is="Component"></component>

						<!-- 加载中状态 -->
						<template #fallback>
							<loading></loading>
						</template>
					</Suspense>
				</KeepAlive>
			</Transition>
		</template>
	</RouterView>
</template>

<style scoped></style>
