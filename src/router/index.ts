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
			path: '/about',
			name: 'about',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () => import('../pages/AboutView.vue'),
		},
        {
            path: '/signin',
            component: () => import('@/pages/Auth/SignIn.vue')
          },
          {
            path: '/signup',
            component: () => import('@/pages/Auth/SignUp.vue')
          }
	],
})

export default router
