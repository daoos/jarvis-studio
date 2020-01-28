import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, RunProps } from '@/types';
import ItemMixin from '@/mixins/data-workflows/doc/item-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunDocMixin extends ItemMixin {
	get type(): DataWorkflowsType {
		return RUNS;
	}

	get runProps(): RunProps {
		return {
			type: this.type!,
			tabsItems: this.itemTabsItems,
			isLoading: this.isLoading,
			isNotFound: this.isNotFound
		};
	}
}
