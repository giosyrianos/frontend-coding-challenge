import http from '../http-common.js'

class ProjectsDataService {
	getAllProjects () {
		return http.get('/projects')
	}
}

export default new ProjectsDataService()
