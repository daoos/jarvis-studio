<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<listing-component :module-name="moduleName" :route-name="routeName" :headers="headers" />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { STORAGE_TO_TABLES_RUNS_ITEM } from '@/constants/router/routes-names';

export default {
	name: 'storage-to-tables-runs-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'getGbqToGcsConfs'
		};
	},
	computed: {
		routeName() {
			return STORAGE_TO_TABLES_RUNS_ITEM;
		},
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
					text: 'Configuration id',
					align: 'left',
					sortable: true,
					value: 'id'
				},
				{
					text: 'BQ Project Id',
					align: 'left',
					sortable: true,
					value: 'gcp_project'
				},
				{
					text: 'Destination Bucket',
					align: 'left',
					sortable: true,
					value: 'gcs_dest_bucket'
				},
				{
					text: 'Destination Prefix',
					align: 'left',
					sortable: true,
					value: 'gcs_dest_prefix'
				},
				{
					text: 'Status',
					align: 'left',
					sortable: true,
					value: 'activated'
				},
				{ text: 'Actions', align: 'center', value: 'actions', sortable: false }
			];
		}
	}
};
</script>
