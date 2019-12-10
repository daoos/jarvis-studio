<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GbqToGcsRuns />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import GbqToGcsRuns from '../../../components/data-workflows/gbq-to-gcs/run/RunsListing';

import TabsItemsMixin from './tab-items';

export default {
	components: { DataManagementHeader, GbqToGcsRuns },
	mixins: [TabsItemsMixin]
};
</script>
