import { Component, Prop } from 'vue-property-decorator';
import CollectionMixin from './collection-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunCollectionMixin extends CollectionMixin {
	@Prop(Boolean) isOtherRunDisplay?: boolean;
	@Prop(String) jobId?: string;

	get listingType() {
		return RUNS;
	}
}
