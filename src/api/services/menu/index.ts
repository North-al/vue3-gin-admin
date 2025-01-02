import { get, post, put } from '@/api/httpClient'

// 获取菜单列表
export const fetchMenuList = () => get('/menu/list')

// 创建菜单
export const fetchCreateMenu = (data: any) => post('/menu/create', data)

// 更新菜单
export const fetchUpdateMenu = (data: any) => put('/menu/update', data)
