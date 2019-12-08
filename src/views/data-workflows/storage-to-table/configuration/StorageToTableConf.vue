<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle" />
		<StorageToTableConf />
	</div>
</template>

<script>
import StorageToTableConf from '../../../../components/data-workflows/storage-to-table/configuration/StorageToTableConf';
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		StorageToTableConf,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Storage to Table',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/storage-to-table/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/storage-to-table/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
