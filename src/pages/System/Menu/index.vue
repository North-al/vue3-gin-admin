<template>
	<div class="menu-container">
		<!-- 头部区域 -->
		<div class="header-section">
			<div class="title-wrapper">
				<el-icon class="mr-2"><Menu /></el-icon>
				<h2 class="page-title">菜单管理</h2>
			</div>
			<el-button type="primary" class="add-button" @click="handleAdd">
				<el-icon class="mr-1"><Plus /></el-icon>新增菜单
			</el-button>
		</div>

		<!-- 表格区域 -->
		<div class="table-section">
			<el-card shadow="hover" class="table-card">
				<!-- 表格工具栏 -->
				<template #header>
					<div class="table-toolbar">
						<div class="left">
							<el-input
								v-model="searchKeyword"
								placeholder="搜索菜单名称/路径"
								clearable
								class="search-input"
							>
								<template #prefix>
									<el-icon><Search /></el-icon>
								</template>
							</el-input>
							<el-button-group class="ml-4">
								<el-button icon="Refresh" @click="refreshTable">刷新</el-button>
								<el-button icon="Expand" @click="expandAll">展开全部</el-button>
								<el-button icon="Fold" @click="collapseAll">折叠全部</el-button>
							</el-button-group>
						</div>
						<div class="right">
							<el-button type="success" icon="Download" @click="exportData"
								>导出</el-button
							>
						</div>
					</div>
				</template>

				<!-- 表格主体 -->
				<el-table
					ref="tableRef"
					v-loading="loading"
					:data="filteredTreeMenuList"
					row-key="id"
					border
					stripe
					:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
					style="width: 100%"
					size="large"
					:header-cell-style="tableHeaderStyle"
					@row-click="handleRowClick"
				>
					<el-table-column type="selection" width="55" align="center" />
					<el-table-column prop="id" label="ID" width="80" align="center" />
					<el-table-column prop="title" label="菜单名称" min-width="200">
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
					<el-table-column
						prop="route_path"
						label="路由路径"
						min-width="180"
						show-overflow-tooltip
					>
						<template #default="{ row }">
							<el-tag size="small" effect="plain">{{ row.route_path }}</el-tag>
						</template>
					</el-table-column>
					<el-table-column
						prop="page_file_path"
						label="页面文件路径"
						min-width="220"
						show-overflow-tooltip
					>
						<template #default="{ row }">
							<el-tooltip :content="row.page_file_path" placement="top">
								<span class="file-path">{{ row.page_file_path }}</span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="sort" label="排序" width="100" align="center">
						<template #default="{ row }">
							<el-input-number
								v-model="row.sort"
								:min="0"
								size="small"
								@change="handleSortChange(row)"
							/>
						</template>
					</el-table-column>
					<el-table-column prop="hidden" label="显示状态" width="120" align="center">
						<template #default="{ row }">
							<el-switch
								v-model="row.hidden"
								:active-value="false"
								:inactive-value="true"
								active-text="显示"
								inactive-text="隐藏"
								@change="handleStatusChange(row)"
							/>
						</template>
					</el-table-column>
					<el-table-column
						label="更新时间"
						width="180"
						align="center"
						show-overflow-tooltip
					>
						<template #default="{ row }">
							<el-tooltip :content="row.updated_at" placement="top">
								<span>{{ formatDate(row.updated_at) }}</span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column label="操作" width="200" fixed="right" align="center">
						<template #default="{ row }">
							<el-space>
								<el-button type="primary" link @click.stop="handleEdit(row)">
									<el-icon><Edit /></el-icon>编辑
								</el-button>
								<el-button type="success" link @click.stop="handleAddSub(row)">
									<el-icon><Plus /></el-icon>添加子菜单
								</el-button>
								<el-popconfirm
									title="确认删除该菜单吗？"
									@confirm="handleDelete(row)"
								>
									<template #reference>
										<el-button type="danger" link @click.stop>
											<el-icon><Delete /></el-icon>删除
										</el-button>
									</template>
								</el-popconfirm>
							</el-space>
						</template>
					</el-table-column>
				</el-table>
			</el-card>
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

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Expand, Fold, Download } from '@element-plus/icons-vue'

interface MenuForm {
	id?: number
	parent_id: number | null
	title: string
	route_path: string
	route_name: string
	page_file_path: string
	icon: string
	hidden: boolean
	keep_alive: boolean
	sort: number
}

// 模拟菜单数据
const menuList = ref([
	{
		id: 1,
		parent_id: 0,
		page_file_path: '@/pages/Auth/SignIn.vue',
		route_path: '/sign-in',
		route_name: 'SignIn',
		redirect: '',
		title: '登录',
		icon: 'User',
		hidden: true,
		keep_alive: true,
		sort: 1,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 2,
		parent_id: 0,
		page_file_path: '@/pages/Dashboard/index.vue',
		route_path: '/dashboard',
		route_name: 'Dashboard',
		redirect: '',
		title: '仪表盘',
		icon: 'DataBoard',
		hidden: false,
		keep_alive: true,
		sort: 2,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 3,
		parent_id: 0,
		page_file_path: '@/pages/System',
		route_path: '/system',
		route_name: 'System',
		redirect: '',
		title: '系统管理',
		icon: 'Setting',
		hidden: false,
		keep_alive: true,
		sort: 3,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 4,
		parent_id: 3,
		page_file_path: '@/pages/System/User/index.vue',
		route_path: '/system/user',
		route_name: 'SystemUser',
		redirect: '',
		title: '用户管理',
		icon: 'UserFilled',
		hidden: false,
		keep_alive: true,
		sort: 1,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 5,
		parent_id: 3,
		page_file_path: '@/pages/System/Role/index.vue',
		route_path: '/system/role',
		route_name: 'SystemRole',
		redirect: '',
		title: '角色管理',
		icon: 'Lock',
		hidden: false,
		keep_alive: true,
		sort: 2,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 6,
		parent_id: 3,
		page_file_path: '@/pages/System/Menu/index.vue',
		route_path: '/system/menu',
		route_name: 'SystemMenu',
		redirect: '',
		title: '菜单管理',
		icon: 'Menu',
		hidden: false,
		keep_alive: true,
		sort: 3,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 7,
		parent_id: 0,
		page_file_path: '@/pages/Content',
		route_path: '/content',
		route_name: 'Content',
		redirect: '',
		title: '内容管理',
		icon: 'Document',
		hidden: false,
		keep_alive: true,
		sort: 4,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 8,
		parent_id: 7,
		page_file_path: '@/pages/Content/Article/index.vue',
		route_path: '/content/article',
		route_name: 'ContentArticle',
		redirect: '',
		title: '文章管理',
		icon: 'Files',
		hidden: false,
		keep_alive: true,
		sort: 1,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 9,
		parent_id: 7,
		page_file_path: '@/pages/Content/Category/index.vue',
		route_path: '/content/category',
		route_name: 'ContentCategory',
		redirect: '',
		title: '分类管理',
		icon: 'FolderOpened',
		hidden: false,
		keep_alive: true,
		sort: 2,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
	{
		id: 10,
		parent_id: 7,
		page_file_path: '@/pages/Content/Tag/index.vue',
		route_path: '/content/tag',
		route_name: 'ContentTag',
		redirect: '',
		title: '标签管理',
		icon: 'Collection',
		hidden: false,
		keep_alive: true,
		sort: 3,
		created_at: '2025-01-01 13:44:20',
		updated_at: '2025-01-01 13:44:20',
	},
])

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

// 处理行点击事件
const handleRowClick = (row: any) => {
	// 如果点击的是叶子节点（没有子菜单），则展开/折叠操作无效
	if (!row.children?.length) return

	// 获取当前行的展开状态
	const expanded = tableRef.value.store.states.treeData.value[row.id]?.expanded

	// 切换展开/折叠状态
	if (expanded) {
		tableRef.value.store.states.treeData.value[row.id].expanded = false
	} else {
		tableRef.value.store.states.treeData.value[row.id].expanded = true
	}
}

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
const initFormData = (): MenuForm => ({
	parent_id: null,
	title: '',
	route_path: '',
	route_name: '',
	page_file_path: '',
	icon: '',
	hidden: false,
	keep_alive: true,
	sort: 0,
})

const formData = reactive<MenuForm>(initFormData())
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

		// 这里添加保存逻辑
		await new Promise((resolve) => setTimeout(resolve, 1000))

		ElMessage.success(formData.id ? '更新成功' : '添加成功')
		dialogVisible.value = false
		refreshTable()
	} catch (error) {
		console.error('表单验证失败:', error)
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
		return children.some((child) => child.id === parentId || findChildren(child.id))
	}

	return !findChildren(currentId)
}

// 处理排序变更
const handleSortChange = async (row: any) => {
	try {
		// 这里添加更新排序的逻辑
		await new Promise((resolve) => setTimeout(resolve, 500))
		ElMessage.success('排序更新成功')
	} catch (error) {
		console.error('更新排序失败:', error)
		ElMessage.error('排序更新失败')
	}
}

// 处理状态变更
const handleStatusChange = async (row: any) => {
	try {
		// 这里添加更新状态的逻辑
		await new Promise((resolve) => setTimeout(resolve, 500))
		ElMessage.success('状态更新成功')
	} catch (error) {
		console.error('更新状态失败:', error)
		ElMessage.error('状态更新失败')
		row.hidden = !row.hidden // 恢复原状态
	}
}

// 搜索过滤优化
const filteredTreeMenuList = computed(() => {
	if (!searchKeyword.value) return treeMenuList.value

	const search = searchKeyword.value.toLowerCase()
	const filterNode = (data: any): boolean => {
		const matchCurrent =
			data.title.toLowerCase().includes(search) ||
			data.route_path.toLowerCase().includes(search) ||
			data.page_file_path.toLowerCase().includes(search)

		if (matchCurrent) return true

		return data.children?.some(filterNode) || false
	}

	return JSON.parse(JSON.stringify(treeMenuList.value)).filter(filterNode)
})

// 导出数据
const exportData = () => {
	const data = JSON.parse(JSON.stringify(menuList.value))
	const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
	const url = URL.createObjectURL(blob)
	const link = document.createElement('a')
	link.href = url
	link.download = `menu-${new Date().toISOString().split('T')[0]}.json`
	document.body.appendChild(link)
	link.click()
	document.body.removeChild(link)
	URL.revokeObjectURL(url)
}

// 新增的数据和方法
const loading = ref(false)
const searchKeyword = ref('')
const tableRef = ref()

// 表格头部样式
const tableHeaderStyle = {
	background: 'var(--el-fill-color-light)',
	color: 'var(--el-text-color-primary)',
	fontWeight: 'bold',
	height: '50px',
}

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

// 展开/折叠所有
const expandAll = () => {
	tableRef.value?.expandAll()
}

const collapseAll = () => {
	tableRef.value?.collapseAll()
}

// 刷新表格
const refreshTable = async () => {
	loading.value = true
	try {
		// 这里添加刷新数据的逻辑
		await new Promise((resolve) => setTimeout(resolve, 1000))
	} finally {
		loading.value = false
	}
}
</script>

<style scoped>
.menu-container {
	padding: 16px;
	background-color: var(--el-bg-color);
	min-height: 100%;
}

.header-section {
	margin-bottom: 16px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.title-wrapper {
	display: flex;
	align-items: center;
	gap: 8px;
}

.page-title {
	font-size: 20px;
	font-weight: 600;
	color: var(--el-text-color-primary);
	margin: 0;
}

.table-section {
	background-color: var(--el-bg-color);
}

.table-card {
	border-radius: 8px;
}

.menu-title-cell {
	display: flex;
	align-items: center;
	gap: 8px;
}

.menu-icon {
	font-size: 16px;
	color: var(--el-text-color-secondary);
}

.dialog-form {
	padding: 20px 0;
}

:deep(.el-dialog__body) {
	padding-top: 10px;
}

:deep(.el-input-number .el-input__wrapper) {
	width: 100%;
}

/* 适配暗黑模式 */
:deep(.dark) {
	.table-card {
		border: 1px solid var(--el-border-color);
	}
}

.table-toolbar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px 0;
}

.search-input {
	width: 300px;
}

.file-path {
	color: var(--el-text-color-secondary);
	font-family: monospace;
}

.icon-selector {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 12px;
	padding: 12px;
}

.icon-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	padding: 8px;
	cursor: pointer;
	border-radius: 4px;
	transition: all 0.3s;
}

.icon-item:hover {
	background-color: var(--el-fill-color-light);
	color: var(--el-color-primary);
}

.icon-item .el-icon {
	font-size: 20px;
}

.icon-item span {
	font-size: 12px;
}

.form-help {
	margin-top: 8px;
}

:deep(.el-form-item__content) {
	flex-wrap: nowrap;
}

:deep(.el-alert) {
	padding: 8px 12px;
}

:deep(.el-dialog__body) {
	padding: 20px 30px;
}

:deep(.el-form--label-right) {
	max-height: 60vh;
	overflow-y: auto;
}
</style>
