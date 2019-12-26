<template>
	<v-col>
		<v-progress-linear v-if="isLoading" color="complementary" indeterminate />

		<v-treeview
			v-else
			:items="items"
			:open.sync="open"
			:active.sync="active"
			:load-children="fetchTables"
			open-on-click
			transition
			activatable
			active-class="primary--text"
			class="transparent"
		>
			<template v-slot:prepend="{ item, active }">
				<v-icon v-if="!item.children" :color="active ? 'primary' : 'white'">table_chart</v-icon>
			</template>
		</v-treeview>
	</v-col>
</template>

<script>
import { DATA_TABLE_DETAILS } from '@/constants/router/routes-names';
import { mapState } from 'vuex';
import store from '@/store';

export default {
	name: 'data-model-tree-view',
	data: () => ({
		active: [],
		open: [],
		items: [],
		isLoading: true
	}),
	mounted() {
		this.getDataModel();
	},
	methods: {
		getDataModel() {
			this.$store
				.dispatch('dataModels/fetchAndAdd', { limit: 0 })
				.then(() => {
					const dataModelsValues = Object.values(this.dataModels);
					const dataModelsFormatted = dataModelsValues.map(data => {
						let subCollectionsFormatted = [];
						const projectId = data.id;

						data.sub_collections.forEach(function(dataset) {
							// add name, project id (used to fetch dataTable Later), type (to select the icon in the treeview),
							// empty children to trigger the fetchTables function when necessary
							subCollectionsFormatted.push({
								id: projectId.concat('/', dataset),
								name: dataset,
								projectId: projectId,
								type: 'dataset',
								children: []
							});
						});

						return {
							name: data.id,
							id: data.id,
							type: 'Project',
							children: subCollectionsFormatted
						};
					});

					this.isLoading = false;
					this.items = dataModelsFormatted;
				})
				.catch(console.error);
		},
		fetchTables(item) {
			store.dispatch('dataTables/closeDBChannel', { clearModule: true });

			return this.$store
				.dispatch('dataTables/fetchAndAdd', {
					projectId: item.projectId,
					datasetId: item.name,
					limit: 0
				})
				.then(querySnapshot => {
					const dataTablesFormatted = querySnapshot.docs.map(data => ({
						id: item.projectId.concat('/', item.name, '/', data.id),
						name: data.id,
						type: 'table'
					}));

					item.children.push(...dataTablesFormatted);
				})
				.catch(console.error);
		}
	},
	computed: {
		...mapState({
			dataModels: state => state.dataModels.data
		})
	},
	watch: {
		active: function() {
			if (!this.active.length) return;

			const id = this.active[0];
			this.$router.push({
				name: DATA_TABLE_DETAILS,
				params: { projectId: id.split('/')[0], datasetId: id.split('/')[1], tableId: id.split('/')[2] }
			});
		}
	}
};
</script>

<style>
/* https://stackoverflow.com/questions/54119491/vuetify-treeview-cant-break-text-using-css/54119821#54119821 */
/* https://github.com/vuetifyjs/vuetify/issues/7177 */
.v-treeview-node__label {
	flex-shrink: 1;
	word-break: break-all;
	font-size: 14px;
}
.v-treeview-node__root {
	height: auto;
}
.v-treeview-node--leaf {
	margin-left: 25px;
}
</style>
