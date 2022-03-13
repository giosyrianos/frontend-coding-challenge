import { createStore } from 'vuex'
import ProjectsDataService from '../services/ProjectsDataService'
// import { router } from '../router'

import splitProjectsModule from './modules/split-project'

const store = createStore({
	state () {
		return {
			projectsList: [],
			selectedProject: {}
		}
	},

	actions: {

		fetchProjectList ({ commit }) {
			ProjectsDataService.getAllProjects()
				.then((listData) => {
					commit('SET_PROJECTS_LIST', listData.data)
				})
				.catch(error => console.log(error))
		},

		fetchSingleProject ({ commit }, projectId) {
			ProjectsDataService.getSingleProject(projectId)
				.then((projectData) => {
					commit('SET_SELECTED_PROJECT', projectData.data)
				})
				.catch(error => console.log(error))
		}

	},

	mutations: {

		SET_PROJECTS_LIST (state, payload) {
			state.projectsList = payload
		},

		SET_SELECTED_PROJECT (state, payload) {
			state.selectedProject = payload
		}

	},

	getters: {

		loadProjects: (state) => state.projectsList,
		loadSelectedProject: (state) => state.selectedProject,
		selectedProjectStories: (state) => state.selectedProject.stories,
		selectedProjectStatements: (state) => state.selectedProject.statements,
		selectedProjectNodes: (state) => state.selectedProject.nodes
	},

	modules: {
		splitProjects: splitProjectsModule
	}
})

export default store
