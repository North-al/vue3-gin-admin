import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { ElementPlusResolver, AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
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
			imports: [
				'vue',
				'vue-router',
				'pinia',
				{
					'ant-design-vue': [
						['message', 'AMessage'],
						['Modal', 'Modal'],
					],
				},
			],
			dts: 'src/types/auto-imports.d.ts',
			dirs: ['src/stores', 'src/hooks'],
			vueTemplate: true,
			resolvers: [AntDesignVueResolver({}), IconsResolver()],
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
			resolvers: [
				AntDesignVueResolver({
					importStyle: false, // css in js
					// resolveIcons: true
				}),
				(componentName) => {
					if (componentName === 'Iconify') {
						return {
							name: 'Icon',
							from: '@iconify/vue',
						}
					}
				},
			],
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
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					'element-plus': ['element-plus'],
					vendor: ['vue', 'vue-router', 'pinia'],
				},
			},
		},
		// 启用 gzip 压缩
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
	server: {
		port: 5000,
		host: true,
	},
})
