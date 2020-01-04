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
import { mapState, mapGetters } from 'vuex';
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
			let promises = [];

			this.getUserAccounts.forEach(account => {
				promises.push(this.$store.dispatch('dataModels/fetchById', account.dlk_gcp_id_project));
			});

			Promise.all(promises).then(data => {
				this.items = data.map(item => {
					let children = [];
					const projectId = item.id;

					item.sub_collections.forEach(docId => {
						children.push({
							id: `${projectId}/${docId}`,
							name: docId,
							projectId: projectId,
							type: 'dataset',
							children: []
						});
					});

					return {
						name: item.id,
						id: item.id,
						type: 'Project',
						children
					};
				});

				this.isLoading = false;
			});
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
		}),
		...mapGetters(['getUserAccounts'])
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
