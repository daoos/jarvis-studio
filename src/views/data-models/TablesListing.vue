<template>
	<div>
		<data-model-header title="Tables Listing" :table-items="tableItems" />

		<v-container fluid>
			<v-data-table :loading="isLoading" :headers="headers" :items="Object.values(tables)" class="elevation-1">
				<template v-slot:item.table_id="{ item }">
					<router-link :to="getTableViewLink(item.id)">{{ item.table_id }}</router-link>
				</template>

				<template v-slot:item.query="{ item }">
					<v-btn color="primary" @click="openInBigQuery(item.table_id)">Query</v-btn>
				</template>
			</v-data-table>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';

import DataModelHeader from '@/components/data-models/DataModelHeader.vue';

import { getQueryURL } from '@/util/data-models';
import { DATA_TABLE_DETAILS } from '@/constants/router/routes-names';

@Component({
	components: { DataModelHeader }
})
export default class TablesListing extends Vue {
	isLoading: boolean = false;

	@State(state => state.dataTables.data) tables!: Object;

	activated() {
		this.fetchTables();
	}

	fetchTables() {
		this.$store.dispatch('dataTables/closeDBChannel', { clearModule: true });
		this.isLoading = true;

		return this.$store
			.dispatch('dataTables/fetchAndAdd', {
				projectId: this.projectId,
				datasetId: this.datasetId,
				limit: 0
			})
			.then(() => {
				this.isLoading = false;
			});
	}

	getTableViewLink(tableId: string) {
		return {
			name: DATA_TABLE_DETAILS,
			params: { projectId: this.projectId, datasetId: this.datasetId, tableId }
		};
	}

	openInBigQuery(tableId: string) {
		window.open(getQueryURL(this.projectId, this.datasetId, tableId), '_blank');
	}

	get headers() {
		return [
			{ text: 'Account', value: 'account' },
			{ text: 'Table Name', value: 'table_id' }, // TODO: Add link
			{ text: 'Table Type', value: 'type' },
			{ text: 'Row Number', value: 'numRows' },
			{ text: 'Table Size', value: 'numBytes' },
			{ text: 'Location', value: 'location' },
			{ text: 'Time Partitioned', value: '' },
			{ text: 'Last Update', value: 'lastModifiedTime' },
			{ text: 'Query', value: 'query' }
		];
	}

	get tableItems() {
		return [
			{
				text: this.projectId,
				disabled: true,
				href: ''
			},
			{
				text: this.datasetId,
				disabled: true,
				href: ''
			}
		];
	}

	get datasetId() {
		return this.$route.params.datasetId;
	}

	get projectId() {
		return this.$route.params.projectId;
	}
}
</script>
