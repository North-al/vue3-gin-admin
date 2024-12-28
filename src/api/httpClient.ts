import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const httpClient: AxiosInstance = axios.create({
	baseURL: 'http://localhost:3333',
	timeout: 30 * 1000,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
})

// 请求取消管理器
const requestControllers = new Map<string, AbortController>()

httpClient.interceptors.request.use(
	async (config: InternalAxiosRequestConfig) => {
		const url = config.url || ''

		// 如果存在相同 URL 的请求，则取消之前的请求
		if (requestControllers.has(url)) {
			const previousController = requestControllers.get(url)
			previousController?.abort()
			requestControllers.delete(url)
		}

		// 为每个请求创建新的 AbortController
		const controller = new AbortController()
		requestControllers.set(config.url || '', controller)
		config.signal = controller.signal

		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => Promise.reject(error),
)

// 响应拦截器
httpClient.interceptors.response.use(
	(response: AxiosResponse) => {
		const url = response.config.url || ''

		// 请求完成后删除对应的 AbortController
		if (requestControllers.has(url)) {
			requestControllers.delete(url)
		}

		// 直接返回响应数据
		return response.data
	},
	(error) => {
		const url = error.config?.url || ''

		// 请求失败后删除对应的 AbortController
		if (requestControllers.has(url)) {
			requestControllers.delete(url)
		}

		// 更详细的错误处理
		const errorMessage = error.response?.data?.message || error.message || '请求错误'
		console.error(errorMessage)

		// 可以根据状态码处理不同情况
		if (error.response?.status === 401) {
			// 处理未授权情况，例如跳转到登录页
			// window.location.href = '/login'
		}

		return Promise.reject(error)
	},
)

// 取消请求的工具函数
export function cancelRequest(url: string): void {
	const controller = requestControllers.get(url)
	if (controller) {
		controller.abort()
		requestControllers.delete(url)
	}
}

export const get = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
	const response = await httpClient.get<T>(url, { params })
	return response.data
}

export const post = async <T>(url: string, data?: any): Promise<T> => {
	const response = await httpClient.post<T>(url, data)
	return response.data
}

export const remove = async <T>(url: string, params?: Record<string, any>): Promise<T> => {
	const response = await httpClient.delete<T>(url, { params })
	return response.data
}

export const postForm = async <T>(url: string, formData: FormData): Promise<T> => {
	const response = await httpClient.post<T>(url, formData, {
		headers: { 'Content-Type': 'multipart/form-data' },
	})
	return response.data
}

export const put = async <T>(url: string, data?: any): Promise<T> => {
	const response = await httpClient.put<T>(url, data)
	return response.data
}

export default httpClient
