<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<listing-component
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="dag_execution_date"
			:sort-desc="true"
			show-airflow-action
		>
			<template v-slot:status="{ item: { status } }">
				<v-chip v-if="status" :color="getStatusColor(status)" text-color="white" small class="text-lowercase">
					{{ status }}
				</v-chip>
			</template>

			<template v-slot:dag_execution_date="{ item: { dag_execution_date } }">
				{{ dag_execution_date | moment('YYYY/MM/DD - HH:mm') }}
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/ListingComponent';

import TabsItemsMixin from '../tab-items';
import { getStatusColor } from '@/util/data-workflows/run';

export default {
	name: 'gbq-to-gcs-runs-listing',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'getGbqToGcsRuns',
			overriddenColumns: ['status', 'dag_execution_date']
		};
	},
	methods: {
		getStatusColor(status) {
			return getStatusColor(status);
		}
	},
	computed: {
		headers() {
			return [
				{
					text: 'Account ID',
					align: 'left',
					sortable: true,
					value: 'account'
				},
				{
					text: 'Environnement',
					align: 'left',
					sortable: true,
					value: 'environment'
				},
				{
					text: 'Destination Bucket',
					align: 'left',
					sortable: true,
					value: 'destination_bucket'
				},
				{
					text: 'Generated File',
					align: 'left',
					sortable: true,
					value: 'gcs_triggering_file'
				},
				{
					text: 'Status',
					align: 'left',
					sortable: true,
					value: 'status'
				},
				{
					text: 'Execution Date',
					align: 'left',
					sortable: true,
					value: 'dag_execution_date'
				},
				{
					text: 'Actions',
					align: 'center',
					value: 'actions',
					sortable: false
				}
			];
		}
	}
};
</script>
