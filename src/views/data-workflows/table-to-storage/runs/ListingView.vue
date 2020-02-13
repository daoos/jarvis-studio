<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<table-to-storage-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { TableToStorageRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { TableToStorageRunsCollectionListing }
})
export default class TableToStorageRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
