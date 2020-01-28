import { Component } from 'vue-property-decorator';
import CollectionMixin from './collection-mixin';
import { STATUS } from '@/constants/data-workflows/status';

@Component
export default class StatusCollectionMixin extends CollectionMixin {
	get listingType() {
		return STATUS;
	}
}
