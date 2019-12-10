<template>
	<div>
		<data-management-header :tabsItems="headerTabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import ConfigurationItem from '@/components/data-workflows/gbq-to-gcs/configuration/ConfigurationItem';

import TabItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [TabItemsMixin]
};
</script>
