<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationItem from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationItem';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';
import TabItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [ConfigurationViewsMixin, TabItemsMixin]
};
</script>
