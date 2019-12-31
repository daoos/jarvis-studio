type RouteName = string;

/* APP */
export const HOME: RouteName = 'home';
export const NO_ACCOUNT: RouteName = 'no-account';
export const NOT_FOUND: RouteName = 'not-found';

/* AUTH */
export const SIGN_IN: RouteName = 'SignIn';
export const LOGOUT: RouteName = 'Logout';

/* DATA MODELS */
export const DATA_TABLE_DETAILS: RouteName = 'DataTableDetails';

/* DATA WORKFLOWS */
export const GCS_TO_GCS_RUNS_LISTING: RouteName = 'GcsToGcsRuns';
export const GCS_TO_GCS_RUNS_ITEM: RouteName = 'GcsToGcsRun';
export const GCS_TO_GCS_CONFIGURATIONS_LISTING: RouteName = 'GcsToGcsConfs';
export const GCS_TO_GCS_CONFIGURATIONS_ITEM: RouteName = 'GcsToGcsConf';

export const STORAGE_TO_STORAGE_RUNS_LISTING: RouteName = 'StorageToStorageRuns';
export const STORAGE_TO_STORAGE_RUNS_ITEM: RouteName = 'StorageToStorageRun';
export const STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING: RouteName = 'StorageToStorageConfs';
export const STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM: RouteName = 'StorageToStorageConf';

export const STORAGE_TO_TABLE_RUNS_LISTING: RouteName = 'GcsToGbqRuns';
export const STORAGE_TO_TABLE_RUNS_ITEM: RouteName = 'StorageToTableRun';
export const STORAGE_TO_TABLE_CONFIGURATIONS_LISTING: RouteName = 'GcsToGbqConfs';
export const STORAGE_TO_TABLE_CONFIGURATIONS_ITEM: RouteName = 'StorageToTableConf';

export const STORAGE_TO_TABLES_RUNS_LISTING: RouteName = 'StorageToTablesRunsListing';
export const STORAGE_TO_TABLES_RUNS_ITEM: RouteName = 'StorageToTablesRunsItem';
export const STORAGE_TO_TABLES_CONFIGURATIONS_LISTING: RouteName = 'StorageToTablesConfigurationsListing';
export const STORAGE_TO_TABLES_CONFIGURATIONS_ITEM: RouteName = 'StorageToTablesConfigurationsItem';

export const TABLES_TO_TABLES_RUNS_LISTING: RouteName = 'TablesToTablesRuns';
export const TABLES_TO_TABLES_RUNS_ITEM: RouteName = 'TablesToTablesRun';
export const TABLES_TO_TABLES_CONFIGURATIONS_LISTING: RouteName = 'TablesToTablesConfs';
export const TABLES_TO_TABLES_CONFIGURATIONS_ITEM: RouteName = 'TablesToTablesConf';

export const GBQ_TO_GCS_RUNS_LISTING: RouteName = 'gbqToGcsRuns';
export const GBQ_TO_GCS_RUNS_ITEM: RouteName = 'gbqToGcsRun';
export const GBQ_TO_GCS_CONFIGURATIONS_LISTING: RouteName = 'gbqToGcsConfs';
export const GBQ_TO_GCS_CONFIGURATIONS_ITEM: RouteName = 'GbqToGcsConf';

export const TABLE_TO_STORAGE_RUNS_LISTING: RouteName = 'TableToStorageRuns';
export const TABLE_TO_STORAGE_RUNS_ITEM: RouteName = 'TableToStorageRun';
export const TABLE_TO_STORAGE_CONFIGURATIONS_LISTING: RouteName = 'TableToStorageConfs';
export const TABLE_TO_STORAGE_CONFIGURATIONS_ITEM: RouteName = 'TableToStorageConf';

export const VM_LAUNCHER_RUNS_LISTING: RouteName = 'vmLauncherRuns';
export const VM_LAUNCHER_RUNS_ITEM: RouteName = 'vmLauncherRunsItem';
export const VM_LAUNCHER_CONFIGURATIONS_LISTING: RouteName = 'vmLauncherConfs';
export const VM_LAUNCHER_CONFIGURATIONS_ITEM: RouteName = 'vmLauncherConfsItem';

export const WORKFLOW_STATUS_LISTING: RouteName = 'WorkflowStatus';
export const WORKFLOW_STATUS_ITEM: RouteName = 'WorkflowStatusItem';
export const WORKFLOW_CONFIGURATIONS_LISTING: RouteName = 'WorkflowConfs';
export const WORKFLOW_CONFIGURATIONS_ITEM: RouteName = 'WorkflowConfsItem';

/* SETTINGS */
export const PROFILE: RouteName = 'userProfile';
export const USERS: RouteName = 'users';
export const ACCOUNTS: RouteName = 'accounts';
export const CLOUD_FUNCTIONS: RouteName = 'gcpCloudFunctions';

export default {
	NOT_FOUND,
	HOME,
	SIGN_IN,
	DATA_TABLE_DETAILS,
	GCS_TO_GCS_RUNS_LISTING,
	GCS_TO_GCS_RUNS_ITEM,
	GCS_TO_GCS_CONFIGURATIONS_LISTING,
	GCS_TO_GCS_CONFIGURATIONS_ITEM,
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_STORAGE_RUNS_ITEM,
	STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING,
	STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM,
	STORAGE_TO_TABLE_RUNS_LISTING,
	STORAGE_TO_TABLE_RUNS_ITEM,
	STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLE_CONFIGURATIONS_ITEM,
	TABLES_TO_TABLES_RUNS_LISTING,
	TABLES_TO_TABLES_RUNS_ITEM,
	TABLES_TO_TABLES_CONFIGURATIONS_LISTING,
	TABLES_TO_TABLES_CONFIGURATIONS_ITEM,
	GBQ_TO_GCS_RUNS_LISTING,
	GBQ_TO_GCS_CONFIGURATIONS_LISTING,
	GBQ_TO_GCS_CONFIGURATIONS_ITEM,
	TABLE_TO_STORAGE_RUNS_LISTING,
	TABLE_TO_STORAGE_CONFIGURATIONS_LISTING,
	TABLE_TO_STORAGE_CONFIGURATIONS_ITEM,
	VM_LAUNCHER_RUNS_LISTING,
	VM_LAUNCHER_RUNS_ITEM,
	VM_LAUNCHER_CONFIGURATIONS_LISTING,
	VM_LAUNCHER_CONFIGURATIONS_ITEM,
	WORKFLOW_STATUS_LISTING,
	WORKFLOW_CONFIGURATIONS_LISTING,
	WORKFLOW_CONFIGURATIONS_ITEM,
	PROFILE,
	USERS,
	ACCOUNTS,
	CLOUD_FUNCTIONS
};
