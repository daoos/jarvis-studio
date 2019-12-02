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
	mixins: [ConfigurationViewsMixin],
	computed: {
		tabsItems() {
			return [
				{ id: 1, title: 'Runs', link: { name: 'TableToStorageRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'TableToStorageConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			];
		}
	}
};
</script>
