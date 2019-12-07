export const getWorkflowName = name => {
	console.log(name);

	const items = {
		// GCS to GCS
		GcsToGcsRuns: 'GCS to GCS',
		GcsToGcsRun: 'GCS to GCS',
		GcsToGcsConfs: 'GCS to GCS',
		GcsToGcsConf: 'GCS to GCS',

		// Storage to Storage
		StorageToStorageRuns: 'Storage to Storage',
		StorageToStorageRun: 'Storage to Storage',
		StorageToStorageConfs: 'Storage to Storage',
		StorageToStorageConf: 'Storage to Storage',

		// GCS to GBQ
		// TODO: Update names
		GcsToGbqRuns: 'Storage to Table',
		StorageToTableRun: 'Storage to Table',
		GcsToGbqConfs: 'Storage to Table',
		StorageToTableConf: 'Storage to Table',

		// Tables to Tables
		TablesToTablesRuns: 'Tables to Tables',
		TablesToTablesRun: 'Tables to Tables',
		TablesToTablesConfs: 'Tables to Tables',
		TablesToTablesConf: 'Tables to Tables',

		// GBQ to GCS
		gbqToGcsRuns: 'GBQ to GCS',
		gbqToGcsRun: 'GBQ to GCS',
		gbqToGcsConfs: 'GBQ to GCS',
		GbqToGcsConf: 'GBQ to GCS',

		// Table to Storage
		TableToStorageRuns: 'Table to Storage',
		TableToStorageRun: 'Table to Storage',
		TableToStorageConfs: 'Table to Storage',
		TableToStorageConf: 'Table to Storage',

		// VM Launcher
		// TODO: Update names
		vmLauncherRuns: 'VM Launcher',
		vmLauncherConfs: 'VM Launcher',

		// Workflow
		WorkflowStatus: 'Workflow',
		WorkflowConfs: 'Workflow'
	};

	return items[name];
};

export default {
	getWorkflowName
};
