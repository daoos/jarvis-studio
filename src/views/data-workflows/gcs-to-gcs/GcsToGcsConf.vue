<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<GcsToGcsConf />
	</div>
</template>

<script>
import GcsToGcsConf from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsConf';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		GcsToGcsConf,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'GCS to GCS',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/runs/gcstogcs' },
				{ id: 2, title: 'Configurations', link: '/conf/gcstogcs' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
