<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<VmLauncherConfs />
	</div>
</template>

<script>
import VmLauncherConfs from '../../../components/data-workflows/vm-launcher/VmLauncherConfs';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		VmLauncherConfs,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'VM Launcher',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/runs/vmlauncher' },
				{ id: 2, title: 'Configurations', link: '/conf/vmlauncher' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
