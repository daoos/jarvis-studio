<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"> </DataManagementHeader>
		<workflowStatus />
	</div>
</template>

<script>
import workflowStatus from '../../../components/data-workflows/workflow/WorkflowStatus';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		workflowStatus,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Workflows',
			tabsItems: [
				{ id: 1, title: 'Status', link: '/data-workflows/workflow/status' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/workflow/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
