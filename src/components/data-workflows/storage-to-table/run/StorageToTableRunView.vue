<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<HeaderDocView
					:item="run"
					collection="storageToTableRun"
					:viewId="run.gbq_table_refreshed"
					:runStatus="run.status"
					:activeHeader="activeHeader"
					viewType="run"
				/>
				<ParametersList groupTitle="Context" description="Context of the GCS To GBQ Run" :paramItems="paramContext" />
				<ParametersList groupTitle="Source" description="Source of the GCS To GBQ Run" :paramItems="paramSource" />
				<ParametersList
					groupTitle="Destination"
					description="Destination of the GCS To GBQ Run"
					:paramItems="paramDestination"
				/>
				<ParametersList groupTitle="Run Details" description="Details of the GCS To GBQ Run" :paramItems="paramItems" />
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import HeaderDocView from '@/components/data-workflows/common/HeaderDocView.vue';
import ParametersList from '@/components/data-workflows/common/item/parameters/ParametersList.vue';
export default {
	components: {
		HeaderDocView,
		ParametersList
	},
	props: {
		run: {
			type: Object,
			default: undefined
		},
		runId: {
			type: String,
			default: 'Run ID'
		},
		activeHeader: {
			type: Boolean,
			default: true
		}
	},
	data: () => ({}),
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	},
	computed: {
		paramContext() {
			return [
				{ id: 'account', label: 'Account', value: this.run.account },
				{
					id: 'environment',
					label: 'Environnement',
					value: this.run.environment
				}
			];
		},
		paramSource() {
			return [
				{
					id: 'storage_type',
					label: 'Storage Type',
					value: 'Google Cloud Storage'
				},
				{
					id: 'source_bucket',
					label: 'Source Storage ID',
					value: this.run.source_bucket
				},
				{
					id: 'gcs_prefix',
					label: 'Source Folder',
					value: this.run.gcs_prefix
				},
				{
					id: 'filename_template',
					label: 'Filename Matched',
					value: this.run.filename_template
				},
				{
					id: 'gcs_triggering_file',
					label: 'File Triggered',
					value: this.run.gcs_triggering_file
				}
			];
		},
		paramDestination() {
			return [
				{
					id: 'database_type',
					label: 'Database Type',
					value: 'Google Big Query'
				},
				{
					id: 'gbq_project',
					label: 'GCP Project ID',
					value: this.run.configuration_context.gcp_project
				},
				{
					id: 'gbq_dataset',
					label: 'Big Query Dataset',
					value: this.run.configuration_context.gbq_dataset
				},
				{
					id: 'gbq_destination_table',
					label: 'Destination Table',
					value: this.run.configuration_context.table_name
				},
				{
					id: 'gbq_table_refreshed',
					label: 'Table refreshed',
					value: this.run.gbq_table_refreshed
				}
			];
		},
		paramItems() {
			return [
				{
					id: 'dag_id',
					label: 'Dag Id',
					value: this.run.dag_id
				},
				{
					id: 'job_id',
					label: 'Job Id',
					value: this.run.job_id
				},
				{
					id: 'dag_execution_date',
					label: 'Execution Date',
					value: this.run.dag_execution_date
				},
				{
					id: 'dag_run_id',
					label: 'Dag Run Id',
					value: this.run.dag_run_id
				}
			];
		}
	}
};
</script>

<style></style>
