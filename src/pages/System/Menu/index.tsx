import { fetchMenuList } from '@/api/services'
import MenuDialog from './components/menu-dialog'
const searchConfig: ISearchConfig[] = [
	{ type: 'input', label: '菜单标题', model: 'title' },
	{ type: 'input', label: '路径', model: 'route_path', placeholder: '请输入路径' },
	{ type: 'input', label: '名称', model: 'route_name', placeholder: '请输入名称' },
	{
		type: 'input',
		label: '重定向',
		model: 'redirect',
		placeholder: '请输入重定向',
		defaultValue: '/',
	},
	{
		type: 'input',
		label: '页面文件路径',
		model: 'page_file_path',
		placeholder: '请输入页面文件路径',
	},
]

export default defineComponent(() => {
	const columns = [
		{
			title: '菜单标题(title)',
			dataIndex: 'title',
			key: 'title',
			width: 130,
			fixed: 'left',
		},
		{
			title: '菜单路径',
			dataIndex: 'route_path',
			key: 'route_path',
			width: 100,
		},
		{
			title: '菜单名称(name)',
			dataIndex: 'route_name',
			key: 'route_name',
			width: 140,
		},
		{
			title: '重定向',
			dataIndex: 'redirect',
			key: 'redirect',
			width: 100,
		},
		{
			title: '页面文件路径',
			dataIndex: 'page_file_path',
			key: 'page_file_path',
			width: 150,
		},
		{
			title: '图标',
			dataIndex: 'icon',
			key: 'icon',
			width: 100,
		},
		{
			title: '是否隐藏',
			dataIndex: 'hidden',
			key: 'hidden',
			width: 120,
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
			width: 100,
		},
		{
			title: '排序',
			dataIndex: 'sort',
			key: 'sort',
			width: 100,
		},
		{
			title: '创建时间',
			dataIndex: 'created_at',
			key: 'created_at',
			width: 150,
		},
		{
			title: '操作',
			key: 'action',
			width: 140,
			fixed: 'right',
			customRender: ({ record }: { record: IMenuItem }) => (
				<a-space>
					<a-button type="link" size="small" onClick={() => handleAdd(record)}>
						新增
					</a-button>
					<a-button type="link" size="small">
						编辑
					</a-button>
					<a-button type="link" size="small" danger>
						删除
					</a-button>
				</a-space>
			),
		},
	]
	const { list } = useTable<IMenuItem>(fetchMenuList, {}, false)
	const handleSubmit = (query: Record<string, any>) => {
		console.log(query)
	}

	const handleAdd = (record: IMenuItem) => {
		Modal.confirm({
			title: '新增菜单',
			maskClosable: true,
			width: 820,
			content: () => <MenuDialog record={record} />,
			onOk: () => {
				console.log(record.title)
			},
		})
	}

	return () => (
		<>
			<a-card class="mb-1">
				<searchForm config={searchConfig} onSubmit={handleSubmit} onReset={() => {}} />
			</a-card>
			<a-card>
				<a-table dataSource={list.value} columns={columns} />
			</a-card>
		</>
	)
}, {})
