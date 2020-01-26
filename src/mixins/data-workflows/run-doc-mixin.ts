import { Component } from 'vue-property-decorator';
import ItemMixin from '@/mixins/data-workflows/item-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunDocMixin extends ItemMixin {
	get type() {
		return RUNS;
	}
}
