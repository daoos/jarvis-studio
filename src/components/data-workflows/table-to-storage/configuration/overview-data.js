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
						description: 'Context of the Table to Storage configuration',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.conf.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.conf.environment
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
								value: this.conf.compression
							},
							{
								id: 'field_delimiter',
								label: 'Field Delimiter',
								value: this.conf.field_delimiter
							},
							{
								id: 'delete_dest_bucket_content',
								label: 'Delete Destination Storage Content',
								value: this.conf.delete_dest_bucket_content
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
								value: 'SQL File Linked to modal view as in the table to table configuration view'
							},
							{
								id: 'copy_table',
								label: 'Keep Table',
								value: this.conf.copy_table
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
								gcs_dest_bucket: this.conf.dest_gcp_project_id,
								gcs_dest_prefix: this.conf.dest_gbq_dataset,
								output_filename: this.conf.dest_gbq_table,
								dest_gbq_table_suffix: this.conf.dest_gbq_table_suffix
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
