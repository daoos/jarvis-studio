export const getWorkflowName = name => {
	const items = {
		gbqToGcsConfs: 'GBQ to GCS',
		GbqToGcsConf: 'GBQ to GCS',
		TableToStorageConf: 'Table to Storage',
		TableToStorageConfs: 'Table to Storage',
		GcsToGbqRuns: 'Storage to Table',
		GcsToGbqConfs: 'Storage to Table',
		TableToStorageRuns: 'Table to Storage',
		TableToStorageRun: 'Table to Storage'
	};

	return items[name];
};

export default {
	getWorkflowName
};
