<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
			sort-by="id"
			sort-desc
			show-delete-action
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
import DataManagementHeader from '../../../../components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { VM_LAUNCHER_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GCS_FILE_EXCHANGE_BUCKET,
	ID,
	WORKING_DIR
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'vm-launcher-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'vmLauncherConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return VM_LAUNCHER_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, ID, GCS_FILE_EXCHANGE_BUCKET, WORKING_DIR, ACTIVATED, ACTIONS];
		}
	}
};
</script>
