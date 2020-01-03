<template>
	<div>
		<data-management-header :tabsItems="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import TabsItemsMixin from '../tabs-items';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'gcs-to-gcs-runs-item-view',
	mixins: [TabsItemsMixin, ItemMixin],
	data() {
		return {
			moduleName: 'mirrorExcGcsToGcsRuns'
		};
	},
	methods: {
		getDestinationStorageRows() {
			let destinationStorageRows = [];

			for (let i = 0; i < this.item.configuration_context.destination_bucket.length; i++) {
				destinationStorageRows.push({
					destination_type: 'GCS',
					destination_storage_id: this.item.configuration_context.destination_bucket[i],
					destination_input_folder: this.item.configuration_context.destination_gcs_prefix[i]
				});
			}

			return destinationStorageRows;
		},
		getFileNameTemplateRows() {
			return this.item.configuration_context.filename_templates.map(filename => {
				return {
					filename_template: filename,
					filename_description: 'No Description'
				};
			});
		}
	},
	computed: {
		itemTabsItems() {
			return [
				{
					label: 'Run Details',
					href: 'run-details',
					component: {
						name: 'overview-component',
						props: {
							data: this.runDetailsData
						}
					}
				},
				{
					label: 'Configuration',
					href: 'configuration',
					component: {
						name: 'overview-component',
						props: {
							data: this.configurationData
						}
					}
				},
				{
					label: 'Full Json',
					href: 'full-json',
					component: {
						name: 'view-json',
						props: {
							json: this.item,
							jsonId: this.itemId
						}
					}
				},
				{
					label: 'Conversation',
					href: 'conversation',
					component: {
						name: 'view-conversation',
						props: {}
					}
				}
			];
		},
		runDetailsData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						activeHeader: true,
						viewId: this.item.gcs_triggering_file,
						viewType: 'run',
						description: null,
						runStatus: this.item.status
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the Table to Storage Run',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.item.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.item.environment
							},
							{
								id: 'matching_filename_template',
								label: 'Filename Matched',
								value: this.item.matching_filename_template
							},
							{
								id: 'gcs_triggering_file',
								label: 'File Triggered',
								value: this.item.gcs_triggering_file
							},
							{
								id: 'dag_id',
								label: 'Dag Id',
								value: this.item.dag_id
							},
							{
								id: 'cloud_function_triggered',
								label: 'Cloud Function Triggered',
								value: this.item.cloud_function_triggered
							},
							{
								id: 'job_id',
								label: 'Job Id',
								value: this.item.job_id
							},
							{
								id: 'dag_execution_date',
								label: 'Execution Date',
								value: this.item.dag_execution_date
							},
							{
								id: 'dag_run_id',
								label: 'Dag Run Id',
								value: this.item.dag_run_id
							}
						]
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Source Storage',
						description: 'Source Storage of the file to copy',
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
								source_storage_id: this.item.configuration_context.source_bucket,
								source_input_folder: this.item.configuration_context.source_gcs_prefix,
								source_archive_folder: this.item.configuration_context.source_archive_prefix
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: false
					}
				},
				{
					component: 'parameters-table',
					props: {
						tableTitle: 'Destination Storage(s)',
						description: 'Multi destination storages for the copied file',
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
						rows: this.getDestinationStorageRows(),
						vflexLength: 'xs7',
						lineNumbers: false,
						searchOptionsEnabled: false
					}
				}
			];
		},
		configurationData() {
			if (!this.item) return;

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						activeHeader: false,
						viewId: this.item.configuration_context.source_bucket,
						viewType: 'conf',
						description: null
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						tooltip: true,
						description: 'Context of the GCS to GCS configuration',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.item.configuration_context.account
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.item.configuration_context.environment
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
								source_storage_id: this.item.configuration_context.source_bucket,
								source_input_folder: this.item.configuration_context.source_gcs_prefix,
								source_archive_folder: this.item.configuration_context.source_archive_prefix
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
						rows: this.getDestinationStorageRows(),
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
							'Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template',
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
						rows: this.getFileNameTemplateRows(),
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: false
					}
				},
				{
					component: 'create-update-conf-overview',
					props: {
						creationDate: this.item.configuration_context.creation_date,
						updateDate: this.item.configuration_context.update_date,
						createdBy: this.item.configuration_context.created_by,
						updatedBy: this.item.configuration_context.updated_by
					}
				}
			];
		}
	}
};
</script>
