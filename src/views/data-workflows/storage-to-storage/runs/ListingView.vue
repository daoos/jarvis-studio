<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
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

			<template v-slot:dag_execution_date="{ item: { dag_execution_date } }">
				{{ dag_execution_date | moment('YYYY/MM/DD - HH:mm') }}
			</template>
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import RunCollectionMixin from '@/mixins/data-workflows/collection/run-collection-mixin';

import { storageToStorageRuns } from '@/store/modules/easy-firestore/storage-to-storage-runs';
import { STORAGE_TO_STORAGE_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	CONFIGURATION_ID,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	STATUS,
	TRIGGERING_FILE
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class StorageToStorageRunsListingView extends Mixins(HeaderInfosMixin, RunCollectionMixin) {
	moduleName: string = storageToStorageRuns.moduleName;
	overriddenColumns: string[] = ['triggering_file', 'dag_execution_date'];

	get routeName() {
		return STORAGE_TO_STORAGE_RUNS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, CONFIGURATION_ID, TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS];
	}
}
</script>
