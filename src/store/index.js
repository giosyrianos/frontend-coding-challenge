import { createStore } from 'vuex'
import ProjectsDataService from '../services/ProjectsDataService'
// import { router } from '../router'

// import splitProjectsModule from './modules/splitProjects'

const store = createStore({
	state () {
		return {
			projectsList: []
		}
	},

	actions: {
		fetchProjectList ({ commit }) {
			ProjectsDataService.getAllProjects().then((listData) => {
				commit('SET_PROJECTS_LIST', listData.data)
			})
		}
	},
	mutations: {
		SET_PROJECTS_LIST (state, payload) {
			console.log(payload)
			state.projectsList = payload
		}
	},
	getters: {
		loadProjects: (state) => state.projectsList
	}

	// modules: {
	// 	splitProjects: splitProjectsModule
	// }
})

export default store
