import { getWorkflowName } from '../util/data-workflows';

export default {
	computed: {
		workflowName() {
			return getWorkflowName(this.$route.name);
		},
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: '/runs/gbqtogcs' },
				{ id: 2, title: 'Configurations', link: '/conf/gbqtogcs' },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
