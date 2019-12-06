<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGbqRuns />
	</div>
</template>

<script>
import GcsToGbqRuns from '@/components/data-workflows/storage-to-table/run/GcsToGbqRuns';
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';

import TabItemsMixin from '../tab-items';

export default {
	components: { GcsToGbqRuns, DataManagementHeader },
	mixins: [TabItemsMixin]
};
</script>
