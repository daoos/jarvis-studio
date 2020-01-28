import { Component } from 'vue-property-decorator';
import CollectionMixin from './collection-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunCollectionMixin extends CollectionMixin {
	get listingType() {
		return RUNS;
	}
}
