<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
		>
			<template v-slot:dag_id="{ item: { id, dag_id } }">
				<router-link :to="{ name: routeName, params: { id } }">
					<span class="font-weight-medium">{{ dag_id }}</span>
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

import { VM_LAUNCHER_RUNS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	DAG_EXECUTION_DATE,
	DAG_ID,
	ENVIRONMENT,
	STATUS
} from '@/constants/data-workflows/listing/header-items';

@Component
export default class VmLauncherRunsListingView extends Mixins(HeaderInfosMixin, RunCollectionMixin) {
	moduleName: string = 'vmLauncherRuns';
	overriddenColumns: string[] = ['dag_id', 'dag_execution_date'];

	get routeName() {
		return VM_LAUNCHER_RUNS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, DAG_ID, STATUS, DAG_EXECUTION_DATE, ACTIONS];
	}
}
</script>
