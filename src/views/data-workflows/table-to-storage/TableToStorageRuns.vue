<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle" />
		<runs-listing />
	</div>
</template>

<script>
import RunsListing from '../../../components/data-workflows/table-to-storage/RunsListing';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		RunsListing,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Table to Storage',
			tabsItems: [
				{ id: 1, title: 'Runs', link: { name: 'TableToStorageRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'TableToStorageConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
