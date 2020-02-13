<template>
	<div>
		<data-management-header :workflow-name="workflowName" :tabsItems="tabsItems" />
		<gbq-to-gcs-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { GbqToGcsRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { GbqToGcsRunsCollectionListing }
})
export default class GbqToGcsRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
