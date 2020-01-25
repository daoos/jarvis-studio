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
			<template v-slot:gcs_triggering_file="{ item: { id, gcs_triggering_file } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ gcs_triggering_file }}</span>
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
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

import HeaderInfosMixin from '../header-infos';
import RunCollectionMixin from '@/mixins/data-workflows/run-collection-mixin';

import { GBQ_TO_GCS_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ENVIRONMENT,
	DESTINATION_BUCKET,
	GCS_TRIGGERING_FILE,
	STATUS,
	DAG_EXECUTION_DATE,
	ACTIONS
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { DataManagementHeader, ListingComponent }
})
export default class GbqToGcsRunsListingView extends Mixins(HeaderInfosMixin, RunCollectionMixin) {
	moduleName: string = 'getGbqToGcsRuns';
	overriddenColumns: string[] = ['gcs_triggering_file', 'dag_execution_date'];

	get routeName() {
		return GBQ_TO_GCS_RUNS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, DESTINATION_BUCKET, GCS_TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS];
	}
}
</script>
