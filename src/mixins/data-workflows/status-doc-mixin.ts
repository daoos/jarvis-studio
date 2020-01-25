import { Component } from 'vue-property-decorator';
import ItemMixin from '@/mixins/data-workflows/item-mixin';
import { STATUS } from '@/constants/data-workflows/status';

@Component
export default class StatusDocMixin extends ItemMixin {
	get type() {
		return STATUS;
	}
}
