import { Component } from 'vue-property-decorator';
import { AnyObject, DataWorkflowsType, Doc, RunProps, Tab } from '@/types';
import DocMixin from '@/mixins/data-workflows/doc/doc-mixin';
import { RUNS } from '@/constants/data-workflows/status';

interface DataItem {
	component: string;
	props: AnyObject;
}

interface RunDetailsTab extends Tab {
	component: {
		name: string;
		props: {
			data: DataItem[];
		};
	};
}

interface ConfigurationTab extends Tab {
	component: {
		name: string;
		props: {
			data: DataItem[];
		};
	};
}

interface FullJSONTab extends Tab {
	component: {
		name: string;
		props: {
			json: AnyObject;
			jsonId: string;
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

interface ConversationTab extends Tab {
	component: {
		name: string;
		props: {};
	};
}

@Component
export default class RunDocMixin extends DocMixin {
	runDetailsData!: DataItem[];
	configurationData!: DataItem[];

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
		return [this.runDetailsTab, this.configurationTab, this.fullJSONTab, this.otherRunsTab, this.conversationTab];
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

	get configurationTab(): ConfigurationTab {
		return {
			label: 'Configuration',
			href: 'configuration',
			component: {
				name: 'overview-component',
				props: {
					data: this.configurationData
				}
			}
		};
	}

	get fullJSONTab(): FullJSONTab {
		return {
			label: 'Full Json',
			href: 'full-json',
			component: {
				name: 'view-json',
				props: {
					json: this.item,
					jsonId: this.itemId
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

	get conversationTab(): ConversationTab {
		return {
			label: 'Conversation',
			href: 'conversation',
			component: {
				name: 'view-conversation',
				props: {}
			}
		};
	}
}
