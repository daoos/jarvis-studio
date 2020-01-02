<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="id"
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
import DataManagementHeader from '../../../../components/data-workflows/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import HeaderInfosMixin from '../header-infos';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { TABLE_TO_STORAGE_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GCP_PROJECT,
	GCS_DEST_BUCKET,
	GCS_DEST_PREFIX,
	ID
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'table-to-storage-configurations-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [HeaderInfosMixin],
	data() {
		return {
			moduleName: 'tableToStorageConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return TABLE_TO_STORAGE_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, ID, GCP_PROJECT, GCS_DEST_BUCKET, GCS_DEST_PREFIX, ACTIVATED, ACTIONS];
		}
	}
};
</script>
