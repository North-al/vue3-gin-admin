import type { SetupContext } from 'vue'
import Pagination from '../Pagination'

const headerRowStyle = {
	backgroundColor: '#F5F6FA',
	fontWeight: '500',
	color: '#787878',
}

type PagingTableProps<T> = {
	loading: boolean
	hasSelection: boolean
	tableData: T[]
	columns: TableColumn[]
	total?: number
	pagination?: Pagination | undefined | null
}
interface IEmits {
	update: (pagination: Pagination) => void
}

export default defineComponent({
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
		// 分页组件配置
		pagination: {
			type: Object as PropType<Pagination | undefined | null>,
			required: false,
		},
		total: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	setup(props, { emit, slots }) {
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
				{props.pagination && (
					<Pagination
						pagination={props.pagination}
						total={props.total || 0}
						onUpdate={handlePaginationChange}
					/>
				)}
			</div>
		)
	},
})
