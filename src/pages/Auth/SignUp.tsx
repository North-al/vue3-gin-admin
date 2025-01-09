import { useAuthForm } from '@/hooks/useAuthForm'
import { fetchUserRegister } from '@/api/services'

export default defineComponent({
	name: 'SignUp',
	setup() {
		const router = useRouter()
		const { formRef, form, rules } = useAuthForm(true)
		const loading = ref(false)

		const handleSubmit = async () => {
			if (!formRef.value) return

			await formRef.value.validate()
			loading.value = true
			fetchUserRegister({
				username: form.username,
				password: form.password,
				confirmPassword: form.confirmPassword!,
			})
				.then(() => {
					AMessage.success('注册成功')
					router.push('/signin')
				})
				.catch((err) => {
					AMessage.error(err.message)
				})
				.finally(() => {
					loading.value = false
				})
		}

		return () => (
			<authCard title="注册" icon="ant-design:plus-outlined">
				<a-form
					ref={formRef}
					model={form}
					rules={rules}
					onKeypress={(e: any) => e.key === 'Enter' && handleSubmit()}
					class="space-y-6"
				>
					<a-form-item name="username">
						<a-input
							v-model={[form.username, 'value']}
							placeholder="账号/邮箱/手机号"
							class="h-10"
							prefix={
								<iconify
									icon="ant-design:user-outlined"
									class="text-lg text-gray-500"
								/>
							}
						/>
					</a-form-item>

					<a-form-item name="password">
						<a-input-password
							v-model={[form.password, 'value']}
							placeholder="请输入密码"
							class="h-10"
							autocomplete="on"
							prefix={
								<iconify
									icon="ant-design:lock-outlined"
									class="text-lg text-gray-500"
								/>
							}
						/>
					</a-form-item>

					<a-form-item name="confirmPassword">
						<a-input-password
							v-model={[form.confirmPassword, 'value']}
							placeholder="请确认密码"
							class="h-10"
							autocomplete="on"
							prefix={
								<iconify
									icon="ant-design:lock-outlined"
									class="text-lg text-gray-500"
								/>
							}
						/>
					</a-form-item>

					<a-form-item>
						<a-button
							type="primary"
							onClick={handleSubmit}
							class="btn-primary"
							loading={loading.value}
						>
							注册
						</a-button>
					</a-form-item>
				</a-form>

				<div class="text-center mt-8">
					<routerLink
						to="/signin"
						class="text-sm text-blue-600 hover:text-indigo-600 transition-colors duration-300"
					>
						已有账号？立即登录
					</routerLink>
				</div>
			</authCard>
		)
	},
})
