<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
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

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import DataManagementHeader from '@/components/data-workflows/common/DataManagementHeader.vue';
import ListingComponent from '@/components/data-workflows/common/listing/ListingComponent.vue';

import HeaderInfosMixin from '../header-infos';

import { vmLauncherConfs } from '@/store/modules/easy-firestore/vm-launcher-confs';
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

@Component({
	components: { DataManagementHeader, ListingComponent }
})
export default class VmLauncherConfigurationsListingView extends Mixins(HeaderInfosMixin) {
	moduleName: string = vmLauncherConfs.moduleName;
	overriddenColumns: string[] = ['id'];

	get listingType() {
		return CONFIGURATIONS;
	}

	get routeName() {
		return VM_LAUNCHER_CONFIGURATIONS_ITEM;
	}

	get headers() {
		return [ACCOUNT, ENVIRONMENT, ID, GCS_FILE_EXCHANGE_BUCKET, WORKING_DIR, ACTIVATED, ACTIONS];
	}
}
</script>
