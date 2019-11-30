<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<GbqToGcsRuns />
	</div>
</template>

<script>
import GbqToGcsRuns from '../components/GbqToGcsRuns';
import DataManagementHeader from '../components/widgets/layout/DataManagementHeader';

export default {
	components: {
		GbqToGcsRuns,
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
