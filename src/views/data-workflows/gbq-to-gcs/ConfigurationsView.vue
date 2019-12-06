<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<configurations-listing />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import ConfigurationsListing from '@/components/data-workflows/gbq-to-gcs/configuration/ConfigurationsListing';

import TabItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, ConfigurationsListing },
	mixins: [TabItemsMixin]
};
</script>
