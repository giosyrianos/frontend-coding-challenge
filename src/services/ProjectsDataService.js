import http from '../http-common.js'

class ProjectsDataService {
	getAllProjects () {
		return http.get('/projects')
	}

	getSingleProject (id) {
		return http.get(`/projects/${id}`)
	}

	creatNewProjects (id, projects) {
		return http.post(`/projects/${id}/split`, projects)
	}

	getAllDependencies (id) {
		return http.get(`projects/${id}/dependencies`)
	}
}

export default new ProjectsDataService()
