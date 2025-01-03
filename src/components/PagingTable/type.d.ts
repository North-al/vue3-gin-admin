import type { JSX } from 'vue/jsx-runtime'

declare global {
	interface TableColumn {
		prop: string
		label: string
		width?: string | number
		slot?: string | ((props: { row: any }) => JSX.Element)
		minWidth?: string | number
	}
}

export {}
