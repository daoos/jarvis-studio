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

// CONFIGURATIONS
export const ID = { text: 'Configuration id', sortable: true, value: 'id' };
export const ACTIVATED = { text: 'Status', sortable: true, value: 'activated' };
export const NB_DESTINATION_BUCKET = {
	text: 'Nb Destination Buckets',
	sortable: true,
	value: 'destination_bucket.length'
};
export const NB_FILENAME_TEMPLATES = { text: 'Nb File Templates', sortable: true, value: 'filename_templates.length' };

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

	// CONFIGURATIONS
	ID,
	ACTIVATED,
	NB_DESTINATION_BUCKET,
	NB_FILENAME_TEMPLATES
};
