<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<HeaderDocView
					:item="conf"
					collection="storageToTableConf"
					:viewId="confId"
					:activatedConfStatus="conf.activated"
					:activeHeader="activeHeader"
					viewType="conf"
					:description="tableDescription"
				/>
				<ParametersList
					groupTitle="Context"
					description="Context of the Storage to Table configuration"
					:paramItems="paramContext"
				/>
				<ParametersTable
					tableTitle="Source Storage"
					description="Source Storage of the file to load"
					:columns="sourceStorageColumns"
					:rows="sourceStorageRows"
					vflexLength="xs9"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				/>
				<ParametersTable
					tableTitle="Destination Table"
					description="The destination table for the file to load"
					:columns="destinationTableColumns"
					:rows="destinationTableRows"
					vflexLength="xs7"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				/>
				<ParametersList
					groupTitle="Parameters"
					description="Main Storage to Table parameters"
					:paramItems="paramItems"
				/>
				<ParametersList
					groupTitle="Options"
					description="Storage to Table optionnal configurations"
					:paramItems="paramItemsOptions"
				/>
				<CreateUpdateConfOverview
					:creationDate="conf.creation_date"
					:updateDate="conf.update_date"
					:createdBy="conf.created_by"
					:updatedBy="conf.updated_by"
				/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ParametersTable from '@/components/common/tmp/ParametersTable.vue';
import HeaderDocView from '@/components/common/HeaderDocView.vue';
import ParametersList from '@/components/common/tmp/ParametersList.vue';
import CreateUpdateConfOverview from '@/components/common/configuration/CreateUpdateConfOverview.vue';
export default {
	components: {
		HeaderDocView,
		ParametersList,
		ParametersTable,
		CreateUpdateConfOverview
	},
	props: {
		conf: undefined,
		confId: undefined,
		activeHeader: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({
		sourceStorageColumns: [
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
		destinationTableColumns: [
			{
				label: 'GCP Project',
				field: 'gcp_project',
				width: '150px'
			},
			{
				label: 'Dataset',
				field: 'gbq_dataset',
				width: '150px'
			},
			{
				label: 'Destination Table',
				field: 'table_name',
				width: '200px'
			}
		]
	}),
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	},
	computed: {
		tableDescription() {
			return this.conf.table_description != undefined
				? this.conf.table_description
				: '⚠ Please, add a table description in the configuration file';
		},
		sourceStorageRows() {
			return [
				{
					source_type: 'GCS',
					source_storage_id: this.conf.source_bucket,
					source_input_folder: this.conf.gcs_prefix,
					source_archive_folder: this.conf.archive_prefix
				}
			];
		},
		destinationTableRows() {
			return [
				{
					gcp_project: this.conf.gcp_project,
					gbq_dataset: this.conf.gbq_dataset,
					table_name: this.conf.table_name
				}
			];
		},
		paramContext() {
			return [
				{ id: 'account', label: 'Account', value: this.conf.account },
				{
					id: 'environment',
					label: 'Environment',
					value: this.conf.environment
				},
				{
					id: 'filetemplate',
					label: 'File Name Template',
					value: this.conf.id
				}
			];
		},
		paramItems() {
			return [
				{
					id: 'create_disposition',
					label: 'Create Disposition',
					value: this.conf.create_disposition
				},
				{
					id: 'field_delimiter',
					label: 'Field Delimiter',
					value: this.conf.field_delimiter
				},
				{
					id: 'skip_leading_rows',
					label: 'Skip Leading Rows',
					value: this.conf.skip_leading_rows
				},
				{
					id: 'source_format',
					label: 'Source Format',
					value: this.conf.source_format
				},
				{
					id: 'write_disposition',
					label: 'Write Disposition',
					value: this.conf.write_disposition
				}
			];
		},
		paramItemsOptions() {
			return [
				{
					id: 'bq_load_job_ignore_unknown_values',
					label: 'Ignore extra values',
					value: this.conf.bq_load_job_ignore_unknown_values,
					default: 'false',
					description: 'Ignore extra values not represented in the table schema.'
				},
				{
					id: 'bq_load_job_max_bad_records',
					label: 'Max bad records',
					value: this.conf.bq_load_job_max_bad_records,
					default: '0',
					description: 'Number of invalid rows to ignore.'
				},
				{
					id: 'bq_load_job_quote_character',
					label: 'Quote Character',
					value: this.conf.bq_load_job_quote_character,
					default: `"`
				},
				{
					id: 'bq_load_job_schema_update_options',
					label: 'Schema Update Options',
					value: this.conf.bq_load_job_schema_update_options,
					default: '[ ]',
					description: 'Specifies updates to the destination table schema to allow as a side effect of the load job.'
				},
				{
					id: 'bq_load_job_null_marker',
					label: 'Null Marker',
					value: this.conf.bq_load_job_null_marker,
					default: '""',
					description: 'Represents a null value (CSV only).'
				},
				{
					id: 'bq_load_job_allow_quoted_newlines',
					label: 'Allow quoted new lines',
					value: this.conf.bq_load_job_allow_quoted_newlines,
					default: 'false',
					description: 'Allow quoted data containing newline characters (CSV only).'
				},
				{
					id: 'bq_load_job_allow_jagged_rows',
					label: 'Allow jagged rows',
					value: this.conf.bq_load_job_allow_jagged_rows,
					default: 'false',
					description: 'Allow missing trailing optional columns (CSV only).'
				}
			];
		}
	}
};
</script>

<style></style>
