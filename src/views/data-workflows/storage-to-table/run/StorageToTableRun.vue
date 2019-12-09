<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<StorageToTableRun />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import StorageToTableRun from '../../../../components/data-workflows/storage-to-table/run/StorageToTableRun';

import TabsItemsMixin from '../tabs-items';

export default {
	components: { DataManagementHeader, StorageToTableRun },
	mixins: [TabsItemsMixin]
};
</script>
