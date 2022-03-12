<template>
	<div>
		<ul class="list-group">
			<li
				v-for="project in loadedProjects"
				:key="project.id"
				class="list-group-item"
			>
				{{ project.name }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ProjectsList',
	computed: {
		loadedProjects () {
			return this.$store.getters.loadProjects
		}
	},
	mounted () {
		this.getProjects()
	},
	methods: {
		getProjects () {
			this.$store.dispatch('fetchProjectList')
		}
	}
}
</script>
