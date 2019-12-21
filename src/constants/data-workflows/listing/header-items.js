// GENERAL
export const ACCOUNT = { text: 'Account ID', sortable: true, value: 'account' };
export const ENVIRONMENT = { text: 'Environment', sortable: true, value: 'environment' };
export const ACTIONS = { text: 'Actions', sortable: false, value: 'actions' };

// RUNS
export const DESTINATION_BUCKET = { text: 'Destination Bucket', sortable: true, value: 'destination_bucket' };
export const SOURCE_BUCKET = { text: 'Source Bucket', sortable: true, value: 'source_bucket' };
export const GCS_TRIGGERING_FILE = { text: 'File', sortable: true, value: 'gcs_triggering_file' };
export const STATUS = { text: 'Status', sortable: true, value: 'status' };
export const DAG_EXECUTION_DATE = { text: 'Execution Date', sortable: true, value: 'dag_execution_date' };
export const CONFIGURATION_ID = { text: 'Conf Id', sortable: true, value: 'configuration_id' };
export const TRIGGERING_FILE = { text: 'Triggering File', sortable: true, value: 'triggering_file' };
export const NB_FILENAME_TEMPLATES = { text: 'Nb File Templates', sortable: true, value: 'filename_templates.length' };
export const GBQ_TABLE_REFRESHED = { text: 'Destination Table', sortable: true, value: 'gbq_table_refreshed' };

// CONFIGURATIONS
export const ID = { text: 'Configuration id', sortable: true, value: 'id' };
export const ACTIVATED = { text: 'Status', sortable: true, value: 'activated' };
export const NB_DESTINATION_BUCKET = {
	text: 'Nb Destination Buckets',
	sortable: true,
	value: 'destination_bucket.length'
};

export default {
	// GENERAL
	ACCOUNT,
	ENVIRONMENT,
	ACTIONS,

	// RUNS
	DESTINATION_BUCKET,
	SOURCE_BUCKET,
	GCS_TRIGGERING_FILE,
	STATUS,
	DAG_EXECUTION_DATE,
	CONFIGURATION_ID,
	TRIGGERING_FILE,
	NB_FILENAME_TEMPLATES,
	GBQ_TABLE_REFRESHED,

	// CONFIGURATIONS
	ID,
	ACTIVATED,
	NB_DESTINATION_BUCKET
};
