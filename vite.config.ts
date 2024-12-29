import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		UnoCSS(),
		// vueDevTools(),
		AutoImport({
			imports: ['vue', 'vue-router', 'pinia'],
			dts: 'src/types/auto-imports.d.ts',
			dirs: ['src/stores'],
			vueTemplate: true,
			resolvers: [ElementPlusResolver()],
		}),
		// 自动导入组件
		Components({
			// 指定组件位置
			dirs: ['src/components'],
			// 组件的有效文件扩展名
			extensions: ['vue'],
			// 配置文件生成位置
			dts: 'src/types/components.d.ts',
			resolvers: [ElementPlusResolver()],
		}),
	],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
	server: {
		port: 5000,
		host: true,
	},
})
