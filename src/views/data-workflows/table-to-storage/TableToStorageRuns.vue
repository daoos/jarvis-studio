<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<runs-listing />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import RunsListing from '../../../components/data-workflows/table-to-storage/RunsListing';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, RunsListing },
	mixins: [TabsItemsMixin]
};
</script>
