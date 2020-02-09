<template>
	<v-col>
		<v-progress-linear v-if="isLoading" color="complementary" indeterminate />

		<v-treeview
			v-else
			:items="items"
			:open.sync="open"
			:active.sync="active"
			active-class="primary--text"
			class="transparent"
			open-on-click
			transition
			activatable
		>
			<template v-slot:label="{ item, active }">
				<v-icon v-if="!item.children.length" :color="active ? 'primary' : 'white'">table_chart</v-icon>
				{{ item.name }}
			</template>
		</v-treeview>
	</v-col>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { TABLES_LISTING } from '@/constants/router/routes-names';
import { mapState } from 'vuex';

@Component({
	computed: {
		...mapState({
			dataModels: (state: any) => state.dataModels.data
		})
	}
})
export default class DataModelTreeView extends Vue {
	private dataModels: any; // TODO: Type

	active: [] = [];
	open: [] = [];
	items: [] = [];
	isLoading: boolean = true;

	@Watch('active')
	onActiveChange(value) {
		if (!value.length) return;

		const id = value[0];
		this.$router.push({
			name: TABLES_LISTING,
			params: { projectId: id.split('/')[0], datasetId: id.split('/')[1] }
		});
	}

	mounted() {
		this.getDataModel();
	}

	getDataModel() {
		this.$store.dispatch('dataModels/fetchAndAdd', { limit: 0 }).then(() => {
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

				return { name: data.id, id: data.id, type: 'Project', children: subCollectionsFormatted };
			});

			this.items = dataModelsFormatted;
			this.isLoading = false;
		});
	}
}
</script>
