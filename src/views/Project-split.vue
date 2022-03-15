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
			<div class="d-flex justify-content-between">
				<h3>{{ currentProject.name }}</h3>
				<button
					v-show="selectedStories.length > 0"
					class="btn btn-sm btn-primary"
					@click="showModal()"
				>
					New Project
				</button>
			</div>
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
					<button
						v-if="selectedStories.length > 0"
						class="btn btn-outline-dark btn-sm ml-auto"
						@click="clearStories()"
					>
						Clear
					</button>
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
						ref="storiesList"
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
					<SelectionList :project-property="nodes" />
				</div>
			</div>
		</div>
	</div>
	<div
		v-if="newProjects.length > 0"
		class="new-projects-container d-flex p-4 shadow-lg w-100"
	>
		<div class="btn-container">
			<button
				class="btn btn-success my-auto"
				@click="submitNewProjects()"
			>
				Split Project
			</button>
		</div>
		<NewProjectCard
			v-for="project in newProjects"
			:key="project.name"
			:project-name="project.name"
			:stories="project.stories"
			@delete="removeProject(project)"
		/>
	</div>
	<ModalDialogue
		v-show="isModalVisible"
		@close="closeModal"
	>
		<template #header>
			<h3>{{ modalHeader }}</h3>
		</template>
		<template #body>
			<div>
				<form>
					<div class="form-group">
						<label for="exampleInputEmail1">Project name</label>
						<input
							v-model="projectName"
							class="form-control"
							placeholder="Enter project name"
						>
						<small
							id="emailHelp"
							class="form-text text-muted"
						>Project name must be unique</small>
					</div>
				</form>
				<div>
					<h4>Stories</h4>
					<span
						v-for="story in selectedStories"
						:key="story"
						class="badge badge-primary badge-pill mx-1"
					>{{ story }}</span>
				</div>
			</div>
		</template>
		<template #footer>
			<button
				v-show="projectName.length > 1"
				type="button"
				class="btn btn-success"
				aria-label="Close modal"
				:class="{'disabled': projectName.length < 1 }"
				@click="saveNewProject()"
			>
				Save Project
			</button>
		</template>
	</ModalDialogue>
</template>

<script>
import SelectionList from '../components/Selection-list.vue'
import NewProjectCard from '../components/New-project-card.vue'

export default {
	name: 'ProjectSplit',
	components: {
		SelectionList,
		NewProjectCard,
	},
	data: () => {
		return {
			selectedStories: [],
			newProjects: [],
			isModalVisible: false,
			modalHeader: 'Create Project',
			projectName: ''
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
		submitNewProjects () {
			this.$store.dispatch('splitProjects/createNewProjects', this.newProjects)
		},
		loadProject () {
			const projectId = this.currentProject.id || this.$route.params.projectId
			this.$store.dispatch('fetchSingleProject', projectId)
		},
		updateStoryList (stories) {
			this.selectedStories = stories
		},
		showModal () {
			this.isModalVisible = true
		},
		closeModal () {
			this.isModalVisible = false
		},
		saveNewProject () {
			this.newProjects.push({
				name: this.projectName,
				stories: this.selectedStories
			})
			this.projectName = ''
			this.clearStories()
			this.closeModal()
		},
		removeProject (project) {
			const index = this.newProjects.findIndex(proj => {
				return proj.name === project.name
			})
			this.newProjects.splice(index, 1)
		},
		clearStories () {
			this.selectedStories = []
			this.$refs.storiesList.clearSelection()
		}
	},
}
</script>
