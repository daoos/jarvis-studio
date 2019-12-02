export default {
	computed: {
		overviewData() {
			return [
				{
					component: 'overview-header',
					props: {
						activeHeader: true,
						viewId: this.confId,
						viewType: 'conf',
						description: null
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Storage to Storage configuration',
						paramItems: [
							{
								id: 'configuration_type',
								label: 'Configuration Type',
								value: 'table-to-storage'
							},
							{
								id: 'configuration_id',
								label: 'Configuration ID',
								value: this.conf.id
							},
							{
								id: 'account',
								label: 'Account',
								value: this.conf.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.conf.environment
							},
							{
								id: 'activated',
								label: 'Activated',
								value: this.conf.activated,
								default: true
							},
							{
								id: 'archive',
								label: 'Archive',
								value: this.conf.archive,
								default: false
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Destination Storage',
						description: 'Destination Storage of the file to export',
						columns: [
							{
								label: 'Type',
								field: 'source_type',
								width: '100px'
							},
							{
								label: 'Storage ID',
								field: 'gcs_dest_bucket',
								width: '200px'
							},
							{
								label: 'Destination Folder',
								field: 'gcs_dest_prefix',
								width: '200px'
							},
							{
								label: 'Output Filename',
								field: 'output_filename',
								width: '200px'
							}
						],
						rows: [
							{
								source_type: 'GCS',
								gcs_dest_bucket: this.conf.gcs_dest_bucket,
								gcs_dest_prefix: this.conf.gcs_dest_prefix,
								output_filename: this.conf.output_filename
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'File Parameters',
						tooltip: true,
						description: 'Parameters for the exported file',
						paramItems: [
							{
								id: 'compression',
								label: 'Compressed',
								value: this.conf.compression,
								default: 'None'
							},
							{
								id: 'field_delimiter',
								label: 'Field Delimiter',
								value: this.conf.field_delimiter,
								default: '|'
							},
							{
								id: 'delete_dest_bucket_content',
								label: 'Delete Destination Storage Content',
								value: this.conf.delete_dest_bucket_content,
								default: false
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Source Table',
						tooltip: true,
						description: 'SQL executed to generate the dataset to export into file',
						paramItems: [
							{
								id: 'gcp_project',
								label: 'Bigquery Project ID',
								value: this.conf.gcp_project
							},
							{
								id: '',
								label: 'SQL File',
								component: 'sql-viewer',
								properties: {
									id: this.conf.id,
									sqlBinary: this.conf.sql
								}
							},
							{
								id: 'copy_table',
								label: 'Keep Table',
								value: this.conf.copy_table,
								default: false
							}
						]
					}
				},
				{
					component: 'parameters-table',
					displayCondition: this.conf.copy_table,
					props: {
						tableTitle: 'Destination Table',
						description: 'The Destination Table where the dataset will be keeped',
						columns: [
							{
								label: 'Type',
								field: 'source_type',
								width: '150px'
							},
							{
								label: 'Project ID',
								field: 'dest_gcp_project_id'
							},
							{
								label: 'Dataset',
								field: 'dest_gbq_dataset'
							},
							{
								label: 'Table Name',
								field: 'dest_gbq_table'
							},
							{
								label: 'Table Suffix',
								field: 'dest_gbq_table_suffix'
							}
						],
						rows: [
							{
								source_type: 'BigQuery',
								dest_gcp_project_id: this.conf.dest_gcp_project_id,
								dest_gbq_dataset: this.conf.dest_gbq_dataset,
								dest_gbq_table: this.conf.dest_gbq_table,
								dest_gbq_table_suffix: this.conf.dest_gbq_table_suffix
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Create / Update',
						description: 'When and Who create / update the configuration',
						columns: [
							{
								label: 'Update Date',
								field: 'update_date',
								type: 'date',
								dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", // expects 2018-03-16 yyyy-MM-dd'T'HH:mm:ss.SSSxxx
								dateOutputFormat: 'yyyy-MM-dd HH:mm:ss' // outputs Mar 16th 2018
							},
							{
								label: 'Updated By',
								field: 'updated_by'
							},
							{
								label: 'Creation Date',
								field: 'creation_date',
								type: 'date',
								dateInputFormat: "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", // expects 2018-03-16
								dateOutputFormat: 'yyyy-MM-dd HH:mm:ss' // outputs Mar 16th 2018
							},
							{
								label: 'Created By',
								field: 'created_by'
							}
						],
						rows: [
							{
								update_date: this.conf.update_date,
								updated_by: this.conf.updated_by,
								creation_date: this.conf.creation_date,
								created_by: this.conf.created_by
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
					}
				}
			];
		}
	}
};
