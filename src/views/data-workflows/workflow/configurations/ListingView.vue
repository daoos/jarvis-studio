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
		</listing-component>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

import HeaderInfosMixin from '../header-infos';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { WORKFLOW_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	AUTHORIZED_JOB_IDS_LENGTH,
	ENVIRONMENT,
	ID,
	TARGET_DAG
} from '@/constants/data-workflows/listing/header-items';

@Component({
	components: { DataManagementHeader, ListingComponent }
})
export default class WorkflowConfigurationsListingView extends Mixins(HeaderInfosMixin) {
	moduleName: string = 'workflowConfs';
	overriddenColumns: string[] = ['id'];

	get listingType() {
		return CONFIGURATIONS;
	}

	get routeName() {
		return WORKFLOW_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, TARGET_DAG, AUTHORIZED_JOB_IDS_LENGTH, ACTIVATED, ACTIONS];
	}
}
</script>
