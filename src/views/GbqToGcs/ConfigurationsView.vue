<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configurations-tab />
	</div>
</template>

<script>
import DataManagementHeader from '../../components/widgets/layout/DataManagementHeader';
import ConfigurationsTab from '../../components/GbqToGcs/ConfigurationsTab';

import ConfigurationViewsMixin from '../../mixins/configurations-views';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ConfigurationsTab },
	mixins: [ConfigurationViewsMixin]
};
</script>
