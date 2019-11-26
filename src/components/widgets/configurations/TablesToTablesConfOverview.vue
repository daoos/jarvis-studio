<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<HeaderDocView
					:viewId="confId"
					:activatedConfStatus="conf.configuration.activated"
					:activeHeader="activeHeader"
					viewType="conf"
					:description="dagDescription"
				/>
				<ParametersList
					groupTitle="Context"
					description="Context of the Tables to Tables configuration"
					:paramItems="paramContext"
				/>
				<TablesToTablesDagChart :task_dependencies="conf.configuration.task_dependencies" :dagId="confId" />
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
import HeaderDocView from '@/components/widgets/parameters/HeaderDocView.vue';
import ParametersList from '@/components/widgets/parameters/ParametersList.vue';
import CreateUpdateConfOverview from '@/components/widgets/configurations/CreateUpdateConfOverview.vue';
import TablesToTablesDagChart from '@/components/widgets/configurations/TablesToTablesDagChart.vue';

export default {
	components: {
		HeaderDocView,
		ParametersList,
		CreateUpdateConfOverview,
		TablesToTablesDagChart
	},
	props: {
		conf: undefined,
		activeHeader: {
			type: Boolean,
			default: true
		},
		confId: {
			type: String,
			default: 'Conf Id'
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
		dagDescription() {
			return this.conf.configuration.short_description != undefined
				? this.conf.configuration.short_description
				: '⚠ Please, add a dag description in the configuration file';
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
					id: 'default_gcp_project_id',
					label: 'Default Project',
					value: this.conf.configuration.default_gcp_project_id,
					description: 'Default Project ID used by the tasks'
				},
				{
					id: 'default_bq_dataset',
					label: 'Default Dataset',
					value: this.conf.configuration.default_bq_dataset,
					description: 'Default Dataset used by the tasks'
				},
				{
					id: 'start_date',
					label: 'Start Date',
					value: this.conf.configuration.start_date,
					description: `Start date of the DAG. The format must be : "yyyy, MM, dd" Where : YYYY >= 1970 MM = [1, 12] DD = [1, 31]`
				},
				{
					id: 'catchup',
					label: 'Catchup',
					value: this.conf.configuration.catchup,
					default: 'false',
					description: `This flag will specify to Composer/Airflow to backfill DAG runs upon deployment. If set to "true" AND the DAG is scheduled AND it's "start date" is in set in the past, Composer/Airflow will backfill and execute the DAG until the current date. If not set, the default value is : false`
				},
				{
					id: 'schedule_interval',
					label: 'Schedule Interval',
					value: this.conf.configuration.schedule_interval,
					description: `If the DAG is scheduled, a CRON like string needs to be set, i.e every day at 7:00 => "0 7 * * *"  If scheduling is no required please set to : "None"`
				},
				{
					id: 'default_write_disposition',
					label: 'Default Write Disposition',
					value: this.conf.configuration.default_write_disposition,
					description: 'Default Write Disposition used by the tasks'
				},
				{
					id: 'max_active_runs',
					label: 'Max Active Runs',
					value: this.conf.configuration.max_active_runs,
					default: '1',
					description: 'Number of concurrent DAG runs for this DAG.'
				},
				{
					id: 'task_concurrency',
					label: 'Task Concurrency',
					value: this.conf.configuration.task_concurrency,
					default: '5',
					description: 'Number of concurrent task executions within a DAG run.'
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
