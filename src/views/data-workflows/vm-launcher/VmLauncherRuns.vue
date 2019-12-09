<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" />
		<VmLauncherRuns />
	</div>
</template>

<script>
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';
import VmLauncherRuns from '../../../components/data-workflows/vm-launcher/VmLauncherRuns';

import TabsItemsMixin from './tabs-items';

export default {
	components: { DataManagementHeader, VmLauncherRuns },
	mixins: [TabsItemsMixin]
};
</script>
