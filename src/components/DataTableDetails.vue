<template>
	<div>
		<DataModelHeader :tableItems="tableItems" :headerTitle="headerTitle" />

		<v-container class="grey lighten-5">
			<v-row>
				<template v-if="!isFetchAndAdding">
					<template v-if="jsonIsValid">
						<v-col cols="12" offset="0">
							<v-card>
								<v-card-title>
									<v-icon color="blue-grey lighten-3" large class="mr-3">
										table_chart
									</v-icon>
									<span class="display-1 font-weight-bold">
										{{ this.dataTableDetails.id }}
									</span>

									<v-spacer></v-spacer>

									<div class="card-title-right">
										<v-tooltip bottom>
											<template v-slot:activator="{}">
												<span> Last Update: {{ refreshedTimestamp.dateFromNow }} </span>
											</template>
											<span>{{ refreshedTimestamp.dateFormated }}</span>
										</v-tooltip>

										<v-btn @click="getDataTableDetails()">Refresh</v-btn>
										<v-btn @click="queryInBigQuery()" color="secondary">
											Query
										</v-btn>
									</div>
								</v-card-title>

								<v-card-text>
									<v-row>
										<v-col>
											<v-textarea
												name="Description"
												label="Description"
												:value="dataTableDetails.description"
												auto-grow
												rows="1"
												readonly
												outline
											></v-textarea>
										</v-col>
									</v-row>

									<v-row>
										<v-col cols="3">
											<v-text-field
												label="Account"
												:value="dataTableDetails.account"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Project Id"
												:value="this.projectId"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Dataset"
												:value="this.datasetId"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Location"
												:value="dataTableDetails.location"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>
									</v-row>

									<v-row>
										<v-col cols="3">
											<v-text-field
												label="Row Number"
												:value="numRowsFormated"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Table Size"
												:value="numBytesFormated"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Table Type"
												:value="dataTableDetails.kind"
												class="title"
												readonly
												outline
											></v-text-field>
										</v-col>

										<v-col cols="3">
											<v-text-field
												label="Time Partitioned"
												:value="isTimePartitioned"
												class="title"
												readonly
												outline
											/>
										</v-col>
									</v-row>
								</v-card-text>
							</v-card>
						</v-col>

						<v-col cols="12">
							<v-tabs v-model="activeTab" color="grey lighten-3" slider-color="primary">
								<v-tab ripple href="#dataoverview">
									Data Overview
								</v-tab>
								<v-tab ripple href="#schema">
									Schema
								</v-tab>
								<v-tab ripple href="#workflow">
									Workflow
								</v-tab>
								<v-tab ripple href="#documentation">
									Documentation
								</v-tab>
								<v-tab ripple href="#fulljson">
									Full Json
								</v-tab>
								<v-tab-item value="dataoverview">
									<v-card>
										<v-card-title>
											<span class="title">Data Overview</span>
											<v-spacer></v-spacer>
										</v-card-title>
										<v-card-text>
											<vue-good-table
												:columns="this.dataTableOverviewColumns"
												:rows="this.dataTableOverviewRows"
												styleClass="vgt-table condensed striped"
											>
												<template slot="table-row" slot-scope="props">
													<span class="body-1">{{ props.formattedRow[props.column.field] }}</span>
												</template>
											</vue-good-table>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item value="schema">
									<v-card>
										<tableSchemaView :schemaRows="dataTableDetails.schema.fields" />
									</v-card>
								</v-tab-item>
								<v-tab-item value="workflow">
									<v-card>
										<v-card-title>
											<span class="title mt-2 ml-1">{{ dataTableDetails.dag_id }}</span>
											<v-spacer></v-spacer>
										</v-card-title>
										<v-card-text>
											<v-row>
												<v-col>
													<v-textarea
														name="Description"
														label="Description"
														:value="dataTableDetails.short_description"
														auto-grow
														rows="1"
														readonly
														outline
													></v-textarea>
												</v-col>
											</v-row>
											<v-row>
												<v-col cols="5">
													<v-text-field
														label="Workflow Id"
														:value="dataTableDetails.dag_id"
														class="subtitle-1"
														readonly
														outline
													></v-text-field>
												</v-col>
												<v-col cols="2">
													<v-text-field
														label="Workflow Type"
														:value="dataTableDetails.dag_type"
														class="subtitle-1"
														readonly
														outline
													></v-text-field>
												</v-col>
												<v-col cols="3">
													<v-text-field
														label="Workflow Run Id"
														:value="dataTableDetails.dag_run_id"
														class="subtitle-1"
														readonly
														outline
													></v-text-field>
												</v-col>
												<v-col cols="2">
													<v-text-field
														label="Last Modified"
														:value="this.workflowLastModifiedTime"
														class="subtitle-1"
														readonly
														outline
													></v-text-field>
												</v-col>
											</v-row>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item value="documentation">
									<v-card>
										<v-card-text>
											<v-row>
												<v-col class="ml-3" cols="10" offset="0">
													<vue-markdown :source="dataTableDetails.doc_md"></vue-markdown>
												</v-col>
											</v-row>
										</v-card-text>
									</v-card>
								</v-tab-item>
								<v-tab-item value="fulljson">
									<v-card>
										<v-card-title>
											<span class="title">Full Json</span>
											<v-spacer></v-spacer>
										</v-card-title>
										<v-card-text>
											<vue-json-pretty
												:data="this.dataTableDetails"
												:deep="5"
												:show-double-quotes="true"
												:show-length="true"
												:show-line="false"
											>
											</vue-json-pretty>
										</v-card-text>
									</v-card>
								</v-tab-item>
							</v-tabs>
						</v-col>
					</template>

					<JsonSchemaIsInvalid v-else :jsonObject="this.dataTableDetails" :jsonObjectErrors="this.jsonObjectErrors" />
				</template>

				<v-progress-linear v-else :indeterminate="true" />
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import moment from "moment";
import JsonSchemaIsInvalid from "./widgets/jsonvalidations/JsonSchemaIsInvalid.vue";
import DataModelHeader from "./widgets/layout/DataModelHeader";
import tableSchemaView from "@/components/widgets/configurations/TableSchemaView.vue";
// vue-good-table import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";
// library to validate Object Json Schema from Firestore
import Ajv from "ajv";
// library to convert units (bite to Go ) and format number
import * as convert from "convert-units";
import * as numeral from "numeral";
// librairy to vue markdown
import VueMarkdown from "vue-markdown";

export default {
	components: {
		VueJsonPretty,
		tableSchemaView,
		JsonSchemaIsInvalid,
		DataModelHeader,
		VueGoodTable,
		"vue-markdown": VueMarkdown
	},
	data: () => ({
		headerTitle: "Data Model",
		conf: undefined,
		search: "",
		isFetchAndAdding: true,
		expand: false,
		pagination: {
			sortBy: "id",
			descending: true,
			rowsPerPage: 10
		},
		fetchAndAddStatus: "",
		moreToFetchAndAdd: false,
		viewJson: false,
		viewedItem: {},
		confToDeleteFromFirestore: {},
		dialogDeleteConf: false,
		showDetailConfToDelete: false,
		showSnackbarDeleteConfSuccess: false,
		dataTableOverviewColumns: [],
		dataTableOverviewRows: [],
		schemaColumns: [
			{
				label: "Name",
				field: "name"
			},
			{
				label: "Type",
				field: "type"
			},
			{
				label: "Mode",
				field: "mode"
			},
			{
				label: "Description",
				field: "description"
			}
		],
		schemaRows: [],
		activeTab: null,
		jsonIsValid: true,
		jsonObjectErrors: {}
	}),
	async mounted() {
		await this.getDataTableDetails();
	},
	watch: {
		$route() {
			this.getDataTableDetails();
		}
	},
	methods: {
		async getDataTableDetails() {
			this.$data.isFetchAndAdding = true;
			await this.getFirestoreData();
			//Test the Json Schema
			const ajv = new Ajv({ allErrors: true });
			//Get Schema to apply
			const testJson = ajv.compile(JSON.parse(this.schemas["gbq-table-preview-table"].schema));
			//Test Json Schema
			this.jsonIsValid = testJson(this.dataTableDetails);
			this.jsonObjectErrors = testJson.errors;
			if (this.jsonIsValid) {
				this.dataTableOverviewRows = Object.values(this.dataTableDetails.json);
				const dataTableOverviewColumnsKey = Object.keys(this.dataTableOverviewRows[0]);
				this.dataTableOverviewColumns = dataTableOverviewColumnsKey.map(function(data) {
					return {
						label: data,
						field: data
					};
				});
				this.schemaRows = Object.values(this.dataTableDetails.schema.fields);
			}
			this.$data.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			try {
				await store.dispatch("dataTableDetails/closeDBChannel", {
					clearModule: true
				});
				await store.dispatch("dataTableDetails/fetchAndAdd", {
					projectId: this.projectId,
					datasetId: this.datasetId,
					tableId: this.tableId,
					limit: 0
				});
				this.$data.fetchAndAddStatus = "Success";
			} catch (e) {
				console.log("Firestore Error catched");
				console.log(e);
				this.$data.fetchAndAddStatus = "Error";
			}
		},
		queryInBigQuery() {
			const win = window.open(this.bigqueryConsoleUrl, "_blank");
			win.focus();
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			settings: state => state.settings,
			dataTableDetails: state => state.dataTableDetails.data,
			schemas: state => state.schemas.data
		}),
		tableId() {
			return this.$route.params.tableId;
		},
		datasetId() {
			return this.$route.params.datasetId;
		},
		projectId() {
			return this.$route.params.projectId;
		},
		numBytesFormated() {
			const numBytesConverted = convert(Number(this.dataTableDetails.numBytes))
				.from("b")
				.toBest({ cutOffNumber: 1 });
			const numBytesFormated = "".concat(
				numeral(numBytesConverted.val).format("10,000.00"),
				" ",
				numBytesConverted.unit
			);
			return numBytesFormated;
		},
		numRowsFormated() {
			return numeral(this.dataTableDetails.numRows).format("10,000");
		},
		isTimePartitioned() {
			return this.dataTableDetails.timePartitioning !== undefined;
		},
		bigqueryConsoleUrl() {
			return "https://console.cloud.google.com/bigquery?project=".concat(
				this.projectId,
				"&p=",
				this.projectId,
				"&d=",
				this.datasetId,
				"&t=",
				this.tableId,
				"&page=table"
			);
		},
		refreshedTimestamp() {
			var dateFormated = moment(this.dataTableDetails.refreshed_timestamp).format("YYYY/MM/DD - HH:mm");
			var dateFromNow = moment(this.dataTableDetails.refreshed_timestamp).fromNow();
			const refreshedTimestamp = {
				dateFormated: dateFormated,
				dateFromNow: dateFromNow
			};
			return refreshedTimestamp;
		},
		workflowLastModifiedTime() {
			console.log("lastModifiedTimeFormated");
			var lastModifiedTimeFormated = moment(this.dataTableDetails.lastModifiedTime, "x").format("YYYY/MM/DD - HH:mm");
			return lastModifiedTimeFormated;
		},
		tableItems() {
			return [
				{
					text: this.projectId,
					disabled: true,
					href: ""
				},
				{
					text: this.datasetId,
					disabled: true,
					href: ""
				},
				{
					text: this.tableId,
					disabled: true,
					href: ""
				}
			];
		}
	}
};
</script>

<style lang="scss">
.v-input__slot {
	&:before {
		display: none;
	}
}

.card-title-right {
	& > * {
		margin-right: 10px;

		&:last-of-type {
			margin-right: 0;
		}
	}
}
</style>
