import { Component } from 'vue-property-decorator';
import { DataWorkflowsType } from '@/types';
import ItemMixin from '@/mixins/data-workflows/doc/item-mixin';
import { STATUS } from '@/constants/data-workflows/status';

@Component
export default class StatusDocMixin extends ItemMixin {
	get type(): DataWorkflowsType {
		return STATUS;
	}
}
