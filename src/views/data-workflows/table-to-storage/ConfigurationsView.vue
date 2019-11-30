<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/widgets/layout/DataManagementHeader';
import ConfigurationsListing from '../../../components/data-workflows/table-to-storage/configuration/ConfigurationsListing';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';

export default {
	name: 'table-to-storage-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [ConfigurationViewsMixin]
};
</script>
