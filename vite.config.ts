import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
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
			dirs: ['src/stores', 'src/hooks'],
			vueTemplate: true,
			resolvers: [ElementPlusResolver(), IconsResolver()],
		}),
		// 自动导入组件
		Components({
			// 指定组件位置
			dirs: ['src/components'],
			// 组件的有效文件扩展名
			extensions: ['vue', 'tsx'],
			// 配置文件生成位置
			include: [/\.vue$/, /\.tsx$/],
			dts: 'src/types/components.d.ts',
			resolvers: [ElementPlusResolver()],
		}),
		Icons({
			compiler: 'vue3',
			defaultClass: 'inline',
			defaultStyle: 'vertical-align: sub;',
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
