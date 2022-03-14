import ProjectsDataService from '../../services/ProjectsDataService'
import router from '../../router'

export default {
	namespaced: true,
	state () {
		return {
			stories: [],
			statements: [],
			nodes: [],
			newProjects: []
		}
	},

	actions: {
		createNewProjects ({ commit }, newProjects) {
			const projectId = router.currentRoute.value.params.projectId
			ProjectsDataService.creatNewProjects(projectId, newProjects)
				.then((res) => {
					console.log(res)
				})
				.catch(error => console.log(error))
		}
	}
}
