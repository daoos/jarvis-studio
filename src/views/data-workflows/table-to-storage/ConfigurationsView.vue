<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationsListing from '../../../components/data-workflows/table-to-storage/configuration/ConfigurationsListing';

import TabsItemsMixin from './tabs-items';

export default {
	name: 'table-to-storage-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [TabsItemsMixin]
};
</script>
