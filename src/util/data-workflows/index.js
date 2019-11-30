export const getWorkflowName = name => {
	const items = {
		gbqToGcsConfs: 'GBQ to GCS',
		GbqToGcsConf: 'GBQ to GCS',
		tableToStorageConfs: 'Table to Storage',
		TableToStorageConf: 'Table to Storage'
	};

	return items[name];
};

export default {
	getWorkflowName
};
