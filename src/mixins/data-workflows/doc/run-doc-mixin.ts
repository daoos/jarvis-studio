import { Component } from 'vue-property-decorator';
import { DataWorkflowsType, Doc, RunProps, Tab } from '@/types';
import { DataItem } from '@/mixins/data-workflows/doc/doc-mixin';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { RUNS } from '@/constants/data-workflows/status';

interface RunDetailsTab extends Tab {
	component: {
		name: string;
		props: {
			data: DataItem[];
		};
	};
}

interface OtherRunTab extends Tab {
	component: {
		name: string;
		props: {
			doc: Doc;
			moduleName: string;
		};
	};
}

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

	get itemTabsItems() {
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
