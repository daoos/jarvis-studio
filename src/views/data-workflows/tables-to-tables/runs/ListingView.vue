<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<tables-to-tables-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { TablesToTablesRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { TablesToTablesRunsCollectionListing }
})
export default class TablesToTablesRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
