import { defineComponent, type PropType } from 'vue'

interface Pagination {
	currentPage: number
	pageSize: number
	total: number
}

const headerRowStyle = {
	backgroundColor: '#F5F6FA',
	fontWeight: '500',
	color: '#787878',
}

export default defineComponent({
	name: 'PaginatedTable',
	props: {
		tableData: {
			type: Array as PropType<any[]>,
			required: true,
		},
		columns: {
			type: Array as PropType<TableColumn[]>,
			required: true,
		},
		pagination: {
			type: Object as PropType<Pagination>,
			required: false,
		},
		loading: {
			type: Boolean,
			default: false,
		},
		hasSelection: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['update:pagination'],
	setup(props, { emit, slots }) {
		watch(
			() => props.pagination,
			(newPagination) => {
				emit('update:pagination', newPagination)
			},
		)

		return () => (
			<div>
				{/* 表格组件 */}
				<el-table
					v-loading={props.loading}
					class="paging-table"
					header-row-style={headerRowStyle}
					data={props.tableData}
				>
					{props.hasSelection && <el-table-column type="selection" width="55" />}
					{props.columns.map((column) => (
						<el-table-column
							key={column.prop}
							prop={column.prop}
							label={column.label}
							width={column.width}
							minWidth={column.minWidth}
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
				{props.pagination && (
					<el-pagination
						v-model:currentPage={props.pagination.currentPage}
						v-model:pageSize={props.pagination.pageSize}
						total={props.pagination.total}
						layout="total, prev, pager, next, sizes, jumper"
					/>
				)}
			</div>
		)
	},
})
