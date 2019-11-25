<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToStorageRun />
	</div>
</template>

<script>
import StorageToStorageRun from '../components/StorageToStorageRun';
import DataManagementHeader from '../components/widgets/layout/DataManagementHeader';

export default {
	components: {
		StorageToStorageRun,
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
