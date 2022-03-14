<template>
	<div class="list-container">
		<ul class="list-group">
			<li
				v-for="item in projectProperty"
				:key="item.id"
				class="list-group-item"
				:class="{'list-group-item-success': isSelected(item.id), 'selectable': hasSelection
				}"
				@click="onItemClicked(item.id)"
			>
				<ul>
					<li
						v-for="(property,name, index) in item"
						:key="index"
					>
						{{ name }}: {{ property }}
					</li>
				</ul>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'SelectionList',
	props: {
		projectProperty: {
			type: Array,
			required: true
		},
		hasSelection: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	emits: ['list-updated'],
	data: () => {
		return {
			selectedItems: []
		}
	},
	methods: {
		isSelected (id) {
			return this.selectedItems.includes(id)
		},
		onItemClicked (id) {
			if (!this.hasSelection) {
				return
			}
			const included = this.selectedItems.includes(id)
			if (included) {
				const itemIndex = this.selectedItems.indexOf(id)
				this.selectedItems.splice(itemIndex, 1)
			} else {
				this.selectedItems.push(id)
			}
			this.$emit('list-updated', this.selectedItems)
		},
		clearSelection () {
			this.selectedItems = []
			this.$emit('list-updated', this.selectedItems)
		}
	}
}
</script>

<style scoped>

.list-container {
	max-height: 50vh;
	overflow-y: auto ;
}
.selectable:hover {
	cursor: pointer;
	box-shadow: inset 0 -5px 3px -3px #155724,inset 0 5px 3px -3px #155724;
}

</style>
