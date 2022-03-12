<template>
	<div>
		<ul class="list-group">
			<li
				v-for="project in projects"
				:key="project.id"
				class="list-group-item"
				role="button"
				:class="{'active': project.id === selectedProject.id}"
				@click="onProjectSelected(project.id)"
			>
				{{ project.name }}
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ProjectsList',
	props: {
		projects: {
			type: Array,
			required: true
		}
	},
	emits: ['selected'],
	computed: {
		selectedProject () {
			return this.$store.getters.loadSelectedProject
		}
	},
	methods: {
		onProjectSelected (projectId) {
			this.$emit('selected', projectId)
		}
	}
}
</script>
