<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<listing-component
			:module-name="moduleName"
			:route-name="routeName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>
			<template v-slot:source="{ item: { source } }">
				{{ source.type === 'gcs' ? source.gcs_source_bucket : 'unknown' }}
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { STORAGE_TO_TABLES_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';

export default {
	name: 'storage-to-tables-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'storageToTablesConfs',
			overriddenColumns: ['id', 'source']
		};
	},
	computed: {
		routeName() {
			return STORAGE_TO_TABLES_CONFIGURATIONS_ITEM;
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
					text: 'Environment',
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
				{ text: 'Source Type', align: 'left', sortable: true, value: 'source.type' },
				{ text: 'Source Name', align: 'left', sortable: true, value: 'source' },
				{
					text: 'Destinations',
					align: 'left',
					sortable: true,
					value: 'destinations.length'
				},
				{
					text: 'Tables',
					align: 'left',
					sortable: true,
					value: 'destinations[0].tables.length'
				},
				{
					text: 'Status',
					align: 'left',
					sortable: true,
					value: 'activated'
				},
				{
					text: 'Actions',
					align: 'center',
					sortable: false,
					value: 'actions'
				}
			];
		}
	}
};
</script>
