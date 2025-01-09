<template>
	<div :class="authStyles.container()">
		<RippleBackground />
		<WaveBackground />

		<div :class="authStyles.card()">
			<!-- Brand logo circle -->
			<div :class="authStyles.brandIcon()" class="-top-12">
				<div :class="authStyles.brandIcon({ inner: true })">
					<iconify class="text-4xl text-white" :icon="icon" />
				</div>
			</div>

			<h2 :class="authStyles.title()">
				{{ title }}
			</h2>
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'
import WaveBackground from './WaveBackground.vue'
import RippleBackground from './RippleBackground.vue'

defineProps<{
	title: string
	icon: string
}>()

const authStyles = {
	container: tv({
		base: 'min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50',
	}),

	card: tv({
		base: 'bg-white/90 backdrop-blur-sm p-12 rounded-xl shadow-2xl w-[480px] relative z-10',
	}),

	brandIcon: tv({
		base: 'absolute  left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg',
		variants: {
			inner: {
				true: 'bg-white/20 w-20 h-20 rounded-full flex items-center justify-center',
			},
		},
	}),

	title: tv({
		base: 'text-3xl font-bold text-center mb-10 mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent',
	}),
}
</script>
