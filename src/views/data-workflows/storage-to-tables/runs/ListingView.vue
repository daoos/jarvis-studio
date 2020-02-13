<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<storage-to-tables-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { StorageToTablesRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { StorageToTablesRunsCollectionListing }
})
export default class StorageToTablesRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
