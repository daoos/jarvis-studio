<template>
	<div>
		<data-model-header title="Tables Listing" :table-items="tableItems" />

		<v-container fluid>
			<v-toolbar class="elevation-O" color="transparent">
				<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

				<v-spacer />

				<v-checkbox v-model="filterOnTimePartitioning" label="Time partitioning" hide-details />
				<v-progress-circular indeterminate size="20" color="primary" v-if="isLoading" class="ml-3" />
				<v-icon right @click="fetchTables" v-else>refresh</v-icon>
			</v-toolbar>

			<v-data-table
				:headers="headers"
				:items="items"
				:loading="isLoading"
				:search="search"
				:items-per-page="Number.POSITIVE_INFINITY"
				hide-default-footer
				class="elevation-1 mb-4"
			>
				<template v-slot:item.table_id="{ item }">
					<router-link :to="getTableViewLink(item.id)">{{ getTableName(item.table_id) }}</router-link>
				</template>

				<template v-slot:item.numRows="{ item }">
					<v-progress-linear :value="getPropertyPercent('numRows', item.numRows)" height="25">
						<strong>{{ getPropertyPercent('numRows', item.numRows) }}%</strong>
					</v-progress-linear>
				</template>

				<template v-slot:item.numBytes="{ item }">
					<v-progress-linear :value="getPropertyPercent('numBytes', item.numBytes)" height="25">
						<strong>{{ getPropertyPercent('numBytes', item.numBytes) }}%</strong>
					</v-progress-linear>
				</template>

				<template v-slot:item.time_partitioned="{ item }">
					<span>{{ item.timePartitioning !== undefined }}</span>
				</template>

				<template v-slot:item.refreshed_timestamp="{ item }">
					<v-chip :color="getRefreshedTimestampColor(item.refreshed_timestamp)" text-color="white" small>
						{{ item.refreshed_timestamp | moment('YYYY/MM/DD - HH:mm:ss') }}
					</v-chip>
				</template>

				<template v-slot:item.query="{ item }">
					<v-btn small color="primary" @click="openInBigQuery(item.id)">Query</v-btn>
				</template>
			</v-data-table>
		</v-container>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import moment from 'moment';

import DataModelHeader from '@/components/data-models/DataModelHeader.vue';

import { getBigQueryURL } from '@/util/data-models';
import { DATA_TABLE_DETAILS } from '@/constants/router/routes-names';

@Component({
	components: { DataModelHeader }
})
export default class TablesListing extends Vue {
	isLoading: boolean = false;
	search: string = '';
	filterOnTimePartitioning: boolean = false;
	test: number = 0;

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
		let color = 'green';

		const now = moment(new Date());
		const duration = moment.duration(now.diff(refreshedTimestamp)).asHours();
		const hoursFromNow = Math.round((duration + Number.EPSILON) * 100) / 100;

		if (hoursFromNow >= 26 && hoursFromNow < 36) color = 'orange';
		else if (hoursFromNow >= 36 && hoursFromNow < 49) color = 'red';
		else if (hoursFromNow >= 49) color = 'black';

		return color;
	}

	openInBigQuery(tableId: string) {
		window.open(getBigQueryURL(this.projectId, this.datasetId, tableId), '_blank');
	}

	getPropertyPercent(key: string, value: number) {
		const maxPropertyValue = Math.max.apply(
			Math,
			Object.values(this.tables).map(table => table[key])
		);
		const percent = (value * 100) / maxPropertyValue;

		return Math.round((percent + Number.EPSILON) * 100) / 100;
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

	get items() {
		return this.filterOnTimePartitioning ? this.timePartitioningTables : Object.values(this.tables);
	}

	get timePartitioningTables() {
		return Object.values(this.tables).filter(table => table.timePartitioning);
	}

	get datasetId() {
		return this.$route.params.datasetId;
	}

	get projectId() {
		return this.$route.params.projectId;
	}
}
</script>

<style lang="scss">
.v-input__control {
	.v-input__slot {
		margin: 0;
	}
}
</style>
