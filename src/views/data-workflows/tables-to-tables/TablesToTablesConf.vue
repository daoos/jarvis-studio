<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<TablesToTablesConf />
	</div>
</template>

<script>
import TablesToTablesConf from '../../../components/data-workflows/tables-to-tables/TablesToTablesConf';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		TablesToTablesConf,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Tables to Tables',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/tables-to-tables/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/tables-to-tables/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
