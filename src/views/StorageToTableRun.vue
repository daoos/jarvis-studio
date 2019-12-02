<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToTableRun />
	</div>
</template>

<script>
import StorageToTableRun from '../components/data-workflows/storage-to-table/StorageToTableRun';
import DataManagementHeader from '../components/app/headers/DataManagementHeader';

export default {
	components: {
		StorageToTableRun,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Storage to Table',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/storagetotable/runs' },
				{ id: 2, title: 'Configurations', link: '/storagetotable/confs' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
