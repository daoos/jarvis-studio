<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToStorageConf />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import StorageToStorageConf from '../../../components/data-workflows/storage-to-storage/StorageToStorageConf';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, StorageToStorageConf },
	mixins: [TabsItemsMixin]
};
</script>
