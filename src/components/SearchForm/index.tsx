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
				<el-input
					v-model={query.value[config.model]}
					placeholder={config.placeholder || '请输入' + config.label}
					clearable
					suffix-icon="Search"
					{...config.props}
				/>
			)
		}

		const createElSelect = (config: ISearchConfig) => {
			return (
				<el-select
					v-model={query.value[config.model]}
					placeholder={config.placeholder || '请选择' + config.label}
					clearable
					{...config.props}
				>
					{config.options?.map((option) => (
						<el-option key={option.value} label={option.label} value={option.value} />
					))}
				</el-select>
			)
		}

		const handleSubmit = () => {
			console.log(query.value)
			emit('submit', query.value)
		}

		const handleReset = () => {
			initQuery()
			emit('reset')
		}

		return () => (
			<a-form
				model={query.value}
				label-width="auto"
				label-position="right"
				onSubmitPrevent={handleSubmit}
			>
				<a-row gutter={16} justify="start">
					{filterFields.value.map((config) => {
						return (
							<a-col span={6}>
								<a-form-item label={config.label} prop={config.model}>
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
							{/* 添加一个展开收起的图标文本 */}
							{props.config.length > oneLineMaxComponent && (
								<a-link
									class="mr-2 select-none"
									underline={false}
									type="primary"
									onClick={() => (isExpand.value = !isExpand.value)}
								>
									<el-icon>
										{isExpand.value ? <arrowUp /> : <arrowDown />}
									</el-icon>
									{isExpand.value ? '收起' : '展开'}
								</a-link>
							)}

							<a-button type="primary" onClick={handleSubmit}>
								搜索
							</a-button>

							<a-button plain onClick={handleReset}>
								重置
							</a-button>
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
