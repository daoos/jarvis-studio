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
export const FIRESTORE_CONF_DOC_ID = { text: 'Configuration Id', sortable: true, value: 'firestore_conf_doc_id' };
export const OUTPUT_FILENAME = { text: 'Generated File', sortable: true, value: 'output_filename' };
export const DAG_ID = { text: 'Workflow Id Bucket', sortable: true, value: 'dag_id' };
export const WORKFLOW_LENGTH = {
	text: 'Tasks',
	sortable: true,
	value: 'configuration_context.configuration.workflow.length'
};

// CONFIGURATIONS
export const ID = { text: 'Configuration id', sortable: true, value: 'id' };
export const ACTIVATED = { text: 'Status', sortable: true, value: 'activated' };
export const NB_DESTINATION_BUCKET = {
	text: 'Nb Destination Buckets',
	sortable: true,
	value: 'destination_bucket.length'
};
export const TABLE_NAME = { text: 'Destination Table', sortable: true, value: 'table_name' };
export const GCP_PROJECT = { text: 'BQ Project ID', sortable: true, value: 'gcp_project' };
export const GBQ_DATASET = { text: 'BQ Dataset', sortable: true, value: 'gbq_dataset' };
export const GCS_DEST_BUCKET = { text: 'Destination Bucket', sortable: true, value: 'gcs_dest_bucket' };
export const GCS_DEST_PREFIX = { text: 'Destination Prefix', sortable: true, value: 'gcs_dest_prefix' };

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
	FIRESTORE_CONF_DOC_ID,
	OUTPUT_FILENAME,
	DAG_ID,
	WORKFLOW_LENGTH,

	// CONFIGURATIONS
	ID,
	ACTIVATED,
	NB_DESTINATION_BUCKET,
	TABLE_NAME,
	GCP_PROJECT,
	GBQ_DATASET,
	GCS_DEST_BUCKET,
	GCS_DEST_PREFIX
};
