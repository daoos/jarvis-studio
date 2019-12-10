<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGcsRuns />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import GcsToGcsRuns from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsRuns';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, GcsToGcsRuns },
	mixins: [TabsItemsMixin]
};
</script>
