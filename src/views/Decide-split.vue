<template>
	<div v-if="stories">
		this. is decide split
		{{ Object.keys(stories) }}
		<button @click="getRelation()">
			click
		</button>
	</div>
</template>

<script>
export default {
	name: 'DecideSplit',
	computed: {
		stories () { return this.$store.getters['splitProjects/loadStories'] }
	},
	mounted () {
		this.getProjectDependencies()
		// this.getRelation()
	},
	methods: {
		getProjectDependencies () {
			this.$store.dispatch('splitProjects/fetchProjectDependencies')
		},
		getRelation () {
			let jointArray = []
			Object.values(this.stories).forEach(array => {
				jointArray = [...jointArray, ...array]
			})
			console.log(jointArray)
			const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index)
			console.log(uniqueArray)
		},
		relatedStories (arr1, arr2) {
			console.log(arr1.some(item => arr2.includes(item)))
		},
	}
}
</script>
