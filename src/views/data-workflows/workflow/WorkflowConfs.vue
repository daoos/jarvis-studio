<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<WorkflowConfs />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import WorkflowConfs from '../../../components/data-workflows/workflow/WorkflowConfs';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, WorkflowConfs },
	mixins: [TabsItemsMixin]
};
</script>
