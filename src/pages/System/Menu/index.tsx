import { fetchMenuList, fetchCreateMenu } from '@/api/services'
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
			width: 200,
		},
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: '菜单路径',
			dataIndex: 'route_path',
			width: 100,
		},
		{
			title: '菜单名称(name)',
			dataIndex: 'route_name',
			width: 140,
		},
		{
			title: '重定向',
			dataIndex: 'redirect',
			width: 100,
		},
		{
			title: '页面文件路径',
			dataIndex: 'page_file_path',
			width: 150,
		},
		{
			title: '图标',
			dataIndex: 'icon',
			width: 100,
		},
		{
			title: '是否隐藏',
			dataIndex: 'hidden',
			width: 120,
		},
		{
			title: '是否缓存',
			dataIndex: 'keep_alive',
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
			width: 100,
		},
		{
			title: '创建时间',
			dataIndex: 'created_at',
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
	const { list, handleRefresh } = useTable<IMenuItem>(
		fetchMenuList,
		{},
		false,
		(data: IMenuItem[]) => {
			// 转换成tree

			type Menu = IMenuItem & { children?: IMenuItem[] }
			const buildTree = (items: Menu[], pid: number) => {
				const result: Array<Menu> = []
				for (const item of items) {
					// 说明他是父节点
					if (item.parent_id === pid) {
						// 查询它的子节点
						const children = buildTree(items, item.id!)
						if (children.length) {
							item.children = children
						}
						result.push(item)
					}
				}

				return result
			}

			return buildTree(data, 0)
		},
	)

	const handleSubmit = (query: Record<string, any>) => {
		console.log(query)
		console.log(list.value)
	}

	const handleAdd = (record: IMenuItem) => {
		Modal.confirm({
			title: '新增菜单',
			maskClosable: true,
			centered: true,
			width: 820,
			content: () => <MenuDialog record={record} parentList={list.value} />,
			onOk: () => {
				console.log(record)
				fetchCreateMenu({ ...record, parent_id: record.parent_id || 3 }).then(() => {
					AMessage.success('新增成功')
					handleRefresh()
				})
			},
		})
	}

	return () => (
		<>
			<a-card class="mb-1">
				<searchForm config={searchConfig} onSubmit={handleSubmit} onReset={() => {}} />
			</a-card>
			<a-card title="菜单列表">
				{{
					extra: () => (
						<a-button type="primary" onClick={() => handleAdd({} as IMenuItem)}>
							新增根菜单
						</a-button>
					),
					default: () => (
						<a-table
							class="components-table-demo-nested"
							dataSource={list.value}
							columns={columns}
						/>
					),
				}}
			</a-card>
		</>
	)
}, {})
