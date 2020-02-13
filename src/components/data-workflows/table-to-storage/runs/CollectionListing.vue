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
		<template v-slot:firestore_conf_doc_id="{ item: { id, firestore_conf_doc_id } }">
			<router-link :to="{ name: routeName, params: { id } }">
				<span class="font-weight-medium">{{ firestore_conf_doc_id }}</span>
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

import { tableToStorageRuns } from '@/store/modules/easy-firestore/table-to-storage-runs';
import { TABLE_TO_STORAGE_RUNS_ITEM } from '@/constants/router/routes-names';
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

@Component({
	components: { ListingComponent }
})
export default class TestCollectionListing extends Mixins(RunCollectionMixin) {
	moduleName: string = tableToStorageRuns.moduleName;
	overriddenColumns: string[] = ['firestore_conf_doc_id', 'dag_execution_date'];

	get routeName() {
		return TABLE_TO_STORAGE_RUNS_ITEM;
	}

	get headers() {
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
</script>
