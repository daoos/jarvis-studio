<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
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

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/ListingComponent';

import TabsItemsMixin from '../tabs-items';

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

export default {
	name: 'workflow-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'workflowConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return WORKFLOW_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, ID, TARGET_DAG, AUTHORIZED_JOB_IDS_LENGTH, ACTIVATED, ACTIONS];
		}
	}
};
</script>
