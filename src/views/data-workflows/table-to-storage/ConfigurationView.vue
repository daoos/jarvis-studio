<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationItem from '../../../components/data-workflows/table-to-storage/configuration/ConfigurationItem';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';

export default {
	name: 'table-to-storage-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [ConfigurationViewsMixin]
};
</script>
