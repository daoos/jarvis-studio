<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../components/widgets/layout/DataManagementHeader';
import ConfigurationItem from '../../components/GbqToGcs/ConfigurationItem';

import ConfigurationViewsMixin from '../../mixins/views/configurations';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [ConfigurationViewsMixin]
};
</script>
