import type { FormInstance, FormRules } from 'element-plus'
import { fetchMenuList, fetchCreateMenu, fetchUpdateMenu } from '@/api/services'
import type { SetupContext } from 'vue'
import PagingTable from '@/components/PagingTable'

// 模拟菜单数据

// interface IMenuItem {
// 	id?: number
// 	parent_id: number | null
// 	title: string
// 	route_path: string
// 	route_name: string
// 	redirect: string
// 	page_file_path: string
// 	icon: string
// 	hidden: boolean
// 	keep_alive: boolean
// 	sort: number
// 	created_at?: string
// 	updated_at?: string
// }

const columns: TableColumn[] = [
	{ prop: 'id', label: 'ID' },
	{ prop: 'title', label: '名称' },
	{ prop: 'route_path', label: '路径' },
	{ prop: 'route_name', label: '名称' },
	{ prop: 'redirect', label: '重定向' },
	{ prop: 'page_file_path', label: '页面文件路径' },
	{ prop: 'icon', label: '图标' },
	{ prop: 'hidden', label: '是否隐藏' },
	{
		prop: 'keep_alive',
		label: '是否缓存',
		slot: ({ row }) => (
			<el-tag type={row.keep_alive ? 'success' : 'danger'}>
				{row.keep_alive ? '是' : '否'}
			</el-tag>
		),
	},
	{ prop: 'sort', label: '排序' },
	{ prop: 'created_at', label: '创建时间' },
	{ prop: 'updated_at', label: '更新时间' },
]

export default defineComponent(() => {
	const { list } = useTable<IMenuItem>(fetchMenuList, {}, false)

	return () => (
		<div>
			<PagingTable
				loading={false}
				hasSelection={false}
				tableData={list.value}
				columns={columns}
			/>
		</div>
	)
}, {})
