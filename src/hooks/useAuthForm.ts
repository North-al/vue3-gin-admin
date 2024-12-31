import type { FormInstance, FormRules } from 'element-plus'

interface AuthForm {
	username: string
	password: string
	confirmPassword?: string
}

export function useAuthForm(isSignUp = false) {
	const formRef = ref<FormInstance>()
	const form = reactive<AuthForm>({
		username: '',
		password: '',
		...(isSignUp ? { confirmPassword: '' } : {}),
	})

	// 重置表单方法
	const resetForm = () => {
		if (formRef.value) {
			formRef.value.resetFields()
		}
	}

	// 监听路由变化重置表单
	const route = useRoute()
	watch(() => route.path, resetForm)

	// 验证确认密码
	const validatePass = (rule: any, value: string, callback: any) => {
		if (value === '') {
			callback(new Error('请再次输入密码'))
		} else if (value !== form.password) {
			callback(new Error('两次输入密码不一致!'))
		} else {
			callback()
		}
	}

	// 表单验证规则
	const baseRules: FormRules = {
		username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
		password: [
			{ required: true, message: '请输入密码', trigger: 'blur' },
			{ min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
		],
	}

	const rules = isSignUp
		? {
				...baseRules,
				confirmPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
			}
		: baseRules

	return {
		formRef,
		form,
		rules,
		resetForm,
	}
}
