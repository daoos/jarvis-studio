<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<TablesToTablesRuns />
	</div>
</template>

<script>
import TablesToTablesRuns from '../../../components/data-workflows/tables-to-tables/TablesToTablesRuns';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, TablesToTablesRuns },
	mixins: [TabsItemsMixin]
};
</script>
