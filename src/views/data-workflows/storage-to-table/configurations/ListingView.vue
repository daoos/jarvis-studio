<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:custom-data-fetching="customDataFetching"
			:overridden-columns="overriddenColumns"
			show-delete-action
		>
			<template v-slot:table_name="{ item: { bucket_id, id, table_name } }">
				<router-link :to="{ name: routeName, params: { bucketId: bucket_id, id } }">
					<span class="font-weight-medium">{{ table_name }}</span>
				</router-link>
			</template>
		</listing-component>
	</div>
</template>

<script>
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent';

import TabsItemsMixin from '../tabs-items';

import { mapState, mapGetters } from 'vuex';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { STORAGE_TO_TABLE_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	GBQ_DATASET,
	GCP_PROJECT,
	TABLE_NAME
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'storage-to-table-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [TabsItemsMixin],
	data() {
		return {
			moduleName: 'mirrorExcGcsToGbqConfs',
			overriddenColumns: ['table_name']
		};
	},
	methods: {
		async customDataFetching() {
			let items = [];

			await this.$store.dispatch(`${this.moduleName}/closeDBChannel`, { clearModule: true });
			await this.$store.dispatch(`${this.moduleName}/fetchAndAdd`, { where: this.whereConfFilter, limit: 1000 });

			for (const item of Object.values(this.mirrorExcGcsToGbqConfs)) {
				const bucketId = item.id;

				await this.$store.dispatch('mirrorExcGcsToGbqConfDetails/closeDBChannel', { clearModule: true });
				await this.$store.dispatch('mirrorExcGcsToGbqConfDetails/fetchAndAdd', { bucketId }).then(() => {
					Object.values(this.mirrorExcGcsToGbqConfDetails).forEach(val => (val.bucket_id = bucketId));
					items.push(Object.values(this.mirrorExcGcsToGbqConfDetails));
				});
			}

			return items.flat();
		}
	},
	computed: {
		...mapState({
			mirrorExcGcsToGbqConfs: state => state.mirrorExcGcsToGbqConfs.data,
			mirrorExcGcsToGbqConfDetails: state => state.mirrorExcGcsToGbqConfDetails.data
		}),
		...mapGetters(['whereConfFilter']),
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return STORAGE_TO_TABLE_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [ACCOUNT, ENVIRONMENT, TABLE_NAME, GCP_PROJECT, GBQ_DATASET, ACTIVATED, ACTIONS];
		}
	}
};
</script>
