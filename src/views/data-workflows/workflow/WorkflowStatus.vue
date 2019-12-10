<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<workflowStatus />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import workflowStatus from '../../../components/data-workflows/workflow/WorkflowStatus';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, workflowStatus },
	mixins: [TabsItemsMixin]
};
</script>
