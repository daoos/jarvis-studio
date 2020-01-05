<template>
	<div>
		<data-management-header :tabs-items="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" />
	</div>
</template>

<script>
import DataManagementHeader from '@/components/app/headers/DataManagementHeader';
import ItemComponent from '@/components/data-workflows/common/ItemComponent';

import TabsItemsMixin from '../tabs-items';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'table-to-storage-runs-item-view',
	components: { DataManagementHeader, ItemComponent },
	mixins: [TabsItemsMixin, ItemMixin],
	data: () => ({
		item: null,
		moduleName: 'tableToStorageRuns'
	}),
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
						viewId: this.item.firestore_conf_doc_id,
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
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Main parameters',
						tooltip: true,
						description: 'Main parameters of the Table to Storage Run',
						paramItems: [
							{
								id: 'firestore_conf_doc_id',
								label: 'Configuration Id',
								value: this.item.firestore_conf_doc_id
							},
							{
								id: 'destination_bucket',
								label: 'Destination Bucket',
								value: this.item.destination_bucket
							},
							{
								id: 'output_filename',
								label: 'Output Finame',
								value: this.item.output_filename
							}
						]
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Run Details',
						tooltip: true,
						description: 'Details of the Table to Storage Run',
						paramItems: [
							{
								id: 'dag_type',
								label: 'Dag Type',
								value: this.item.dag_type
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
							},
							{
								id: 'dag_generator_version',
								label: 'Dag Generator Version',
								value: this.item.dag_generator_version
							}
						]
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
						viewId: this.item.firestore_conf_doc_id,
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
						description: 'Context of the Table to Storage configuration',
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
								gcs_dest_bucket: this.item.configuration_context.gcs_dest_bucket,
								gcs_dest_prefix: this.item.configuration_context.gcs_dest_prefix,
								output_filename: this.item.configuration_context.output_filename
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
								value: this.item.configuration_context.compression,
								default: 'None'
							},
							{
								id: 'field_delimiter',
								label: 'Field Delimiter',
								value: this.item.configuration_context.field_delimiter,
								default: '|'
							},
							{
								id: 'delete_dest_bucket_content',
								label: 'Delete Destination Storage Content',
								value: this.item.configuration_context.delete_dest_bucket_content,
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
								value: this.item.configuration_context.gcp_project
							},
							{
								id: '',
								label: 'SQL File',
								component: 'sql-viewer',
								properties: {
									id: this.item.configuration_context.id,
									sql: this.item.sql_query
								}
							},
							{
								id: 'copy_table',
								label: 'Keep Table',
								value: this.item.configuration_context.copy_table,
								default: false
							}
						]
					}
				},
				{
					component: 'parameters-table',
					displayCondition: this.item.configuration_context.copy_table,
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
								dest_gcp_project_id: this.item.configuration_context.dest_gcp_project_id,
								dest_gbq_dataset: this.item.configuration_context.dest_gbq_dataset,
								dest_gbq_table: this.item.configuration_context.dest_gbq_table,
								dest_gbq_table_suffix: this.item.configuration_context.dest_gbq_table_suffix
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: 'false'
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