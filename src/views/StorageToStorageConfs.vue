<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToStorageConfs />
	</div>
</template>

<script>
import StorageToStorageConfs from '@/components/data-workflows/storage-to-storage/StorageToStorageConfs.vue';
import DataManagementHeader from '../components/app/headers/DataManagementHeader';

export default {
	components: {
		StorageToStorageConfs,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Storage to Storage',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/storagetostorage/runs' },
				{ id: 2, title: 'Configurations', link: '/storagetostorage/confs' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
