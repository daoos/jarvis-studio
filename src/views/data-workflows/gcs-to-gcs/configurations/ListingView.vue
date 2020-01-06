<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<listing-component
			:type="listingType"
			:module-name="moduleName"
			:headers="headers"
			:overridden-columns="overriddenColumns"
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

import HeaderInfosMixin from '../header-infos';

import { CONFIGURATIONS } from '@/constants/data-workflows/status';
import { GCS_TO_GCS_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import {
	ACCOUNT,
	ACTIONS,
	ACTIVATED,
	ENVIRONMENT,
	ID,
	NB_DESTINATION_BUCKET,
	NB_FILENAME_TEMPLATES,
	SOURCE_BUCKET
} from '@/constants/data-workflows/listing/header-items';

export default {
	name: 'gcs-to-gcs-configurations-listing-view',
	components: { DataManagementHeader, ListingComponent },
	mixins: [HeaderInfosMixin],
	data() {
		return {
			moduleName: 'mirrorExcGcsToGcsConfs',
			overriddenColumns: ['id']
		};
	},
	computed: {
		listingType() {
			return CONFIGURATIONS;
		},
		routeName() {
			return GCS_TO_GCS_CONFIGURATIONS_ITEM;
		},
		headers() {
			return [
				ACCOUNT,
				ENVIRONMENT,
				ID,
				SOURCE_BUCKET,
				NB_DESTINATION_BUCKET,
				NB_FILENAME_TEMPLATES,
				ACTIVATED,
				ACTIONS
			];
		}
	}
};
</script>
