import type { AxiosRequestConfig, AxiosResponse } from 'axios'

declare global {
	// 基础响应接口
	interface BaseResponse<T = any> {
		data: T
		message: string
		code: number
	}

	// 扩展的请求配置接口
	interface RequestConfig extends AxiosRequestConfig {
		cancelToken?: string
	}

	// 自定义响应类型
	type CustomResponse<T> = AxiosResponse<BaseResponse<T>>

	// API 错误类型
	interface ApiError {
		code: number
		message: string
		details?: any
	}
}
export {}
