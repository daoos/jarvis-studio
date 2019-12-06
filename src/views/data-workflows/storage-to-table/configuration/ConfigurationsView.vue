<template>
	<div>
		<DataManagementHeader :tabsItems="tabItems" :headerTitle="workflowName" />
		<GcsToGbqConfs />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import GcsToGbqConfs from '@/components/data-workflows/storage-to-table/configuration/ConfigurationsListing';

import ConfigurationViewsMixin from '@/mixins/views/configurations';
import TabItemsMixin from '../tab-items';

export default {
	components: { DataManagementHeader, GcsToGbqConfs },
	mixins: [ConfigurationViewsMixin, TabItemsMixin]
};
</script>
