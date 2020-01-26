import { Component } from 'vue-property-decorator';
import ItemMixin from '@/mixins/data-workflows/item-mixin';
import { CONFIGURATIONS } from '@/constants/data-workflows/status';

@Component
export default class ConfigurationDocMixin extends ItemMixin {
	get type() {
		return CONFIGURATIONS;
	}
}
