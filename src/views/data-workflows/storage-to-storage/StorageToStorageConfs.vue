<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToStorageConfs />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import StorageToStorageConfs from '@/components/data-workflows/storage-to-storage/StorageToStorageConfs.vue';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, StorageToStorageConfs },
	mixins: [TabsItemsMixin]
};
</script>
