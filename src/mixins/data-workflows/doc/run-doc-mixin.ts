import { Component } from 'vue-property-decorator';
import {
	ConfigurationTab,
	DataItem,
	DataWorkflowsType,
	FullJSONTab,
	NotesTab,
	OtherRunTab,
	RunDetailsTab,
	RunProps
} from '@/types';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { RUNS } from '@/constants/data-workflows/status';

@Component
export default class RunDocMixin extends DocMixin {
	runDetailsData!: DataItem[];

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

	get itemTabsItems(): any {
		if (Object.keys(this.item).length === 0) return [];
		return [this.runDetailsTab, this.configurationTab, this.fullJSONTab, this.otherRunsTab, this.notesTab];
	}

	get runDetailsTab(): RunDetailsTab {
		return {
			label: 'Run Details',
			href: 'run-details',
			component: {
				name: 'overview-component',
				props: {
					data: this.runDetailsData
				}
			}
		};
	}

	get otherRunsTab(): OtherRunTab {
		return {
			label: 'Other runs',
			href: 'other-runs',
			component: {
				name: 'other-runs',
				props: {
					doc: this.item,
					moduleName: this.moduleName
				}
			}
		};
	}
}
