<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToTableConf />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import StorageToTableConf from '../../../../components/data-workflows/storage-to-table/configuration/StorageToTableConf';

import TabsItemsMixin from '../tabs-items';

export default {
	components: { DataManagementHeader, StorageToTableConf },
	mixins: [TabsItemsMixin]
};
</script>
