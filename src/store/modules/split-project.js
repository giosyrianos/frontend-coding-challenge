import ProjectsDataService from '../../services/ProjectsDataService'
import router from '../../router'

export default {
	namespaced: true,
	state () {
		return {
			stories: [],
			statements: [],
			nodes: [],
			newProjects: [],
			selectedProject: {}
		}
	},

	actions: {
		createNewProjects ({ commit }, newProjects) {
			const projectId = router.currentRoute.value.params.projectId
			ProjectsDataService.creatNewProjects(projectId, newProjects)
				.then((res) => {
					router.push('/')
				})
				.catch(error => console.log(error))
		},
		fetchProjectDependencies ({ commit }) {
			const projectId = router.currentRoute.value.params.projectId
			ProjectsDataService.getAllDependencies(projectId)
				.then((dependencies) => {
					console.log(dependencies.data)
					commit('SET_SELECTED_PROJECT', dependencies.data)
				})
		}
	},

	mutations: {
		SET_SELECTED_PROJECT (state, payload) {
			state.selectedProject = payload
		}
	},

	getters: {
		loadStories: state => state.selectedProject.stories,
		loadAlways: state => state.selectedProject.always,
		loadUnused: state => state.selectedProject.unused
	}
}
