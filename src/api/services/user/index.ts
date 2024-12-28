import { get, post } from '@/api/httpClient'

export const fetchUserLogin = (params: IUserLoginParams) =>
	post<{ token: string }>('/user/login', params)
