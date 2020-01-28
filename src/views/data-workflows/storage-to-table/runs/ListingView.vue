<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
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

import HeaderInfosMixin from '../header-infos';
import RunCollectionMixin from '@/mixins/data-workflows/collection/run-collection-mixin';

import { mirrorExcGcsToGbqRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gbq-runs';
import { STORAGE_TO_TABLE_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	GBQ_TABLE_REFRESHED,
	GCS_TRIGGERING_FILE,
	STATUS
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class StorageToTableRunsListingView extends Mixins(HeaderInfosMixin, RunCollectionMixin) {
	moduleName: string = mirrorExcGcsToGbqRuns.moduleName;
	overriddenColumns: string[] = ['gcs_triggering_file', 'dag_execution_date'];

	get routeName() {
		return STORAGE_TO_TABLE_RUNS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, GBQ_TABLE_REFRESHED, GCS_TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS];
	}
}
</script>
