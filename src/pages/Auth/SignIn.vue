<template>
	<AuthCard title="登录" icon="User">
		<el-form
			ref="formRef"
			:model="form"
			:rules="rules"
			class="space-y-6"
			@keyup.enter="handleSubmit"
		>
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
				<el-button type="primary" class="btn-primary" @click="handleSubmit">
					登录
				</el-button>
			</el-form-item>
		</el-form>
		<div class="text-center mt-8">
			<router-link
				to="/signup"
				class="text-sm text-blue-600 hover:text-indigo-600 transition-colors duration-300"
			>
				还没有账号？立即注册
			</router-link>
		</div>
	</AuthCard>
</template>

<script setup lang="ts">
import { useAuthForm } from '@/hooks/useAuthForm'
import { fetchUserLogin } from '@/api/services'
const { formRef, form, rules } = useAuthForm(false)
const router = useRouter()

const handleSubmit = async () => {
	if (!formRef.value) return

	await formRef.value.validate((valid) => {
		if (valid) {
			fetchUserLogin({
				account: form.username,
				password: form.password,
			}).then((res) => {
				console.log(res)
				ElMessage.success('登录成功')
				localStorage.setItem('token', res.token)
				router.push('/system')
			})
		}
	})
}
</script>
