<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<storage-to-storage-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { StorageToStorageRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { StorageToStorageRunsCollectionListing }
})
export default class StorageToStorageRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
