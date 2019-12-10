<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<TablesToTablesRun />
	</div>
</template>

<script>
import TablesToTablesRun from '../../../components/data-workflows/tables-to-tables/TablesToTablesRun';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, TablesToTablesRun },
	mixins: [TabsItemsMixin]
};
</script>
