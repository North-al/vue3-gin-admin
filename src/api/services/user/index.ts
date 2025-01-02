import { get, post } from '@/api/httpClient'

export const fetchUserLogin = (params: IUserLoginParams) =>
	post<{ token: string }>('/user/login', params)

export const fetchUserRegister = (params: IUserRegisterParams) => post('/user/register', params)
