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
				{ id: 1, title: 'Status', link: '/status/workflow' },
				{ id: 2, title: 'Configurations', link: '/conf/workflow' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
