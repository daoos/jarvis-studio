import { getWorkflowName } from '../../util/data-workflows';

export default {
	computed: {
		workflowName() {
			return getWorkflowName(this.$route.name) || '';
		}
	}
};
