<template>
	<div>
		<data-model-header title="Tables Listing" :table-items="tableItems" />

		<v-container fluid>
			<v-toolbar class="elevation-O" color="transparent">
				<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

				<v-spacer />

				<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" />
				<v-icon right @click="fetchTables" v-else>refresh</v-icon>
			</v-toolbar>

			<v-data-table
				:headers="headers"
				:items="Object.values(tables)"
				:loading="isLoading"
				:search="search"
				class="elevation-1"
			>
				<template v-slot:item.table_id="{ item }">
					<router-link :to="getTableViewLink(item.id)">{{ getTableName(item.table_id) }}</router-link>
				</template>

				<template v-slot:item.time_partitioned="{ item }">
					<p>{{ item.id }}</p>
				</template>

				<template v-slot:item.refreshed_timestamp="{ item }">
					<v-chip :color="getRefreshedTimestampColor(item.refreshed_timestamp)" text-color="white" small>
						{{ item.refreshed_timestamp | moment('YYYY/MM/DD - HH:mm:ss') }}
					</v-chip>
				</template>

				<template v-slot:item.query="{ item }">
					<v-btn small color="primary" @click="openInBigQuery(item.table_id)">Query</v-btn>
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
	search: string = '';

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

	getTableName(tableId: string) {
		const splitId = tableId.split('.');
		return splitId[splitId.length - 1];
	}

	getRefreshedTimestampColor(refreshedTimestamp: string) {
		/**
		 * TODO: Add color
		 * Lower than 26 hours => green
		 * Between than 26 hours and 36 hours => orange
		 * More than 36 hours => red
		 * More than 49 hours => black
		 */
		return 'green';
	}

	openInBigQuery(tableId: string) {
		window.open(getQueryURL(this.projectId, this.datasetId, tableId), '_blank');
	}

	get headers() {
		return [
			{ text: 'Account', value: 'account' },
			{ text: 'Table Name', value: 'table_id' },
			{ text: 'Table Type', value: 'type' },
			{ text: 'Row Number', value: 'numRows' },
			{ text: 'Table Size', value: 'numBytes' },
			{ text: 'Location', value: 'location' },
			{ text: 'Time Partitioned', value: 'time_partitioned' },
			{ text: 'Last Update', value: 'refreshed_timestamp' },
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
