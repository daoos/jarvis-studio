<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGbqRuns />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import GcsToGbqRuns from '../../../../components/data-workflows/storage-to-table/run/GcsToGbqRuns';

import TabsItemsMixin from '../tabs-items';

export default {
	components: { DataManagementHeader, GcsToGbqRuns },
	mixins: [TabsItemsMixin]
};
</script>
