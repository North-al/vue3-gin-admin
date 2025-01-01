import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/index.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			component: Layout,
			redirect: '/home',
			children: [
				{
					path: '/home',
					name: 'home',
					component: () => import('../pages/HomeView.vue'),
				},
			],
		},
		{
			path: '/system',
			name: 'System',
			redirect: '/system/menu',
			component: Layout,
			children: [
				{
					path: '/system/menu',
					name: 'SystemMenu',
					component: () => import('../pages/System/Menu/index.vue'),
				},
			],
		},
		{
			path: '/signin',
			component: () => import('@/pages/Auth/SignIn.vue'),
		},
		{
			path: '/signup',
			component: () => import('@/pages/Auth/SignUp.vue'),
		},
	],
})

export default router
