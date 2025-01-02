<script setup lang="tsx">
const tableData = ref([
	{ name: 'John', age: 30 },
	{ name: 'North', age: 25 },
	// 添加更多数据
])

const columns = ref([
	{
		prop: 'name',
		label: 'Name',
		width: '180',
		slot: (props: { row: any }) => <span style="color: red">{props.row.name} </span>,
	},
	{ prop: 'age', label: 'Age', width: '100', slot: 'age' },
])

const pagination = ref({
	currentPage: 1,
	pageSize: 10,
	total: 100, // 实际数据总量
})

const handlePaginationChange = (newPagination: any) => {
	pagination.value = newPagination
	// 这里可以调用 API 获取新页面的数据
	console.log(newPagination)
}
</script>

<template>
	<div>
		<PagingTable
			:tableData="tableData"
			:columns="columns"
			:pagination="pagination"
			@update:pagination="handlePaginationChange"
		>
			<template #age="{ row }">
				<span style="color: green">{{ row.age }}</span>
			</template>
		</PagingTable>
	</div>
</template>
