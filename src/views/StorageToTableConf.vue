<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<StorageToTableConf />
	</div>
</template>

<script>
import StorageToTableConf from '../components/data-workflows/storage-to-table/StorageToTableConf';
import DataManagementHeader from '../components/widgets/layout/DataManagementHeader';

export default {
	components: {
		StorageToTableConf,
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
