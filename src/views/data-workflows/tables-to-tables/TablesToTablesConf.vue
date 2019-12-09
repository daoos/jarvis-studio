<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<TablesToTablesConf />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import TablesToTablesConf from '../../../components/data-workflows/tables-to-tables/TablesToTablesConf';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, TablesToTablesConf },
	mixins: [TabsItemsMixin]
};
</script>
