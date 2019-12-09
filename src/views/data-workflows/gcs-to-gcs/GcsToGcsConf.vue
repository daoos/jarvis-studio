<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<GcsToGcsConf />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import GcsToGcsConf from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsConf';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, GcsToGcsConf },
	mixins: [TabsItemsMixin]
};
</script>
