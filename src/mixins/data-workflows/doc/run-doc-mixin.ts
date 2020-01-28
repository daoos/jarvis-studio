import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, OtherRunsProps, RunProps, Tab } from '@/types';
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

	get otherRunsTab(): Tab {
		return {
			label: 'Other runs',
			href: 'other-runs',
			component: {
				name: 'other-runs',
				props: this.otherRunsProps
			}
		};
	}

	get otherRunsProps(): OtherRunsProps {
		return {
			doc: this.item,
			moduleName: this.moduleName
		};
	}
}
