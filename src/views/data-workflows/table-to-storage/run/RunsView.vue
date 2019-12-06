<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<runs-listing />
	</div>
</template>

<script>
import RunsListing from '@/components/data-workflows/table-to-storage/run/RunsListing';
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';

import TabItemsMixin from '../tab-items';

export default {
	components: { RunsListing, DataManagementHeader },
	mixins: [TabItemsMixin]
};
</script>
