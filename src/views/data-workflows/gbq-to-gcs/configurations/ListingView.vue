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
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { GBQ_TO_GCS_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import defaultHeaders from '@/constants/data-workflows/listing/configurations/default-headers';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'getGbqToGcsConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return GBQ_TO_GCS_CONFIGURATIONS_ITEM;
		},
		headers() {
			return defaultHeaders;
		}
	}
};
</script>
