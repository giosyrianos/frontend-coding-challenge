<template>
	<div>
		<ul class="list-group">
			<li
				v-for="project in projects"
				:key="project.id"
				class="list-group-item"
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
	methods: {
		onProjectSelected (projectId) {
			this.$emit('selected', projectId)
		}
	}
}
</script>
