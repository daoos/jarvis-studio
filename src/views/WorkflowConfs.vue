<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<WorkflowConfs />
	</div>
</template>

<script>
import WorkflowConfs from '../components/data-workflows/workflow/WorkflowConfs';
import DataManagementHeader from '../components/widgets/layout/DataManagementHeader';

export default {
	components: {
		WorkflowConfs,
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
