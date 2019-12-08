<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToStorageConf />
	</div>
</template>

<script>
import StorageToStorageConf from '../../../components/data-workflows/storage-to-storage/StorageToStorageConf';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		StorageToStorageConf,
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
