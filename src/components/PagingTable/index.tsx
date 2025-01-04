import type { SetupContext } from 'vue'
import Pagination from '../Pagination'

const headerRowStyle = {
	backgroundColor: '#F5F6FA',
	fontWeight: '500',
	color: '#787878',
}

type BaseProps<T> = {
	loading: boolean
	hasSelection: boolean
	tableData: T[]
	columns: TableColumn[]
}

type PagingTableProps<T> =
	| (BaseProps<T> & { hasPagination: false })
	| (BaseProps<T> & { hasPagination: true; pagination: Pagination; total: number })

interface IEmits {
	update: (pagination: Pagination) => void
}

export default defineComponent(
	<T extends Record<string, any>>(
		props: PagingTableProps<T>,
		{ emit, slots }: SetupContext<IEmits>,
	) => {
		const handlePaginationChange = (pagination: Pagination) => {
			emit('update', pagination)
		}
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
					{props.columns.map((column) => {
						const slot =
							column.slot && typeof column.slot === 'function'
								? column.slot
								: slots[column.slot || column.prop]

						const { prop, ...rest } = column

						return (
							<el-table-column
								key={prop}
								{...rest}
								v-slots={{
									default: slot,
								}}
							/>
						)
					})}
				</el-table>

				{/* 分页组件 */}
				{props.hasPagination && (
					<Pagination
						pagination={props.pagination!}
						total={props.total!}
						onUpdate={handlePaginationChange}
					/>
				)}
			</div>
		)
	},
	{
		props: {
			loading: {
				type: Boolean,
				default: false,
			},
			hasSelection: {
				type: Boolean,
				default: false,
			},
			tableData: {
				type: Array as PropType<any[]>,
				required: true,
			},
			columns: {
				type: Array as PropType<TableColumn[]>,
				required: true,
			},
			// 是否显示分页组件
			hasPagination: {
				type: Boolean,
				default: false,
			},
			// 分页组件配置
			pagination: {
				type: Object as PropType<Pagination>,
				required: false,
				default: () => ({
					page: 1,
					limit: 10,
				}),
			},
			total: {
				type: Number,
				required: false,
				default: 0,
			},
		},
	},
)
