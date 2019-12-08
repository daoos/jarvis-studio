<template>
	<div>
		<DataManagementHeader :tabsItems="tabsItems" :headerTitle="headerTitle"></DataManagementHeader>
		<GcsToGcsConfs />
	</div>
</template>

<script>
import GcsToGcsConfs from '../../../components/data-workflows/gcs-to-gcs/GcsToGcsConfs';
import DataManagementHeader from '../../../components/app/headers/DataManagementHeader';

export default {
	components: {
		GcsToGcsConfs,
		DataManagementHeader
	},
	data() {
		return {
			headerTitle: 'GCS to GCS',
			tabsItems: [
				{ id: 1, title: 'Runs', link: '/data-workflows/gcs-to-gcs/runs' },
				{ id: 2, title: 'Configurations', link: '/data-workflows/gcs-to-gcs/configurations' },
				{ id: 3, title: 'Documentation', link: '' }
			]
		};
	}
};
</script>
