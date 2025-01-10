import { fetchMenuList } from '@/api/services'

const searchConfig: ISearchConfig[] = [
	{ type: 'input', label: '名称', model: 'title', placeholder: '请输入名称' },
	{ type: 'input', label: '路径', model: 'route_path', placeholder: '请输入路径' },
	{ type: 'input', label: '名称', model: 'route_name', placeholder: '请输入名称' },
	{
		type: 'input',
		label: '重定向',
		model: 'redirect',
		placeholder: '请输入重定向',
	},
	{
		type: 'input',
		label: '页面文件路径',
		model: 'page_file_path',
		placeholder: '请输入页面文件路径',
	},
]

const columns = [
	{
		title: '菜单标题（title）',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: '菜单路径',
		dataIndex: 'route_path',
		key: 'route_path',
	},
	{
		title: '菜单名称（name）',
		dataIndex: 'route_name',
		key: 'route_name',
	},
	{
		title: '重定向',
		dataIndex: 'redirect',
		key: 'redirect',
	},
	{
		title: '页面文件路径',
		dataIndex: 'page_file_path',
		key: 'page_file_path',
	},
	{
		title: '图标',
		dataIndex: 'icon',
		key: 'icon',
	},
	{
		title: '是否隐藏',
		dataIndex: 'hidden',
		key: 'hidden',
	},
	{
		title: '是否缓存',
		dataIndex: 'keep_alive',
		key: 'keep_alive',
		customRender: ({ record }: { record: IMenuItem }) => (
			<a-tag type={record.keep_alive ? 'success' : 'danger'}>
				{record.keep_alive ? '是' : '否'}
			</a-tag>
		),
	},
	{
		title: '排序',
		dataIndex: 'sort',
		key: 'sort',
	},
	{
		title: '创建时间',
		dataIndex: 'created_at',
		key: 'created_at',
	},
]

export default defineComponent(() => {
	const { list } = useTable<IMenuItem>(fetchMenuList, {}, false)
	const handleSubmit = (query: Record<string, any>) => {
		console.log(query)
	}

	return () => (
		<>
			<a-table dataSource={list.value} columns={columns} />
		</>
	)
}, {})
