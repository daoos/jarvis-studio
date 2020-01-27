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

import HeaderInfosMixin from '../header-infos';
import ConfigurationCollectionMixin from '@/mixins/data-workflows/collection/configuration-collection-mixin';

import { getGbqToGcsConfs } from '@/store/modules/easy-firestore/get-gbq-to-gcs-confs';
import { GBQ_TO_GCS_CONFIGURATIONS_ITEM } from '@/constants/router/routes-names';
import { ACCOUNT, ENVIRONMENT, ID, ACTIVATED, ACTIONS } from '@/constants/data-workflows/listing/header-items';

@Component
export default class GbqToGcsConfigurationsListingView extends Mixins(HeaderInfosMixin, ConfigurationCollectionMixin) {
	moduleName: string = getGbqToGcsConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get routeName() {
		return GBQ_TO_GCS_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, ACTIVATED, ACTIONS];
	}
}
</script>
