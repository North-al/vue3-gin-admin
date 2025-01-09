import { useAuthForm } from '@/hooks/useAuthForm'
import { fetchUserLogin } from '@/api/services'

export default defineComponent({
	name: 'SignIn',
	setup() {
		const router = useRouter()
		const { formRef, form, rules } = useAuthForm(false)
		const loading = ref(false)

		const handleSubmit = async () => {
			if (!formRef.value) return

			await formRef.value.validate()
			loading.value = true
			fetchUserLogin({
				account: form.username,
				password: form.password,
			})
				.then((res) => {
					console.log(res)
					AMessage.success('登录成功')
					localStorage.setItem('token', res.token)
					router.push('/system')
				})
				.catch((err) => {
					AMessage.error(err.message)
				})
				.finally(() => {
					loading.value = false
				})
		}

		return () => (
			<authCard title="登录" icon="ant-design:user-outlined">
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

					<a-form-item>
						<a-button
							type="primary"
							onClick={handleSubmit}
							class="btn-primary"
							loading={loading.value}
						>
							登录
						</a-button>
					</a-form-item>
				</a-form>

				<div class="text-center mt-8">
					<routerLink
						to="/signup"
						class="text-sm text-blue-600 hover:text-indigo-600 transition-colors duration-300"
					>
						还没有账号？立即注册
					</routerLink>
				</div>
			</authCard>
		)
	},
})
