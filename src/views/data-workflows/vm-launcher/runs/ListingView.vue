<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<vm-launcher-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { VmLauncherRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { VmLauncherRunsCollectionListing }
})
export default class VmLauncherRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
