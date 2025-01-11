export default defineComponent(
	(props) => {
		const model = computed(() => props.record)
		const rules = {
			title: [{ required: true, message: '请输入菜单名称' }],
		}

		return () => (
			<>
				<a-form
					model={model}
					rules={rules}
					label-col={{ xs: { span: 24 }, sm: { span: 8 } }}
					wrapper-col={{ xs: { span: 24 }, sm: { span: 24 } }}
					autoFocusFirstInput
				>
					<a-row gutter={[16, 16]}>
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
							<a-form-item label="路由名称" name="route_name">
								<a-input
									v-model={[model.value.route_name, 'value']}
									placeholder="请输入路由名称"
									prefix={<iconify icon="ant-design:link-outlined" />}
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

						<a-col span={12}>
							<a-form-item label="页面路径" name="page_file_path">
								<a-input
									v-model={[model.value.page_file_path, 'value']}
									placeholder="请输入页面路径"
									prefix={<iconify icon="ant-design:file-outlined" />}
								/>
							</a-form-item>
						</a-col>

						<a-col span={12}>
							<a-form-item label="重定向" name="redirect">
								<a-input
									v-model={[model.value.redirect, 'value']}
									placeholder="请输入重定向路径"
									prefix={<iconify icon="ant-design:enter-outlined" />}
								/>
							</a-form-item>
						</a-col>

						<a-col span={12}>
							<a-form-item label="菜单图标" name="icon">
								<a-input
									v-model={[model.value.icon, 'value']}
									placeholder="请输入图标名称"
									prefix={<iconify icon="ant-design:appstore-outlined" />}
								>
									{{
										suffix: () => (
											<iconify
												icon={
													model.value.icon ||
													'ant-design:question-outlined'
												}
												class="text-lg"
											/>
										),
									}}
								</a-input>
							</a-form-item>
						</a-col>

						<a-col span={8}>
							<a-form-item label="是否隐藏" name="hidden">
								<a-switch
									v-model={[model.value.hidden, 'checked']}
									checked-children="是"
									un-checked-children="否"
								/>
							</a-form-item>
						</a-col>

						<a-col span={8}>
							<a-form-item label="是否缓存" name="keep_alive">
								<a-switch
									v-model={[model.value.keep_alive, 'checked']}
									checked-children="是"
									un-checked-children="否"
								/>
							</a-form-item>
						</a-col>

						<a-col span={8}>
							<a-form-item label="排序" name="sort">
								<a-input-number
									v-model={[model.value.sort, 'value']}
									placeholder="请输入排序"
									class="w-full"
									min={0}
								/>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</>
		)
	},
	{
		emits: {
			confirm: (value: IMenuItem) => true,
			cancel: () => true,
		},
		props: {
			record: {
				type: Object as PropType<IMenuItem>,
				required: true,
			},
		},
	},
)
