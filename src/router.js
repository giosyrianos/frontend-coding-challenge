import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
	path: '/',
	alias: '/projects',
	name: 'projects',
	component: () => import('./views/Projects-home.vue')
}]

const router = createRouter({
	history: createWebHistory(),
	routes
})

export default router
