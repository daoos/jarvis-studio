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
			headerTitle: 'GBQ to GCS',
			tabsItems: [
				{ id: 1, title: 'Runs', link: { name: 'gbqToGcsRuns' } },
				{ id: 2, title: 'Configurations', link: { name: 'gbqToGcsConfs' } },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
