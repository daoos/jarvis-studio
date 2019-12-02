<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<TablesToTablesRuns />
	</div>
</template>

<script>
import TablesToTablesRuns from '../components/data-workflows/tables-to-tables/TablesToTablesRuns';
import DataManagementHeader from '../components/app/headers/DataManagementHeader';

export default {
	components: {
		TablesToTablesRuns,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Tables to Tables',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/tablestotables/runs' },
				{ id: 2, title: 'Configurations', link: '/tablestotables/confs' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
