export default defineComponent(
	(props, { emit }) => {
		const model = computed({
			get: () => props.record,
			set: (value: IMenuItem) => {
				emit('update:record', value)
			},
		})

		const tree = [{ id: 0, title: '顶级菜单' }, ...props.parentList]

		const typeOptions = ['目录', '菜单', '按钮']
		const type = ref(typeOptions[0])

		const rules = {
			title: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
			parent_id: [{ required: true, message: '请选择父节点', trigger: 'blur' }],
			route_path: [{ required: true, message: '请输入路由路径', trigger: 'blur' }],
			page_file_path: [{ required: true, message: '请输入页面路径', trigger: 'blur' }],
		}

		// 通过import.meta.glob来获取所有页面【tsx,vue】
		const pages = import.meta.glob('@/pages/**/*.{tsx,vue}', { eager: true })
		const pageList = Object.keys(pages).map((key) => {
			return key.replace('/src', '@')
		})

		console.log(pageList)

		return () => (
			<>
				<a-form model={model} rules={rules} autoFocusFirstInput labelAlign="right">
					<a-form-item label="菜单类型" name="type">
						<a-segmented block v-model={[type.value, 'value']} options={typeOptions} />
					</a-form-item>

					<a-form-item label="父节点" name="parent_id">
						<a-tree-select
							v-model={[model.value.parent_id, 'value']}
							disabled={model.value.parent_id === 0}
							show-search
							style="width: 100%"
							dropdown-style={{ maxHeight: '400px', overflow: 'auto' }}
							placeholder="请选择父节点"
							allow-clear
							tree-data={tree}
							tree-node-filter-prop="label"
							field-names={{
								children: 'children',
								label: 'title',
								value: 'id',
							}}
						></a-tree-select>
					</a-form-item>

					<a-row gutter={16}>
						<a-col span={12}>
							<a-form-item label="菜单标题" name="title" required>
								<a-input
									v-model={[model.value.title, 'value']}
									placeholder="请输入菜单标题"
									prefix={<iconify icon="ant-design:menu-outlined" />}
								/>
							</a-form-item>
						</a-col>
						<a-col span={12}>
							<a-form-item label="菜单路径" name="route_path">
								<a-input
									v-model={[model.value.route_path, 'value']}
									placeholder="请输入菜单路径"
									prefix={<iconify icon="ant-design:folder-outlined" />}
								/>
							</a-form-item>
						</a-col>
					</a-row>

					<a-row gutter={16}>
						<a-col span={12}>
							<a-form-item label="路由名称" name="route_name">
								<a-input
									v-model={[model.value.route_name, 'value']}
									placeholder="请输入路由名称"
									prefix={<iconify icon="ant-design:link-outlined" />}
								/>
							</a-form-item>
						</a-col>
						<a-col span={12}>
							<a-form-item label="页面路径" name="page_file_path">
								<a-select
									v-model={[model.value.page_file_path, 'value']}
									placeholder="请选择页面路径"
								>
									{pageList.map((item) => (
										<a-select-option value={item}>{item}</a-select-option>
									))}
								</a-select>
							</a-form-item>
						</a-col>
					</a-row>

					<a-form-item label="重定向" name="redirect">
						<a-input
							v-model={[model.value.redirect, 'value']}
							placeholder="请输入重定向路径"
							prefix={<iconify icon="ant-design:enter-outlined" />}
						/>
					</a-form-item>

					<a-form-item label="菜单图标" name="icon">
						<a-input
							v-model={[model.value.icon, 'value']}
							placeholder="请输入图标名称"
							prefix={<iconify icon="ant-design:appstore-outlined" />}
						>
							{{
								suffix: () => (
									<iconify
										icon={model.value.icon || 'ant-design:question-outlined'}
										class="text-lg"
									/>
								),
							}}
						</a-input>
					</a-form-item>

					<a-row gutter={16}>
						<a-col span={12}>
							<a-form-item label="是否隐藏" name="hidden">
								<a-switch
									v-model={[model.value.hidden, 'checked']}
									checked-children="是"
									un-checked-children="否"
								/>
							</a-form-item>
						</a-col>
						<a-col span={12}>
							<a-form-item label="是否缓存" name="keep_alive">
								<a-switch
									v-model={[model.value.keep_alive, 'checked']}
									checked-children="是"
									un-checked-children="否"
								/>
							</a-form-item>
						</a-col>
					</a-row>

					<a-form-item label="排序" name="sort">
						<a-input-number
							v-model={[model.value.sort, 'value']}
							placeholder="请输入排序"
							class="w-full"
							min={0}
						/>
					</a-form-item>
				</a-form>
			</>
		)
	},
	{
		emits: {
			confirm: (value: IMenuItem) => true,
			cancel: () => true,
			'update:record': (value: IMenuItem) => true,
		},
		props: {
			record: {
				type: Object as PropType<IMenuItem>,
				required: true,
			},
			parentList: {
				type: Array as PropType<IMenuItem[]>,
				default: () => [],
			},
		},
	},
)
