<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle" />
		<runs-listing />
	</div>
</template>

<script>
import RunsListing from '../components/data-workflows/table-to-storage/RunsListing';
import DataManagementHeader from '../components/widgets/layout/DataManagementHeader';

export default {
	components: {
		RunsListing,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Table to Storage',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/tabletostorage/runs' },
				{ id: 2, title: 'Configurations', link: '/tabletostorage/confs' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
