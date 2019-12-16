<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<runs-listing />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import RunsListing from '@/components/data-workflows/gbq-to-gcs/run/RunsListing';

import TabsItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configurations-view',
	components: { DataManagementHeader, RunsListing },
	mixins: [TabsItemsMixin]
};
</script>
