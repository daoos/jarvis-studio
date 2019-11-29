// TODO: Update file with real components & data

export default {
	computed: {
		getRows() {
			//Combine the two array this.conf.destination_bucket and this.conf.destination_input_prefix
			// into a array of json ==> Can't use map :(
			// TODO: Remove
			if (!this.conf) return [];

			let destinationStorageRows = [];
			for (let i = 0; i < this.conf.destination_bucket.length; i++) {
				destinationStorageRows.push({
					destination_type: 'GCS',
					destination_storage_id: this.conf.destination_bucket[i],
					destination_input_folder: this.conf.destination_gcs_prefix[i]
				});
			}
			return destinationStorageRows;
		},
		fileNameTemplateRows() {
			// TODO: Remove
			if (!this.conf) return [];

			var filename_templates_rows = this.conf.filename_templates.map(function(filename) {
				return {
					filename_template: filename,
					filename_description: 'No Description'
				};
			});
			return filename_templates_rows;
		},
		overviewData() {
			return [
				{
					component: 'overview-header',
					props: {
						activeHeader: true,
						viewId: this.confId,
						viewType: 'conf',
						// activatedConfStatus: null,
						// runStatus: null,
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
								id: 'account',
								label: 'Account',
								// TODO: Remove
								value: this.conf ? this.conf.account : null
							},
							{
								id: 'environment',
								label: 'Environment',
								// TODO: Remove
								value: this.conf ? this.conf.environment : null
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Source Storage',
						description: 'Source Storage of the files to copy',
						columns: [
							{
								label: 'Type',
								field: 'source_type',
								width: '100px'
							},
							{
								label: 'Storage ID',
								field: 'source_storage_id',
								width: '200px'
							},
							{
								label: 'Source Folder',
								field: 'source_input_folder',
								width: '200px'
							},
							{
								label: 'Archive Folder',
								field: 'source_archive_folder',
								width: '200px'
							}
						],
						rows: [
							{
								source_type: 'GCS',
								// TODO: Remove
								source_storage_id: this.conf ? this.conf.source_bucket : null,
								source_input_folder: this.conf ? this.conf.source_gcs_prefix : null,
								source_archive_folder: this.conf ? this.conf.source_archive_prefix : null
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
						tableTitle: 'Destination Storage(s)',
						description: 'Multi destination storages for the copied files',
						columns: [
							{
								label: 'Type',
								field: 'destination_type',
								width: '100px'
							},
							{
								label: 'Storage ID',
								field: 'destination_storage_id',
								width: '200px'
							},
							{
								label: 'Destination Folder',
								field: 'destination_input_folder',
								width: '230px'
							}
						],
						// TODO: Remove
						rows: this.getRows,
						vflexLength: 'xs7',
						lineNumbers: false,
						searchOptionsEnabled: false
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'File Name Template(s)',
						description:
							'Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template ',
						columns: [
							{
								label: 'File Name Template',
								field: 'filename_template'
							},
							{
								label: 'File Name Description',
								field: 'filename_description'
							}
						],
						rows: this.fileNameTemplateRows
					}
				}
			];
		}
	}
};
