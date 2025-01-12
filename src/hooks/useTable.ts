export const useTable = <T>(
	api: Function,
	initParams?: Record<string, any>,
	isPagination = true,
	callback?: Function,
) => {
	const list = ref<T[]>([])
	const total = ref(0)
	const loading = ref(false)
	const pagination = ref<Pagination>({
		page: 1,
		limit: 10,
	})

	const getTableList = async () => {
		try {
			loading.value = true
			const data = await api({
				...pagination.value,
				...initParams,
			})
			console.log(data)
			list.value = isPagination ? data.list : data

			total.value = isPagination ? data.total : 0
			if (callback) {
				list.value = callback(isPagination ? data.list : data)
			}
		} catch (error) {
			console.error(error)
		} finally {
			loading.value = false
		}
	}

	getTableList()

	const handleRefresh = () => {
		pagination.value.page = 1
		getTableList()
	}

	const handleSearch = () => {
		pagination.value.page = 1
		getTableList()
	}

	const handleReset = () => {
		pagination.value.page = 1
		getTableList()
	}

	return {
		list,
		total,
		pagination,
		getTableList,
		handleSearch,
		handleReset,
		handleRefresh,
	}
}
