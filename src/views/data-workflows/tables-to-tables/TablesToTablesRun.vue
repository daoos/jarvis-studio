<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<TablesToTablesRun />
	</div>
</template>

<script>
import TablesToTablesRun from '../../../components/data-workflows/tables-to-tables/TablesToTablesRun';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		TablesToTablesRun,
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
