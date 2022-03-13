<template>
	<div class="card h-100">
		<h3 class="card-header">
			{{ project.name }}
		</h3>
		<div class="m-auto">
			<SpinningLoader v-if="!project.id" />
		</div>
		<div
			v-if="project.id"
			class="card-body"
		>
			<ul class="list-group">
				<li
					v-for="(value,title,idx) in titles"
					:key="idx"
					class="list-group-item d-flex justify-content-between align-items-center"
				>
					{{ title }}
					<span
						:class="{ 'badge-primary': hasValue(value) ,' badge-secondary': !hasValue(value) }"
						class="badge badge-pill font-lg"
					>{{ value.length }}</span>
				</li>
			</ul>
			<div class="text-right">
				<button
					@click="onProjectSplit()"
					class="btn btn-info mt-5 ml-auto shadow"
				>
					Split Project
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'SingleProject',
	props: {
		project: {
			type: Object,
			required: true
		}
	},
	emits: ['loaded'],
	computed: {
		titles () {
			const { stories, statements, nodes } = this.project
			return { stories, statements, nodes }
		}
	},
	mounted () {
		setTimeout(() => { this.$emit('loaded') }, 1000)
	},
	methods: {
		hasValue (value) {
			return value.length > 0
		},
		onProjectSplit () {
			this.$router.push({ name: 'project-split', params: { projectId: this.project.id } })
		}
	}
}
</script>

<style scoped>
li {
	font-size: 18px;
	text-transform: capitalize;
}

</style>
