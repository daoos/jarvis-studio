<template>
	<v-container grid-list-xl>
		<v-layout row wrap>
			<v-flex xs12 offset-xs0>
				<HeaderDocView
					:viewId="configurationId"
					:activatedConfStatus="conf.activated"
					:activeHeader="activeHeader"
					viewType="conf"
				/>
				<ParametersList
					groupTitle="Context"
					description="Context of the Storage to Storage configuration"
					:paramItems="paramItems"
				/>
				<ParametersTable
					tableTitle="Source Storage"
					description="Source Storage of files to copy"
					:columns="sourceStorageColumns"
					:rows="sourceStorageRows"
					vflexLength="xs10"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
				></ParametersTable>
				<ParametersTable
					tableTitle="GCS Destinations"
					description="Multi GCS destinations for copied files"
					:columns="gcsDestinationStorageColumns"
					:rows="destinationStorageRows.gcs"
					vflexLength="xs10"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
					v-if="destinationStorageRows.gcs.length > 0"
				></ParametersTable>
				<ParametersTable
					tableTitle="S3 Destinations"
					description="Multi S3 destinations for copied files"
					:columns="s3DestinationStorageColumns"
					:rows="destinationStorageRows.s3"
					vflexLength="xs10"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
					v-if="destinationStorageRows.s3.length > 0"
				></ParametersTable>
				<ParametersTable
					tableTitle="SFTP Destinations"
					description="Multi SFTP destinations for copied files"
					:columns="sftpDestinationStorageColumns"
					:rows="destinationStorageRows.sftp"
					vflexLength="xs12"
					:lineNumbers="false"
					:searchOptionsEnabled="false"
					v-if="destinationStorageRows.sftp.length > 0"
				></ParametersTable>
				<ParametersTable
					tableTitle="File Name Template(s)"
					description="Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template "
					:columns="fileNameTemplateColumns"
					:rows="fileNameTemplateRows"
				></ParametersTable>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import ParametersTable from "@/components/widgets/parameters/ParametersTable.vue";
import HeaderDocView from "@/components/widgets/parameters/HeaderDocView.vue";
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";
export default {
	components: {
		ParametersTable,
		HeaderDocView,
		ParametersList
	},
	props: {
		conf: undefined,
		activeHeader: {
			type: Boolean,
			default: true
		},
		configurationId: {
			type: String,
			default: "Configuration Id"
		}
	},
	data: () => ({
		fileNameTemplateColumns: [
			{
				label: "File Name Template",
				field: "filename_template"
			},
			{
				label: "File Name Description",
				field: "file_description"
			}
		],
		gcsSourceStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "100px"
			},
			{
				label: "Source Bucket",
				field: "gcs_source_bucket",
				width: "200px"
			},
			{
				label: "Source Folder",
				field: "gcs_source_prefix",
				width: "200px"
			},
			{
				label: "Archive Folder",
				field: "gcs_archive_prefix",
				width: "200px"
			}
		],
		s3SourceStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "100px"
			},
			{
				label: "AWS Access Key",
				field: "aws_access_key",
				width: "200px"
			}
		],
		sftpSourceStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "100px"
			},
			{
				label: "SFTP Host",
				field: "sftp_host",
				width: "200px"
			},
			{
				label: "SFTP Port",
				field: "sftp_port",
				width: "50px"
			},
			{
				label: "SFTP User",
				field: "sftp_userid",
				width: "200px"
			},
			{
				label: "Source Directory",
				field: "sftp_source_directory",
				width: "200px"
			},
			{
				label: "Source Filename",
				field: "sftp_source_filename",
				width: "200px"
			}
		],
		gcsDestinationStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "100px"
			},
			{
				label: "Destination Bucket",
				field: "gcs_destination_bucket",
				width: "200px"
			},
			{
				label: "Destination Folder",
				field: "gcs_destination_prefix",
				width: "200px"
			}
		],
		s3DestinationStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "100px"
			},
			{
				label: "Destination S3 bucket",
				field: "s3_bucket",
				width: "200px"
			},
			{
				label: "Destination Folder",
				field: "s3_destination_prefix",
				width: "200px"
			},
			{
				label: "AWS Access Key",
				field: "aws_access_key",
				width: "200px"
			}
		],
		sftpDestinationStorageColumns: [
			{
				label: "Type",
				field: "type",
				width: "50px"
			},
			{
				label: "Host",
				field: "sftp_host",
				width: "100px"
			},
			{
				label: "Port",
				field: "sftp_port",
				width: "50px"
			},
			{
				label: "User",
				field: "sftp_userid",
				width: "100px"
			},
			{
				label: " Directory",
				field: "sftp_destination_dir",
				width: "100px"
			},
			{
				label: "Top File Name",
				field: "generate_top_file",
				width: "100px"
			},
			{
				label: "Create Dir",
				field: "sftp_destination_dir_create",
				width: "100px"
			}
		]
	}),
	methods: {
		goBack() {
			this.$router.go(-1);
		}
	},
	computed: {
		fileNameTemplateRows() {
			return this.conf.filename_templates;
		},
		sourceStorageColumns() {
			let sourceStorageColumns = {};
			switch (this.conf.source.type) {
				case "gcs":
					sourceStorageColumns = this.gcsSourceStorageColumns;
					break;
				case "s3":
					sourceStorageColumns = this.s3SourceStorageColumns;
					break;
				case "sftp":
					sourceStorageColumns = this.sftpSourceStorageColumns;
					break;
			}
			return sourceStorageColumns;
		},
		sourceStorageRows() {
			let source_type = this.conf.source.type;
			let sourceStorageRows = [];
			let sourceStorageRow = {};
			switch (source_type) {
				case "gcs":
					// sourceStorage attribut for GCS bucket
					sourceStorageRow.type = this.conf.source.type;
					sourceStorageRow.gcs_source_bucket = this.conf.source.gcs_source_bucket;
					sourceStorageRow.gcs_source_prefix = this.conf.source.gcs_source_prefix;
					sourceStorageRow.gcs_archive_prefix = this.conf.source.gcs_archive_prefix;
					sourceStorageRow.gcp_credentials_secret = this.conf.source.gcp_credentials_secret;
					sourceStorageRows.push(sourceStorageRow);
					break;
				case "s3":
					// sourceStorage attribut for S3 bucket
					sourceStorageRow.type = this.conf.source.type;
					sourceStorageRow.aws_access_key = this.conf.source.aws_access_key;
					sourceStorageRow.aws_access_key_secret = this.conf.source.aws_access_key_secret;
					sourceStorageRows.push(sourceStorageRow);
					break;
				case "sftp":
					// sourceStorage attribut for sftp folder
					sourceStorageRow.type = this.conf.source.type;
					sourceStorageRow.sftp_source_filename = this.conf.source.sftp_source_filename;
					sourceStorageRow.sftp_source_directory = this.conf.source.sftp_source_directory;
					sourceStorageRow.sftp_host = this.conf.source.sftp_host;
					sourceStorageRow.sftp_port = this.conf.source.sftp_port;
					sourceStorageRow.sftp_userid = this.conf.source.sftp_userid;
					sourceStorageRow.sftp_password_secret = this.conf.source.sftp_password_secret;
					sourceStorageRows.push(sourceStorageRow);
					break;
				default:
				// code block
			}
			return sourceStorageRows;
		},
		destinationStorageRows() {
			// Build 3 arrays for each destination type (gcs,s3,sftp)
			let destinationStorageRows = { gcs: [], s3: [], sftp: [] };
			let gcsDestinationStorageRows = [];
			let s3DestinationStorageRows = [];
			let sftpDestinationStorageRows = [];
			for (var i = 0; i < this.conf.destinations.length; i++) {
				switch (this.conf.destinations[i].type) {
					case "gcs":
						gcsDestinationStorageRows.push({
							type: this.conf.destinations[i].type,
							gcs_destination_bucket: this.conf.destinations[i]
								.gcs_destination_bucket,
							gcs_destination_prefix: this.conf.destinations[i]
								.gcs_destination_prefix,
							gcp_credentials_secret: this.conf.destinations[i]
								.gcp_credentials_secret
						});
						break;
					case "s3":
						s3DestinationStorageRows.push({
							type: this.conf.destinations[i].type,
							s3_bucket: this.conf.destinations[i].s3_bucket,
							s3_destination_prefix: this.conf.destinations[i]
								.s3_destination_prefix,
							aws_access_key: this.conf.destinations[i].aws_access_key,
							aws_access_key_secret: this.conf.destinations[i]
								.aws_access_key_secret
						});
						break;
					case "sftp":
						sftpDestinationStorageRows.push({
							type: this.conf.destinations[i].type,
							sftp_host: this.conf.destinations[i].sftp_host,
							sftp_port: this.conf.destinations[i].sftp_port,
							sftp_destination_dir: this.conf.destinations[i]
								.sftp_destination_dir,
							sftp_destination_dir_create: this.conf.destinations[i]
								.sftp_destination_dir_create,
							generate_top_file: this.conf.destinations[i].generate_top_file,
							sftp_password_secret: this.conf.destinations[i]
								.sftp_password_secret
						});
						break;
					default:
					// code block
				}
			}
			destinationStorageRows.gcs = gcsDestinationStorageRows;
			destinationStorageRows.s3 = s3DestinationStorageRows;
			destinationStorageRows.sftp = sftpDestinationStorageRows;
			return destinationStorageRows;
		},
		paramItems() {
			return [
				{ id: "account", label: "Account", value: this.conf.account },
				{
					id: "environment",
					label: "Environment",
					value: this.conf.environment
				}
			];
		}
	}
};
</script>

<style></style>
