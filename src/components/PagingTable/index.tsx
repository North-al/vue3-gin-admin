import { defineComponent, type PropType } from 'vue'
import type { JSX } from 'vue/jsx-runtime'

interface Column {
	prop: string
	label: string
	width?: string | number
	slot?: string | ((props: { row: any }) => JSX.Element)
}

interface Pagination {
	currentPage: number
	pageSize: number
	total: number
}

export default defineComponent({
	name: 'PaginatedTable',
	props: {
		tableData: {
			type: Array as PropType<any[]>,
			required: true,
		},
		columns: {
			type: Array as PropType<Column[]>,
			required: true,
		},
		pagination: {
			type: Object as PropType<Pagination>,
			required: true,
		},
	},
	emits: ['update:pagination'],
	setup(props, { emit, slots }) {
		watch(props.pagination, (newPagination) => {
			emit('update:pagination', newPagination)
		})

		return () => (
			<div>
				{/* 表格组件 */}
				<el-table data={props.tableData} border>
					{props.columns.map((column) => (
						<el-table-column
							key={column.prop}
							prop={column.prop}
							label={column.label}
							width={column.width}
							v-slots={{
								default:
									column.slot && typeof column.slot === 'function'
										? column.slot
										: slots[column.slot || column.prop],
							}}
						/>
					))}
				</el-table>

				{/* 分页组件 */}
				<el-pagination
					v-model:currentPage={props.pagination.currentPage}
					v-model:pageSize={props.pagination.pageSize}
					total={props.pagination.total}
					layout="total, prev, pager, next, sizes, jumper"
				/>
			</div>
		)
	},
})
