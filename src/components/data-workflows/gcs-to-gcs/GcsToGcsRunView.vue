<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<HeaderDocView :viewId="runId" :runStatus="run.status" :activeHeader="activeHeader" viewType="run" />
				<ParametersList
					groupTitle="Run Details"
					description="Details of the Storage to Storage run"
					:paramItems="paramItems"
				/>
				<ParametersTable
					tableTitle="Source Storage"
					description="Source Storage of the file to copy"
					:columns="sourceStorageColumns"
					:rows="sourceStorageRows"
					vflexLength="xs9"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				></ParametersTable>
				<ParametersTable
					tableTitle="Destination Storage(s)"
					description="Multi destination storages for the copied file"
					:columns="destinationStorageColumns"
					:rows="destinationStorageRows"
					vflexLength="xs7"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				></ParametersTable>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import HeaderDocView from '@/components/common/HeaderDocView.vue';
import ParametersList from '@/components/common/tmp/ParametersList.vue';
import ParametersTable from '@/components/common/tmp/ParametersTable.vue';
export default {
	components: {
		HeaderDocView,
		ParametersList,
		ParametersTable
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
		destinationStorageColumns: [
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
		]
	}),
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	},
	computed: {
		paramItems() {
			return [
				{ id: 'account', label: 'Account', value: this.run.account },
				{
					id: 'environment',
					label: 'Environnement',
					value: this.run.environment
				},
				{
					id: 'matching_filename_template',
					label: 'Filename Matched',
					value: this.run.matching_filename_template
				},
				{
					id: 'gcs_triggering_file',
					label: 'File Triggered',
					value: this.run.gcs_triggering_file
				},
				{
					id: 'dag_id',
					label: 'Dag Id',
					value: this.run.dag_id
				},
				{
					id: 'cloud_function_triggered',
					label: 'Cloud Function Triggered',
					value: this.run.cloud_function_triggered
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
		},
		sourceStorageRows() {
			return [
				{
					source_type: 'GCS',
					source_storage_id: this.run.configuration_context.source_bucket,
					source_input_folder: this.run.configuration_context.source_gcs_prefix,
					source_archive_folder: this.run.configuration_context.source_archive_prefix
				}
			];
		},
		destinationStorageRows() {
			//Combine the two array this.run.destination_bucket and this.run.destination_input_prefix into a array of json.
			//Can't use map :(
			var destinationStorageRows = [];
			for (var i = 0; i < this.run.configuration_context.destination_bucket.length; i++) {
				destinationStorageRows.push({
					destination_type: 'GCS',
					destination_storage_id: this.run.configuration_context.destination_bucket[i],
					destination_input_folder: this.run.configuration_context.destination_gcs_prefix[i]
				});
			}
			return destinationStorageRows;
		}
	}
};
</script>

<style></style>
