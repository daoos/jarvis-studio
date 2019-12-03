<template>
	<div>
		<DataManagementHeader :tabsItems="tabItems" :headerTitle="workflowName" />
		<GcsToGbqRuns />
	</div>
</template>

<script>
import GcsToGbqRuns from '../../../../components/data-workflows/storage-to-table/run/GcsToGbqRuns';
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';

import ConfigurationViewsMixin from '@/mixins/views/configurations';
import TabItemsMixin from '../tab-items';

export default {
	components: { GcsToGbqRuns, DataManagementHeader },
	mixins: [ConfigurationViewsMixin, TabItemsMixin]
};
</script>
