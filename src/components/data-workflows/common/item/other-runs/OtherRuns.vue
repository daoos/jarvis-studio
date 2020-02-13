<template>
	<div class="d-flex justify-center">
		<component :is="componentName" />
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AnyObject, Doc } from '@/types';
import * as CollectionsListings from '@/components/data-workflows/runs-collections-listings';
import ParametersTable from '@/components/data-workflows/common/item/parameters/ParametersTable.vue';

// TODO: Remove props (moduleName & additionalFields) in components

@Component({
	components: { ParametersTable }
})
export default class OtherRuns extends Vue {
	@Prop({ required: true }) private doc!: Doc;

	get componentName(): string {
		// TODO: Get component name

		const collectionsListings: AnyObject = CollectionsListings;
		console.log(`${this.doc.dag_id}RunsCollectionListing`);
		return collectionsListings[`${'GcsToGcs'}RunsCollectionListing`];
	}
}
</script>
