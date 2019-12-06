<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGbqConfs />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import GcsToGbqConfs from '@/components/data-workflows/storage-to-table/configuration/ConfigurationsListing';

import TabItemsMixin from '../tab-items';

export default {
	components: { DataManagementHeader, GcsToGbqConfs },
	mixins: [TabItemsMixin]
};
</script>
