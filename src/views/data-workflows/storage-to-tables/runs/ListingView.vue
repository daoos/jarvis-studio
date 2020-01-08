<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:id="{ item: { id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>

			<template v-slot:configuration_context.source="{ item: { configuration_context: { source } } }">
				{{ source ? (source.type === 'gcs' ? source.gcs_source_bucket : source.sftp_host) : 'waiting...' }}
			</template>

			<template v-slot:dag_execution_date="{ item: { dag_execution_date } }">
				{{ dag_execution_date | moment('YYYY/MM/DD - HH:mm') }}
			</template>

			<template v-slot:status="{ item: { status } }">
				<v-chip :color="getStatusColor(status)" text-color="white" small class="text-lowercase">
					{{ status }}
				</v-chip>
			</template>
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import { RunStatus } from '@/types';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';
import { getStatusColor } from '@/util/data-workflows/run';

import HeaderInfosMixin from '../header-infos';

import { RUNS } from '@/constants/data-workflows/status';
import { STORAGE_TO_TABLES_RUNS_ITEM } from '@/constants/router/routes-names';

@Component({
	components: { DataManagementHeader, ListingComponent }
})
export default class StorageToTablesRunsListingView extends Mixins(HeaderInfosMixin) {
	moduleName: string = 'storageToTablesRuns';
	overriddenColumns: string[] = ['id', 'configuration_context.source', 'dag_execution_date', 'status'];

	getStatusColor(status: RunStatus) {
		return getStatusColor(status);
	}

	get listingType() {
		return RUNS;
	}

	get routeName() {
		return STORAGE_TO_TABLES_RUNS_ITEM;
	}

	get headers() {
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
				text: 'Triggering File',
				align: 'left',
				sortable: true,
				value: 'id'
			},
			{
				text: 'Source Storage',
				align: 'left',
				sortable: true,
				value: 'configuration_context.source'
			},
			{
				text: 'Destinations',
				align: 'left',
				sortable: true,
				value: 'configuration_context.destinations.length'
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
				sortable: false,
				value: 'actions'
			}
		];
	}
}
</script>
