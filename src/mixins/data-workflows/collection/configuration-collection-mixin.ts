import { Component } from 'vue-property-decorator';
import CollectionMixin from './collection-mixin';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component
export default class ConfigurationCollectionMixin extends CollectionMixin {
	get listingType() {
		return CONFIGURATIONS;
	}
}
