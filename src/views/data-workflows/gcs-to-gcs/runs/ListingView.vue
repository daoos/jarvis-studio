<template>
	<div>
		<data-management-header :workflow-name="workflowName" :tabsItems="tabsItems" />
		<gcs-to-gcs-runs-collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import { GcsToGcsRunsCollectionListing } from '@/components/data-workflows/runs-collections-listings';

@Component({
	components: { GcsToGcsRunsCollectionListing }
})
export default class GcsToGcsRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
