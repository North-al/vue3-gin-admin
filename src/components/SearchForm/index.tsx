interface SearchFormQuery {
	[key: string]: string | number | boolean | undefined | '' | null | []
}

// 一行最多显示的组件数
const oneLineMaxComponent = 4

export default defineComponent(
	(props, { emit }) => {
		const query = ref<Record<string, any>>({})
		// 初始化
		const initQuery = () => {
			query.value = props.config.reduce(
				(obj, config) => {
					obj[config.model] = config.defaultValue || ''
					return obj
				},
				{} as Record<string, any>,
			)
		}

		onMounted(initQuery)

		const filterFields = computed(() =>
			[...props.config].splice(
				0,
				isExpand.value ? props.config.length : oneLineMaxComponent - 1,
			),
		)

		// 是否展开
		const isExpand = ref(props.config.length <= oneLineMaxComponent - 1)
		const span = computed(() =>
			isExpand.value
				? (oneLineMaxComponent - (props.config.length % oneLineMaxComponent)) * 6 || 6
				: 6,
		)

		const createElInput = (config: ISearchConfig) => {
			return (
				<a-input
					v-model={[query.value[config.model], 'value']}
					placeholder={config.placeholder || '请输入' + config.label}
					clearable
					{...config.props}
				>
					{{
						prefix: () =>
							config.slot?.prefix?.() || (
								<iconify class="text-base text-gray-400" icon="ep:search"></iconify>
							),
						suffix: () => config.slot?.suffix?.(),
					}}
				</a-input>
			)
		}

		const createElSelect = (config: ISearchConfig) => {
			return (
				<a-select
					v-model={[query.value[config.model], 'value']}
					placeholder={config.placeholder || '请选择' + config.label}
					clearable
					{...config.props}
				>
					{config.options?.map((option) => (
						<a-select-option key={option.value} value={option.value}>
							{option.label}
						</a-select-option>
					))}
				</a-select>
			)
		}

		const handleSubmit = () => {
			emit('submit', query.value)
		}

		const handleReset = () => {
			initQuery()
			emit('reset')
		}

		return () => (
			<a-form model={query.value} onSubmitPrevent={handleSubmit}>
				<a-row gutter={16} justify="start">
					{filterFields.value.map((config) => {
						return (
							<a-col span={6}>
								<a-form-item label={config.label} name={config.model}>
									{(() => {
										switch (config.type) {
											case 'input':
												return createElInput(config)
											case 'select':
												return createElSelect(config)
										}
									})()}
								</a-form-item>
							</a-col>
						)
					})}

					<a-col span={span.value}>
						<div class="flex-end">
							{props.config.length > oneLineMaxComponent && (
								<a-button
									type="link"
									onClick={() => (isExpand.value = !isExpand.value)}
								>
									<div class="flex items-center">
										<iconify
											icon={
												isExpand.value
													? 'ant-design:caret-up-outlined'
													: 'ant-design:caret-down-outlined'
											}
										></iconify>
										<span class="ml-1">{isExpand.value ? '收起' : '展开'}</span>
									</div>
								</a-button>
							)}

							<a-button class="mr-2" type="primary" onClick={handleSubmit}>
								搜索
							</a-button>

							<a-button onClick={handleReset}>重置</a-button>
						</div>
					</a-col>
				</a-row>
			</a-form>
		)
	},
	{
		name: 'SearchForm',
		props: {
			config: Object as PropType<ISearchConfig[]>,
		},
		emits: {
			submit: (query: SearchFormQuery) => true,
			reset: () => true,
		},
	},
)
