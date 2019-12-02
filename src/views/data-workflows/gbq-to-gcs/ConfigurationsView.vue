<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationsListing from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationsListing';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';
import TabItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [ConfigurationViewsMixin, TabItemsMixin]
};
</script>
