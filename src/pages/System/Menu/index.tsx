import type { FormInstance, FormRules } from 'element-plus'
import { fetchMenuList, fetchCreateMenu, fetchUpdateMenu } from '@/api/services'

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

const searchConfig: ISearchConfig[] = [
	{ type: 'input', label: '名称', model: 'title', placeholder: '请输入名称' },
	{ type: 'input', label: '路径', model: 'route_path', placeholder: '请输入路径' },
	{ type: 'input', label: '名称', model: 'route_name', placeholder: '请输入名称' },
	{ type: 'input', label: '重定向', model: 'redirect', placeholder: '请输入重定向' },
	{
		type: 'input',
		label: '页面文件路径',
		model: 'page_file_path',
		placeholder: '请输入页面文件路径',
	},
]

export default defineComponent(() => {
	const { list } = useTable<IMenuItem>(fetchMenuList, {}, false)

	return () => (
		<div>
			<searchForm config={searchConfig} class="mb-4" />

			<pagingTable
				loading={false}
				hasSelection={false}
				tableData={list.value}
				columns={columns}
			/>
		</div>
	)
}, {})
