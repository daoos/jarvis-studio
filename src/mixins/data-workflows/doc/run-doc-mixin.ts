import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, OtherRunsProps, RunProps, Tab } from '@/types';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { RUNS } from '@/constants/data-workflows/status';

interface RunTab extends Tab {
	component: {
		name: string;
		props: OtherRunsProps;
	};
}

@Component
export default class RunDocMixin extends DocMixin {
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
