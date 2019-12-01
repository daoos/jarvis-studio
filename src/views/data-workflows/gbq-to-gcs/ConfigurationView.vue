<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationItem from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationItem';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [ConfigurationViewsMixin]
};
</script>
