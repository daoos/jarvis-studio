<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<run-item />
	</div>
</template>

<script>
import RunItem from '@/components/data-workflows/table-to-storage/run/RunItem';
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';

import TabItemsMixin from '../tab-items';

export default {
	components: { RunItem, DataManagementHeader },
	mixins: [TabItemsMixin]
};
</script>
