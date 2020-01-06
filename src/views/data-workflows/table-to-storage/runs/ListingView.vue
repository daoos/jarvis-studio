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
			<template v-slot:firestore_conf_doc_id="{ item: { id, firestore_conf_doc_id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ firestore_conf_doc_id }}</span>
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
import DataManagementHeader from '../../../../components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { RUNS } from '@/constants/data-workflows/status';
import { TABLE_TO_STORAGE_RUNS_ITEM } from '@/constants/router/routes-names';
import { getStatusColor } from '@/util/data-workflows/run';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	DESTINATION_BUCKET,
	ENVIRONMENT,
	FIRESTORE_CONF_DOC_ID,
	OUTPUT_FILENAME,
	STATUS
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'table-to-storage-runs-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'tableToStorageRuns',
			overriddenColumns: ['firestore_conf_doc_id', 'status', 'dag_execution_date']
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
			return TABLE_TO_STORAGE_RUNS_ITEM;
		},
		headers() {
			return [
				ACCOUNT,
				ENVIRONMENT,
				FIRESTORE_CONF_DOC_ID,
				DESTINATION_BUCKET,
				OUTPUT_FILENAME,
				STATUS,
				DAG_EXECUTION_DATE,
				ACTIONS
			];
		}
	}
};
</script>
