import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		alias: '/projects',
		name: 'projects',
		component: () => import('./views/Projects-home.vue')
	},
	{
		path: '/project/:projectId',
		alias: '/single-project',
		name: 'project-split',
		component: () => import('./views/Project-split.vue')
	},
	{
		path: '/:catchAll(.*)',
		redirect: '/'
	}

]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
