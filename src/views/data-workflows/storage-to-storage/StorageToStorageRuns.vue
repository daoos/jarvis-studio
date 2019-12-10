<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToStorageRuns />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import StorageToStorageRuns from '@/components/data-workflows/storage-to-storage/StorageToStorageRuns.vue';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, StorageToStorageRuns },
	mixins: [TabsItemsMixin]
};
</script>
