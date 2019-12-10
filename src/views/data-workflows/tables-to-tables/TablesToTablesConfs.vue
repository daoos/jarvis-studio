<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<TablesToTablesConfs />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import TablesToTablesConfs from '../../../components/data-workflows/tables-to-tables/TablesToTablesConfs';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, TablesToTablesConfs },
	mixins: [TabsItemsMixin]
};
</script>
