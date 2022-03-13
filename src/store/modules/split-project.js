// import ProjectsDataService from '../../services/ProjectsDataService'
import router from '../../router'

export default {
	namespaced: true,
	state () {
		return {
			stories: [],
			statements: [],
			nodes: []
		}
	},

	actions: {
		fetchProjectDependencies () {
			const projectId = router.currentRoute.value.params.projectId
			console.log(projectId)
			// ProjectsDataService.getEntireProject()
		}
	}
}
