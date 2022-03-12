<template>
	<div class="projects-container">
		<ProjectsList
			:projects="loadedProjects"
			@selected="loadProjectDetails($event)"
		/>

		<div class="details-container center-all">
			<SpinningLoader />
		</div>
	</div>
</template>

<script>
import ProjectsList from '../components/Projects-list.vue'

export default {
	name: 'ProjectsHome',
	components: {
		ProjectsList,
	},
	computed: {
		loadedProjects () {
			return this.$store.getters.loadProjects
		},
	},
	mounted () {
		this.getProjects()
	},
	methods: {
		getProjects () {
			this.$store.dispatch('fetchProjectList')
		},
		loadProjectDetails (id) {
			console.log(id)
		},
	},
}
</script>

<style>
.projects-container {
	border: 1px solid rgb(65, 64, 64);
	display: grid;
	grid-template-columns: minmax(250px, 25%) 1fr;
}

.center-all {
	display: grid;
	place-items: center;
}
</style>
