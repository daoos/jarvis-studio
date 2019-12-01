<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationsListing from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationsListing';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [ConfigurationViewsMixin]
};
</script>
