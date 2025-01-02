// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	transformerAttributifyJsx,
	transformerCompileClass,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss'

export default defineConfig({
	shortcuts: {
		'flex-center': 'flex items-center justify-center',
		'flex-end': 'flex items-center justify-end',
		'flex-around': 'flex items-center justify-around',
		'flex-between': 'flex items-center justify-between',
		'btn-primary':
			'w-full !h-12 text-lg !bg-gradient-to-r from-blue-500 to-indigo-600 border-none hover:shadow-xl hover:opacity-90 transition-all duration-300',
	},
	theme: {
		colors: {
			// ...
		},
	},
	presets: [
		presetUno(), // 此预设尝试提供流行的实用程序优先框架的通用超集，包括 Tailwind CSS、Windi CSS、Bootstrap、Tachyons 等。
		presetAttributify(), // 这将为其他预设启用属性模式
		presetTypography(),
		presetIcons({
			extraProperties: {
				display: 'inline-block',
				'vertical-align': 'middle',
			},
			prefix: '',
		}),

		// presetWebFonts({
		// 	fonts: {
		// 		// ...
		// 	},
		// }),
	],
	transformers: [
		/**
		 * usage
		 * <div class="hover:(bg-gray-400 font-medium) font-(light mono)"/>
		 * to:
		 * <div class="hover:bg-gray-400 hover:font-medium font-light font-mono"/>
		 * */
		transformerVariantGroup(), // 为 UnoCSS 启用 Windi CSS 的变体组功能。

		/**
		 * @apply 、 @screen和theme()指令的 UnoCSS 转换器
		 *
		 * */
		transformerDirectives(),
		/**
		 * 将一组类编译为一个类
		 * 在类字符串的开头添加:uno:将其标记为要编译。
		 * <div class=":uno: text-center sm:text-left">
		 * <div class="uno-qlmcrp">
		 * */
		transformerCompileClass(),
		transformerAttributifyJsx(),
	],
})
