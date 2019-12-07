<template>
	<div>
		<data-management-header :tabsItems="headerTabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../../../components/app/headers/DataManagementHeader';
import ConfigurationItem from '../../../../components/data-workflows/table-to-storage/configuration/ConfigurationItem';

import TabItemsMixin from '../header-tabs-items';

export default {
	name: 'table-to-storage-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [TabItemsMixin]
};
</script>
