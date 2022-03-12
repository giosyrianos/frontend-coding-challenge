import http from '../http-common.js'

class ProjectsDataService {
	getAllProjects () {
		return http.get('/projects')
	}

	getSingleProject (id) {
		return http.get(`/projects/${id}`)
	}
}

export default new ProjectsDataService()
