<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle" />
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
				{ id: 1, title: 'Runs', link: { name: 'TableToStorageRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'TableToStorageConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
