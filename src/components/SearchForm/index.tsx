interface SearchFormQuery {
	[key: string]: string | number | boolean | undefined | '' | null | []
}

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
			<el-form
				model={query.value}
				label-width="auto"
				label-position="right"
				onSubmitPrevent={handleSubmit}
			>
				<el-row gutter={16} justify="start">
					{filterFields.value.map((config) => {
						return (
							<el-col span={6}>
								<el-form-item label={config.label} prop={config.model}>
									{(() => {
										switch (config.type) {
											case 'input':
												return createElInput(config)
											case 'select':
												return createElSelect(config)
										}
									})()}
								</el-form-item>
							</el-col>
						)
					})}

					<el-col span={span.value}>
						<div class="flex-end">
							{/* 添加一个展开收起的图标文本 */}
							{props.config.length > oneLineMaxComponent && (
								<el-link
									class="mr-2 select-none"
									underline={false}
									type="primary"
									onClick={() => (isExpand.value = !isExpand.value)}
								>
									<el-icon>
										{isExpand.value ? <arrowUp /> : <arrowDown />}
									</el-icon>
									{isExpand.value ? '收起' : '展开'}
								</el-link>
							)}

							<el-button type="primary" onClick={handleSubmit}>
								搜索
							</el-button>

							<el-button plain onClick={handleReset}>
								重置
							</el-button>
						</div>
					</el-col>
				</el-row>
			</el-form>
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
