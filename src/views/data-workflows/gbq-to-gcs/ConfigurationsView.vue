<template>
	<div>
		<data-management-header :headerTitle="workflowName" :tabsItems="tabsItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/widgets/layout/DataManagementHeader';
import ConfigurationsListing from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationsListing';

import ConfigurationViewsMixin from '../../../mixins/views/configurations';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [ConfigurationViewsMixin],
	computed: {
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: 'gbqToGcsRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'gbqToGcsConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
</script>
