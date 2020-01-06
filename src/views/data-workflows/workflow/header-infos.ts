import { WORKFLOW } from '@/constants/data-workflows/names';
import { WORKFLOW_STATUS_LISTING, WORKFLOW_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

export default {
	computed: {
		workflowName() {
			return WORKFLOW.displayName;
		},
		tabsItems() {
			return [
				{ id: 1, title: 'Status', link: { name: WORKFLOW_STATUS_LISTING } },
				{ id: 2, title: 'Configurations', link: { name: WORKFLOW_CONFIGURATIONS_LISTING } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
