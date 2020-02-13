<template>
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
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import RunCollectionMixin from '@/mixins/data-workflows/collection/run-collection-mixin';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

import { mirrorExcGcsToGcsRuns } from '@/store/modules/easy-firestore/mirror-exc-gcs-to-gcs-runs';
import { GCS_TO_GCS_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	ENVIRONMENT,
	GCS_TRIGGERING_FILE,
	SOURCE_BUCKET,
	STATUS
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { ListingComponent }
})
export default class TestCollectionListing extends Mixins(RunCollectionMixin) {
	moduleName: string = mirrorExcGcsToGcsRuns.moduleName;
	overriddenColumns: string[] = ['gcs_triggering_file', 'dag_execution_date'];

	get routeName() {
		return GCS_TO_GCS_RUNS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, SOURCE_BUCKET, GCS_TRIGGERING_FILE, STATUS, DAG_EXECUTION_DATE, ACTIONS];
	}
}
</script>
