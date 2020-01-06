<template>
	<div>
		<data-management-header :workflowName="workflowName" :tabsItems="tabsItems" />
		<item-component :tabs-items="itemTabsItems" :is-loading="isLoading" :is-not-found="isNotFound" />
	</div>
</template>

<script>
import HeaderInfosMixin from '../header-infos';
import ItemMixin from '@/mixins/data-workflows/item-mixin';

export default {
	name: 'table-to-storage-configurations-item',
	mixins: [HeaderInfosMixin, ItemMixin],
	data() {
		return {
			moduleName: 'tableToStorageConfs'
		};
	},
	computed: {
		itemTabsItems() {
			return [
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
		configurationData() {
			if (!this.item) return [];

			return [
				{
					component: 'view-header',
					props: {
						item: this.item,
						collection: 'tableToStorageConfs',
						activeHeader: true,
						viewId: this.itemId,
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
								gcs_dest_bucket: this.item.gcs_dest_bucket,
								gcs_dest_prefix: this.item.gcs_dest_prefix,
								output_filename: this.item.output_filename
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: false
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
								value: this.item.compression,
								default: 'None'
							},
							{
								id: 'field_delimiter',
								label: 'Field Delimiter',
								value: this.item.field_delimiter,
								default: '|'
							},
							{
								id: 'delete_dest_bucket_content',
								label: 'Delete Destination Storage Content',
								value: this.item.delete_dest_bucket_content,
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
								value: this.item.gcp_project
							},
							{
								id: '',
								label: 'SQL File',
								component: 'sql-viewer',
								properties: {
									id: this.item.id,
									sqlBinary: this.item.sql
								}
							},
							{
								id: 'copy_table',
								label: 'Keep Table',
								value: this.item.copy_table,
								default: false
							}
						]
					}
				},
				{
					component: 'parameters-table',
					displayCondition: this.item.copy_table,
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
								dest_gcp_project_id: this.item.dest_gcp_project_id,
								dest_gbq_dataset: this.item.dest_gbq_dataset,
								dest_gbq_table: this.item.dest_gbq_table,
								dest_gbq_table_suffix: this.item.dest_gbq_table_suffix
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
								update_date: this.item.update_date,
								updated_by: this.item.updated_by,
								creation_date: this.item.creation_date,
								created_by: this.item.created_by
							}
						],
						vflexLength: 'xs9',
						lineNumbers: false,
						searchOptionsEnabled: false
					}
				}
			];
		}
	}
};
</script>
