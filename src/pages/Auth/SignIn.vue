<template>
	<AuthCard title="登录" icon="User">
		<el-form ref="formRef" :model="form" :rules="rules" class="space-y-6">
			<el-form-item prop="username">
				<el-input
					v-model="form.username"
					placeholder="账号/邮箱/手机号"
					prefix-icon="User"
					class="text-lg hover:shadow-lg transition-shadow duration-300"
					size="large"
				/>
			</el-form-item>
			<el-form-item prop="password">
				<el-input
					v-model="form.password"
					type="password"
					placeholder="请输入密码"
					prefix-icon="Lock"
					show-password
					class="text-lg hover:shadow-lg transition-shadow duration-300"
					size="large"
				/>
			</el-form-item>
			<el-form-item>
				<el-button
					type="primary"
					class="w-full !h-12 text-lg !bg-gradient-to-r from-blue-500 to-indigo-600 border-none hover:shadow-xl hover:opacity-90 transition-all duration-300"
					@click="handleSubmit"
				>
					登录
				</el-button>
			</el-form-item>
		</el-form>
		<div class="text-center mt-8">
			<router-link
				to="/signup"
				class="text-lg text-blue-600 hover:text-indigo-600 transition-colors duration-300"
			>
				还没有账号？立即注册
			</router-link>
		</div>
	</AuthCard>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()
const form = reactive({
	username: '',
	password: '',
})

const rules: FormRules = {
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [
		{ required: true, message: '请输入密码', trigger: 'blur' },
		{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
	],
}

const handleSubmit = async () => {
	if (!formRef.value) return

	await formRef.value.validate((valid) => {
		if (valid) {
			ElMessage.success('登录成功')
			// TODO: Add your login logic here
		}
	})
}
</script>
