<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGcsRun />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import GcsToGcsRun from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsRun';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, GcsToGcsRun },
	mixins: [TabsItemsMixin]
};
</script>
