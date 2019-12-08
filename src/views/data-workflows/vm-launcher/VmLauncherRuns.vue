<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<VmLauncherRuns />
	</div>
</template>

<script>
import VmLauncherRuns from '../../../components/data-workflows/vm-launcher/VmLauncherRuns';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		VmLauncherRuns,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'VM Launcher',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/vm-launcher/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/vm-launcher/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
