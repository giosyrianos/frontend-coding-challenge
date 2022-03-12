<template>
	<div
		v-if="loadedProjects.length"
		class="projects-container shadow-lg"
	>
		<ProjectsList
			:projects="loadedProjects"
			@selected="loadProjectDetails($event)"
		/>

		<div class="details-container">
			<SingleProject
				:project="loadedSelectedProject"
				@loaded="loadProjectDetails()"
			/>
		</div>
	</div>
</template>

<script>
import ProjectsList from '../components/Projects-list.vue'
import SingleProject from '../components/Single-project.vue'

export default {
	name: 'ProjectsHome',
	components: {
		ProjectsList,
		SingleProject
	},
	computed: {
		loadedProjects () {
			return this.$store.getters.loadProjects
		},
		loadedSelectedProject () {
			return this.$store.getters.loadSelectedProject
		}
	},
	mounted () {
		this.getProjects()
	},
	methods: {
		getProjects () {
			this.$store.dispatch('fetchProjectList')
		},
		loadProjectDetails (id) {
			const projectId = id || this.loadedProjects[0].id
			this.$store.dispatch('fetchSingleProject', projectId)
		},
	},
}
</script>

<style scoped>
.projects-container {
	display: grid;
	grid-template-columns: minmax(250px, 25%) 1fr;
}

</style>
