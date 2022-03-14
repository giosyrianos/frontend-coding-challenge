<template>
	<div class="card mx-1">
		<div class="card-header">
			{{ projectName }}
		</div>
		<div class="card-body text-left">
			<ul class="p-0">
				<li
					v-for="story in stories"
					:key="story"
					class="text-left badge badge-primary badge-pill mx-1"
				>
					{{ story }}
				</li>
			</ul>
			<button
				class="btn btn-danger"
				@click="$emit('delete')"
			>
				Delete
			</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NewProjectCard',
	props: {
		projectName: {
			type: String,
			required: true
		},
		stories: {
			type: Array,
			required: true
		}
	},
	emits: ['delete']
}
</script>

<style scoped>
	.card {
		min-width: 120px;
	}
</style>
