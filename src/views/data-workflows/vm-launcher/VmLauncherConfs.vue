<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<VmLauncherConfs />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import VmLauncherConfs from '../../../components/data-workflows/vm-launcher/VmLauncherConfs';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, VmLauncherConfs },
	mixins: [TabsItemsMixin]
};
</script>
