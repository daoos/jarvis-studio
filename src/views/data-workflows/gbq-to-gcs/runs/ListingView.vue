<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<collection-listing />
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import HeaderInfosMixin from '../header-infos';
import CollectionMixin from '@/mixins/data-workflows/collection/collection-mixin';
import CollectionListing from '@/components/data-workflows/gbq-to-gcs/runs/CollectionListing.vue';

@Component({
	components: { CollectionListing }
})
export default class GbqToGcsRunsListingView extends Mixins(HeaderInfosMixin, CollectionMixin) {}
</script>
