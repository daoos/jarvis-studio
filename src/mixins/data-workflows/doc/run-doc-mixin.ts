import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, OtherRunsProps, RunProps, Tab } from '@/types';
import ItemMixin from '@/mixins/data-workflows/doc/item-mixin';
import { RUNS } from '@/constants/data-workflows/status';

interface RunTab extends Tab {
	component: {
		name: string;
		props: OtherRunsProps;
	};
}

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

	getOtherRunsTab(additionalFields?: string[]): RunTab {
		console.log(additionalFields);

		return {
			label: 'Other runs',
			href: 'other-runs',
			component: {
				name: 'other-runs',
				props: {
					doc: this.item,
					moduleName: this.moduleName,
					additionalFields
				}
			}
		};
	}
}
