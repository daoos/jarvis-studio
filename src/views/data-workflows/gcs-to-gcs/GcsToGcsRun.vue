<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<GcsToGcsRun />
	</div>
</template>

<script>
import GcsToGcsRun from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsRun';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		GcsToGcsRun,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'Gcs to Gcs',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/gcs-to-gcs/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/gcs-to-gcs/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
