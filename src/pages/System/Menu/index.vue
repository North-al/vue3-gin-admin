<template>
	<div class="menu-container">
		<!-- 表格主体 -->
		<div px-20px>
			<!-- <el-table v-loading="loading" :data="treeMenuList" style="width: 100%; height: 100%">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column prop="id" label="ID" width="80" align="center" />
				<el-table-column prop="title" label="菜单名称" min-width="120">
					<template #default="{ row }">
						<div class="menu-title-cell">
							<el-icon v-if="row.icon" class="menu-icon"
								><component :is="row.icon"
							/></el-icon>
							<span>{{ row.title }}</span>
							<el-tag
								v-if="row.children?.length"
								size="small"
								type="info"
								effect="plain"
								class="ml-2"
								>{{ row.children.length }}个子项</el-tag
							>
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="icon" label="菜单图标" min-width="60">
					<template #default="{ row }">
						<template v-if="row.icon">
							<el-icon><component :is="row.icon" /></el-icon>
						</template>
						<template v-else>
							<span>-</span>
						</template>
					</template>
				</el-table-column>
				<el-table-column
					prop="route_path"
					label="路由路径"
					min-width="120"
					show-overflow-tooltip
				>
					<template #default="{ row }">
						<el-tag size="small" effect="plain">{{ row.route_path }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column
					prop="page_file_path"
					label="页面文件路径"
					min-width="120"
					show-overflow-tooltip
				>
					<template #default="{ row }">
						<el-tooltip :content="row.page_file_path" placement="top">
							<span class="file-path">{{ row.page_file_path }}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="sort" label="排序" min-width="120" align="center">
					<template #default="{ row }">
						<el-input-number v-model="row.sort" :min="0" size="small" />
					</template>
				</el-table-column>
				<el-table-column prop="hidden" label="显示状态" min-width="120" align="center">
					<template #default="{ row }">
						<el-switch
							v-model="row.hidden"
							:active-value="false"
							:inactive-value="true"
							active-text="显示"
							inactive-text="隐藏"
						/>
					</template>
				</el-table-column>
				<el-table-column label="更新时间" min-width="120" align="center">
					<template #default="{ row }">
						<el-tooltip :content="row.updated_at" placement="top">
							<span>{{ formatDate(row.updated_at) }}</span>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column label="操作" fixed="right" width="230" align="center">
					<template #default="{ row }">
						<el-space>
							<el-button type="primary" link @click.stop="handleEdit(row)">
								<el-icon><Edit /></el-icon>编辑
							</el-button>
							<el-button type="success" link @click.stop="handleAddSub(row)">
								<el-icon><Plus /></el-icon>添加子菜单
							</el-button>
							<el-popconfirm title="确认删除该菜单吗？" @confirm="handleDelete(row)">
								<template #reference>
									<el-button type="danger" link @click.stop>
										<el-icon><Delete /></el-icon>删除
									</el-button>
								</template>
							</el-popconfirm>
						</el-space>
					</template>
				</el-table-column>
			</el-table> -->

			<PagingTable :tableData="treeMenuList" :columns="columns" :loading="loading" />
		</div>
		<!-- 新增/编辑对话框 -->

		<el-dialog
			:title="dialogTitle"
			v-model="dialogVisible"
			width="700px"
			destroy-on-close
			align-center
		>
			<el-form
				ref="formRef"
				:model="formData"
				:rules="rules"
				label-width="120px"
				class="dialog-form"
			>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item label="上级菜单">
							<el-tree-select
								v-model="formData.parent_id"
								:data="treeMenuList"
								:props="{ label: 'title', value: 'id' }"
								placeholder="请选择上级菜单"
								clearable
								class="w-full"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="菜单名称" prop="title">
							<el-input v-model="formData.title" placeholder="请输入菜单名称" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="图标" prop="icon">
							<el-popover placement="bottom" :width="400" trigger="click">
								<template #reference>
									<el-input v-model="formData.icon" placeholder="点击选择图标">
										<template #prefix>
											<el-icon v-if="formData.icon"
												><component :is="formData.icon"
											/></el-icon>
										</template>
									</el-input>
								</template>
								<div class="icon-selector">
									<div
										v-for="icon in iconList"
										:key="icon"
										class="icon-item"
										@click="selectIcon(icon)"
									>
										<el-icon><component :is="icon" /></el-icon>
										<span>{{ icon }}</span>
									</div>
								</div>
							</el-popover>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="路由路径" prop="route_path">
							<el-input v-model="formData.route_path" placeholder="请输入路由路径">
								<template #prefix>/</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="路由名称" prop="route_name">
							<el-input v-model="formData.route_name" placeholder="请输入路由名称" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="文件路径" prop="page_file_path">
							<el-input
								v-model="formData.page_file_path"
								placeholder="请输入页面文件路径"
							>
								<template #prefix>@/</template>
							</el-input>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="排序" prop="sort">
							<el-input-number v-model="formData.sort" :min="0" class="w-full" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="显示状态" prop="hidden">
							<el-switch
								v-model="formData.hidden"
								:active-value="false"
								:inactive-value="true"
								active-text="显示"
								inactive-text="隐藏"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="缓存路由" prop="keep_alive">
							<el-switch
								v-model="formData.keep_alive"
								active-text="是"
								inactive-text="否"
							/>
							<div class="form-help">
								<el-alert
									title="开启后该页面将被缓存，切换页面不会重新渲染"
									type="info"
									:closable="false"
								/>
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<el-button @click="dialogVisible = false">取消</el-button>
				<el-button type="primary" @click="handleSubmit" :loading="submitLoading"
					>确定</el-button
				>
			</template>
		</el-dialog>
	</div>
</template>

<script setup lang="tsx">
import type { FormInstance, FormRules } from 'element-plus'
import { fetchMenuList, fetchCreateMenu, fetchUpdateMenu } from '@/api/services'

// 模拟菜单数据

const columns = ref<TableColumn[]>([
	{ prop: 'id', label: 'ID', width: '80' },
	{
		prop: 'title',
		label: '菜单名称',
		minWidth: '120',
		slot: ({ row }: { row: any }) => (
			<div class="menu-title-cell">
				{row.icon && <el-icon class="menu-icon">{h(resolveComponent(row.icon))}</el-icon>}
				<span>{row.title}</span>
				{row.children?.length && (
					<el-tag size="small" type="info" effect="plain" class="ml-2">
						{row.children.length}个子项
					</el-tag>
				)}
			</div>
		),
	},
	{
		prop: 'icon',
		label: '菜单图标',
		minWidth: '60',
		slot: ({ row }: { row: any }) => (
			<div>
				{row.icon ? <el-icon>{h(resolveComponent(row.icon))}</el-icon> : <span>-</span>}
			</div>
		),
	},
	{ prop: 'route_path', label: '路由路径', minWidth: '120' },
	{ prop: 'page_file_path', label: '页面文件路径', minWidth: '120' },
	{ prop: 'sort', label: '排序', minWidth: '120' },
	{ prop: 'hidden', label: '显示状态', minWidth: '120' },
	{ prop: 'updated_at', label: '更新时间', minWidth: '120' },
	{
		prop: 'action',
		label: '操作',
		minWidth: '230',
		slot: ({ row }) => (
			<div>
				<el-button type="primary" link onClick={() => handleEdit(row)}>
					编辑
				</el-button>
			</div>
		),
	},
])

const menuList = ref<IMenuItem[]>([])

// 将扁平数据转换为树形结构
const treeMenuList = computed(() => {
	const cloneData = JSON.parse(JSON.stringify(menuList.value))

	return cloneData.filter((parent: any) => {
		const children = cloneData.filter((child: any) => child.parent_id === parent.id)
		if (children.length > 0) {
			parent.children = children
		}
		return parent.parent_id === 0
	})
})

// 表单校验规则增强
const rules: FormRules = {
	title: [
		{ required: true, message: '请输入菜单名称', trigger: 'blur' },
		{ min: 2, max: 50, message: '长度在 2 到 50 个字符', trigger: 'blur' },
	],
	route_path: [
		{ required: true, message: '请输入路由路径', trigger: 'blur' },
		{
			pattern: /^[a-z0-9/-]*$/,
			message: '路由路径只能包含小写字母、数字、横线',
			trigger: 'blur',
		},
	],
	route_name: [
		{ required: true, message: '请输入路由名称', trigger: 'blur' },
		{
			pattern: /^[A-Z][A-Za-z0-9]*$/,
			message: '路由名称必须以大写字母开头，只能包含字母和数字',
			trigger: 'blur',
		},
	],
	page_file_path: [
		{ required: true, message: '请输入页面文件路径', trigger: 'blur' },
		{
			pattern: /^pages\/.*\.vue$/,
			message: '文件路径格式不正确，应以 pages/ 开头，以 .vue 结尾',
			trigger: 'blur',
		},
	],
	sort: [
		{ required: true, message: '请输入排序号', trigger: 'blur' },
		{ type: 'number', min: 0, message: '排序号必须大于等于0', trigger: 'blur' },
	],
}

// 初始化表单数据
const initFormData = (): IMenuItem => ({
	parent_id: null,
	title: '',
	route_path: '',
	route_name: '',
	redirect: '',
	page_file_path: '',
	icon: '',
	hidden: false,
	keep_alive: true,
	sort: 0,
})

const formData = reactive<IMenuItem>(initFormData())
const formRef = ref<FormInstance>()
const dialogVisible = ref(false)
const dialogTitle = ref('')
const submitLoading = ref(false)

// 处理添加菜单
const handleAdd = () => {
	dialogTitle.value = '新增菜单'
	Object.assign(formData, initFormData()) // 重置表单数据
	dialogVisible.value = true
}

// 处理编辑菜单
const handleEdit = (row: any) => {
	dialogTitle.value = '编辑菜单'
	Object.assign(formData, { ...row }) // 使用解构赋值避免引用问题
	dialogVisible.value = true
}

// 处理添加子菜单
const handleAddSub = (row: any) => {
	dialogTitle.value = '新增子菜单'
	Object.assign(formData, initFormData(), {
		parent_id: row.id,
	})
	dialogVisible.value = true
}

// 处理删除菜单
const handleDelete = async (row: any) => {
	// 检查是否有子菜单
	if (row.children?.length) {
		ElMessage.warning('该菜单下存在子菜单，请先删除子菜单')
		return
	}

	try {
		await ElMessageBox.confirm('确认删除该菜单吗？删除后不可恢复', '警告', {
			type: 'warning',
			confirmButtonText: '确认',
			cancelButtonText: '取消',
		})
		// 这里添加删除逻辑
		ElMessage.success('删除成功')
	} catch {
		// 用户取消删除
	}
}

// 处理表单提交
const handleSubmit = async () => {
	if (!formRef.value) return

	try {
		await formRef.value.validate()
		submitLoading.value = true

		// 检查父级菜单是否合法
		if (formData.id && formData.parent_id) {
			const isValidParent = checkParentValid(formData.id, formData.parent_id)
			if (!isValidParent) {
				ElMessage.error('不能选择自己或其子菜单作为父级菜单')
				return
			}
		}

		// 根据是否有 id 判断是新增还是更新
		if (formData.id) {
			await fetchUpdateMenu(formData)
			ElMessage.success('更新成功')
		} else {
			await fetchCreateMenu(formData)
			ElMessage.success('添加成功')
		}

		dialogVisible.value = false
		refreshTable()
	} catch (error: any) {
		console.error('操作失败:', error)
		ElMessage.error(error.message || '操作失败')
	} finally {
		submitLoading.value = false
	}
}

// 检查父级菜单是否合法
const checkParentValid = (currentId: number, parentId: number): boolean => {
	// 不能选择自己作为父级
	if (currentId === parentId) return false

	// 不能选择自己的子菜单作为父级
	const findChildren = (id: number): boolean => {
		const children = menuList.value.filter((item) => item.parent_id === id)
		return children.some((child) => child.id === parentId || findChildren(child.id!))
	}

	return !findChildren(currentId)
}

// 新增的数据和方法
const loading = ref(false)
const searchKeyword = ref('')
const tableRef = ref()

// 图标列表
const iconList = [
	'Menu',
	'Setting',
	'User',
	'Lock',
	'Document',
	'Files',
	'FolderOpened',
	'Collection',
	'DataBoard',
	// ... 更多图标
]

// 选择图标
const selectIcon = (icon: string) => {
	formData.icon = icon
}

// 格式化日期
const formatDate = (date: string) => {
	return new Date(date).toLocaleString()
}

// 刷新表格
const refreshTable = async () => {
	loading.value = true
	try {
		const data = await fetchMenuList()
		menuList.value = data
	} catch (error: any) {
		console.error('获取菜单列表失败:', error)
		ElMessage.error(error.message || '获取菜单列表失败')
	} finally {
		loading.value = false
	}
}

// 组件挂载时获取菜单列表
onMounted(() => {
	refreshTable()
})
</script>

<style scoped></style>
