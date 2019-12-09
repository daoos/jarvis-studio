<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<configuration-item />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import ConfigurationItem from '../../../components/data-workflows/gbq-to-gcs/configuration/ConfigurationItem';

import TabsItemsMixin from './tab-items';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { DataManagementHeader, ConfigurationItem },
	mixins: [TabsItemsMixin]
};
</script>
