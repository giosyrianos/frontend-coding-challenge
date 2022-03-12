import { createStore } from 'vuex'

// import splitProjectsModule from './modules/splitProjects'

const store = createStore({
	state () {
		return {
			projectsList: []
		}
	},

	actions: {},
	mutations: {},
	getters: {}

	// modules: {
	// 	splitProjects: splitProjectsModule
	// }
})

export default store
