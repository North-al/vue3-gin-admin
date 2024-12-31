<template>
	<AuthCard title="注册" icon="Plus">
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
			<el-form-item prop="confirmPassword">
				<el-input
					v-model="form.confirmPassword"
					type="password"
					placeholder="请确认密码"
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
					注册
				</el-button>
			</el-form-item>
		</el-form>
		<div class="text-center mt-8">
			<router-link
				to="/signin"
				class="text-sm text-blue-600 hover:text-indigo-600 transition-colors duration-300"
			>
				已有账号？立即登录
			</router-link>
		</div>
	</AuthCard>
</template>

<script setup lang="ts">
import { useAuthForm } from '@/hooks/useAuthForm'

const { formRef, form, rules } = useAuthForm(true)

const handleSubmit = async () => {
	if (!formRef.value) return

	await formRef.value.validate((valid) => {
		if (valid) {
			ElMessage.success('注册成功')
			// TODO: Add your registration logic here
		}
	})
}
</script>
