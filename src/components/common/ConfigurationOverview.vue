<template>
	<v-container>
		<v-row>
			<v-col cols="12" offset="0">
				<component v-for="item in data" :key="item.component" :is="item.component" :properties="item.props" />

				<!--<ParametersTable
					tableTitle="Source Storage"
					description="Source Storage of the files to copy"
					:columns="sourceStorageColumns"
					:rows="sourceStorageRows"
					vflexLength="xs9"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				/>
				<ParametersTable
					tableTitle="Destination Storage(s)"
					description="Multi destination storages for the copied files"
					:columns="destinationStorageColumns"
					:rows="destinationStorageRows"
					vflexLength="xs7"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				/>
				<ParametersTable
					tableTitle="File Name Template(s)"
					description="Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template "
					:columns="fileNameTemplateColumns"
					:rows="fileNameTemplateRows"
				/>-->
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
// import ParametersTable from '@/components/widgets/parameters/ParametersTable.vue';
// import HeaderDocView from '@/components/widgets/parameters/HeaderDocView.vue';
// import ParametersList from '@/components/widgets/parameters/ParametersList.vue';

import OverviewHeader from './OverviewHeader';
import ParametersList from './ParametersList';

export default {
	name: 'gbq-to-gcs-configuration-overview',
	components: { OverviewHeader, ParametersList },
	props: {
		data: {
			type: Array,
			required: true
		}
	},
	data: () => ({
		fileNameTemplateColumns: [
			{
				label: 'File Name Template',
				field: 'filename_template'
			},
			{
				label: 'File Name Description',
				field: 'filename_description'
			}
		],
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
	computed: {
		fileNameTemplateRows() {
			var filename_templates_rows = this.conf.filename_templates.map(function(filename) {
				return {
					filename_template: filename,
					filename_description: 'No Description'
				};
			});
			return filename_templates_rows;
		},
		sourceStorageRows() {
			return [
				{
					source_type: 'GCS',
					source_storage_id: this.conf.source_bucket,
					source_input_folder: this.conf.source_gcs_prefix,
					source_archive_folder: this.conf.source_archive_prefix
				}
			];
		},
		destinationStorageRows() {
			//Combine the two array this.conf.destination_bucket and this.conf.destination_input_prefix into a array of json.
			//Can't use map :(
			var destinationStorageRows = [];
			for (var i = 0; i < this.conf.destination_bucket.length; i++) {
				destinationStorageRows.push({
					destination_type: 'GCS',
					destination_storage_id: this.conf.destination_bucket[i],
					destination_input_folder: this.conf.destination_gcs_prefix[i]
				});
			}
			return destinationStorageRows;
		}
	}
};
</script>
