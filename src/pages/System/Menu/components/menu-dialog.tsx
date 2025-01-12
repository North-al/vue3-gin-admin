export default defineComponent(
	(props, { emit }) => {
		const model = computed({
			get: () => props.record,
			set: (value: IMenuItem) => {
				emit('update:record', value)
			},
		})
		const rules = {
			title: [{ required: true, message: '请输入菜单名称' }],
		}

		return () => (
			<>
				<a-form
					model={model}
					rules={rules}
					label-col={{ xs: { span: 24 }, sm: { span: 4 } }}
					wrapper-col={{ xs: { span: 24 }, sm: { span: 24 } }}
					autoFocusFirstInput
				>
					{/* <a-form-item label="父级菜单" name="parent_id">
						<a-select
							v-model={[model.value.parent_id, 'value']}
							placeholder="请选择父级菜单"
							options={list.value.map((item) => ({
								label: item.title,
								value: item.id,
							}))}
						/>
					</a-form-item> */}
					<a-form-item label="菜单标题" name="title" required>
						<a-input
							v-model={[model.value.title, 'value']}
							placeholder="请输入菜单标题"
							prefix={<iconify icon="ant-design:menu-outlined" />}
						/>
					</a-form-item>
					<a-form-item label="路由名称" name="route_name">
						<a-input
							v-model={[model.value.route_name, 'value']}
							placeholder="请输入路由名称"
							prefix={<iconify icon="ant-design:link-outlined" />}
						/>
					</a-form-item>

					<a-form-item label="菜单路径" name="route_path">
						<a-input
							v-model={[model.value.route_path, 'value']}
							placeholder="请输入菜单路径"
							prefix={<iconify icon="ant-design:folder-outlined" />}
						/>
					</a-form-item>

					<a-form-item label="页面路径" name="page_file_path">
						<a-input
							v-model={[model.value.page_file_path, 'value']}
							placeholder="请输入页面路径"
							prefix={<iconify icon="ant-design:file-outlined" />}
						/>
					</a-form-item>

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

					<a-form-item label="是否隐藏" name="hidden">
						<a-switch
							v-model={[model.value.hidden, 'checked']}
							checked-children="是"
							un-checked-children="否"
						/>
					</a-form-item>

					<a-form-item label="是否缓存" name="keep_alive">
						<a-switch
							v-model={[model.value.keep_alive, 'checked']}
							checked-children="是"
							un-checked-children="否"
						/>
					</a-form-item>

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
