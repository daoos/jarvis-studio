<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToStorageRun />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import StorageToStorageRun from '../../../components/data-workflows/storage-to-storage/StorageToStorageRun';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, StorageToStorageRun },
	mixins: [TabsItemsMixin]
};
</script>
