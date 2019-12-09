<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGcsConfs />
	</div>
</template>

<script>
import GcsToGcsConfs from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsConfs';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, GcsToGcsConfs },
	mixins: [TabsItemsMixin]
};
</script>
