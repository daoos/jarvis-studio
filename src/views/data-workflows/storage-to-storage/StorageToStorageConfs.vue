<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToStorageConfs />
	</div>
</template>

<script>
import StorageToStorageConfs from '@/components/data-workflows/storage-to-storage/StorageToStorageConfs.vue';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		StorageToStorageConfs,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Storage to Storage',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/storage-to-storage/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/storage-to-storage/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
