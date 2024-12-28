import type { AxiosError, AxiosResponse } from 'axios'

export class ApiHandler {
	public static async handleResponse(response: AxiosResponse) {
		// 处理响应数据
		let data = response.data
		if (data.code === 200) {
			return data
		}

		return this.handleError(response.data)
	}

	public static async handleError(error: any) {
		// 更详细的错误处理
		const errorMessage = error.response?.data?.message || error.message || '请求错误'
		console.error(errorMessage)

		// 可以根据状态码处理不同情况
		if (error.response?.status === 401) {
			// 处理未授权情况，例如跳转到登录页
			// window.location.href = '/login'
		}

		return Promise.reject(error)
	}
}
