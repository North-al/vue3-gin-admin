import type { JSX } from 'vue/jsx-runtime'

declare global {
	interface TableColumn {
		prop: string
		label: string
		width?: string | number
		slot?: string | ((props: { row: any }) => JSX.Element)
		minWidth?: string | number
	}

	interface Pagination {
		page: number
		limit: number
	}

	interface ISearchConfig {
		type: 'input' | 'select' | 'date' | 'date-range' | 'cascader'
		label: string
		model: string
		defaultValue?: any
		placeholder?: string
		options?: { label: string; value: string }[]
		props?: Record<string, any>
	}
}

export {}
