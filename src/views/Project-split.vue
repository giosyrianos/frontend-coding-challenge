<template>
	<div
		v-if="!currentProject.id"
		class="d-flex flex-column justify-content-center align-items-center"
	>
		<h1 class="danger">
			404
		</h1>
		<h4>Project Not found</h4>
		<button
			class="btn btn-primary"
			@click="$router.push('/')"
		>
			Back to list
		</button>
	</div>
	<div
		v-else
		class="card w-100"
	>
		<div class="card-header">
			<h3>{{ currentProject.name }}</h3>
			<p>{{ selectedStories }}</p>
		</div>
		<div class="card-body">
			<nav>
				<div
					id="nav-tab"
					class="nav nav-tabs"
					role="tablist"
				>
					<a
						id="nav-stories-tab"
						:class="{ disabled: stories.length === 0 }"
						class="nav-item nav-link active"
						data-toggle="tab"
						role="button"
						href="#nav-stories"
						aria-controls="nav-stories"
						aria-selected="true"
					>Stories
						<span
							v-if="stories.length"
							class="badge badge-primary badge-pill"
						>{{ stories.length }}</span>
					</a>
					<a
						id="nav-statements-tab"
						:class="{ disabled: statements.length === 0 }"
						class="nav-item nav-link"
						data-toggle="tab"
						role="button"
						href="#nav-statements"
						aria-controls="nav-statements"
						aria-selected="false"
					>Statements
						<span
							v-if="statements.length"
							class="badge badge-primary badge-pill"
						>{{ statements.length }}</span>
					</a>
					<a
						id="nav-nodes-tab"
						:class="{ disabled: nodes.length === 0 }"
						class="nav-item nav-link"
						data-toggle="tab"
						role="button"
						href="#nav-nodes"
						aria-controls="nav-nodes"
						aria-selected="false"
					>Nodes
						<span
							v-if="nodes.length"
							class="badge badge-primary badge-pill"
						>{{
							nodes.length
						}}</span>
					</a>
				</div>
			</nav>
			<div
				id="nav-tabContent"
				class="tab-content"
			>
				<div
					id="nav-stories"
					class="tab-pane fade show active"
					role="tabpanel"
					aria-labelledby="nav-stories-tab"
				>
					<SelectionList
						:project-property="stories"
						:has-selection="true"
						@list-updated="updateStoryList($event)"
					/>
				</div>
				<div
					id="nav-statements"
					class="tab-pane fade"
					role="tabpanel"
					aria-labelledby="nav-statements-tab"
				>
					<SelectionList
						:project-property="statements"
					/>
				</div>
				<div
					id="nav-nodes"
					class="tab-pane fade"
					role="tabpanel"
					aria-labelledby="nav-nodes-tab"
				>
					<SelectionList
						:project-property="nodes"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SelectionList from '../components/Selection-list.vue'

export default {
	name: 'ProjectSplit',
	components: {
		SelectionList
	},
	data: () => {
		return {
			selectedStories: [],
			newProjects: []
		}
	},
	computed: {
		currentProject () {
			return this.$store.getters.loadSelectedProject
		},
		stories () {
			return this.$store.getters.selectedProjectStories
		},
		statements () {
			return this.$store.getters.selectedProjectStatements
		},
		nodes () {
			return this.$store.getters.selectedProjectNodes
		},
	},
	mounted () {
		this.loadProject()
	},
	methods: {
		// loadProjectDependencies () {
		// 	this.$store.dispatch('splitProjects/fetchProjectDependencies')
		// }
		loadProject () {
			const projectId = this.currentProject.id || this.$route.params.projectId
			this.$store.dispatch('fetchSingleProject', projectId)
		},
		updateStoryList (stories) {
			this.selectedStories = stories
		}
	},
}
</script>
