<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="dag_execution_date"
			:sort-desc="true"
			show-airflow-action
		>
			<template v-slot:triggering_file="{ item: { id, triggering_file } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ triggering_file }}</span>
				</router-link>
			</template>

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
import DataManagementHeader from '../../../../components/data-workflows/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { RUNS } from '@/constants/data-workflows/status';
import { STORAGE_TO_STORAGE_RUNS_ITEM } from '@/constants/router/routes-names';
import { getStatusColor } from '@/util/data-workflows/run';
import {
	ACCOUNT,
	ACTIONS,
	CONFIGURATION_ID,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	STATUS,
	TRIGGERING_FILE
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'storage-to-storage-runs-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'storageToStorageRuns',
			overriddenColumns: ['triggering_file', 'status', 'dag_execution_date']
		};
	},
	methods: {
		getStatusColor(status) {
			return getStatusColor(status);
		}
	},
	computed: {
		listingType() {
			return RUNS;
		},
		routeName() {
			return STORAGE_TO_STORAGE_RUNS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, CONFIGURATION_ID, TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS];
		}
	}
};
</script>
