<template>
	<div>
		<DataModelHeader :tableItems="tableItems" />

		<v-container class="grey lighten-5">
			<v-progress-linear v-if="isLoading" :indeterminate="true" />

			<template v-else>
				<v-row v-if="isJsonValid">
					<v-col cols="12" offset="0">
						<v-card>
							<v-card-title>
								<v-icon color="blue-grey lighten-3" large class="mr-3">table_chart</v-icon>
								<span class="display-1 font-weight-bold">{{ this.dataTableDetails.id }}</span>

								<v-spacer />

								<div class="card-title-right">
									<v-tooltip bottom>
										<template v-slot:activator="{ on }">
											<span v-on="on"> Last Update: {{ refreshedTimestamp.dateFromNow }} </span>
										</template>
										<span>{{ refreshedTimestamp.dateFormated }}</span>
									</v-tooltip>

									<v-btn @click="getDataTableDetails">Refresh</v-btn>
									<v-btn @click="queryInBigQuery" color="secondary">Query</v-btn>
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
										/>
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="3">
										<v-text-field label="Account" :value="dataTableDetails.account" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Project Id" :value="this.projectId" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Dataset" :value="this.datasetId" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Location" :value="dataTableDetails.location" class="title" readonly outline />
									</v-col>
								</v-row>

								<v-row>
									<v-col cols="3">
										<v-text-field label="Row Number" :value="numRowsFormated" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Table Size" :value="numBytesFormated" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Table Type" :value="dataTableDetails.kind" class="title" readonly outline />
									</v-col>

									<v-col cols="3">
										<v-text-field label="Time Partitioned" :value="isTimePartitioned" class="title" readonly outline />
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
					</v-col>

					<v-col cols="12">
						<v-tabs
							v-model="activeTab"
							color="black"
							background-color="#E0E0E0"
							slider-color="primary"
							class="elevation-1"
						>
							<v-tab ripple href="#dataoverview">Data Overview</v-tab>
							<v-tab ripple href="#schema">Schema</v-tab>
							<v-tab ripple href="#workflow">Workflow</v-tab>
							<v-tab ripple href="#documentation">Documentation</v-tab>
							<v-tab ripple href="#fulljson">Full Json</v-tab>

							<v-tab-item value="dataoverview">
								<v-card>
									<v-card-title>
										<span class="title">Data Overview</span>
										<v-spacer />
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
										<v-spacer />
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
												/>
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
												/>
											</v-col>
											<v-col cols="2">
												<v-text-field
													label="Workflow Type"
													:value="dataTableDetails.dag_type"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
											<v-col cols="3">
												<v-text-field
													label="Workflow Run Id"
													:value="dataTableDetails.dag_run_id"
													class="subtitle-1"
													readonly
													outline
												/>
											</v-col>
											<v-col cols="2">
												<v-text-field
													label="Last Modified"
													:value="this.workflowLastModifiedTime"
													class="subtitle-1"
													readonly
													outline
												/>
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
												<vue-markdown :source="dataTableDetails.doc_md" />
											</v-col>
										</v-row>
									</v-card-text>
								</v-card>
							</v-tab-item>

							<v-tab-item value="fulljson">
								<v-card>
									<v-card-title>
										<span class="title">Full Json</span>
										<v-spacer />
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
				</v-row>

				<JsonSchemaIsInvalid v-else :jsonObject="this.dataTableDetails" :jsonObjectErrors="this.jsonObjectErrors" />
			</template>
		</v-container>
	</div>
</template>

<script lang="ts">
// TODO: Refactor component

import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import store from '@/store';
import moment from 'moment';
import JsonSchemaIsInvalid from './JsonSchemaIsInvalid.vue';
import DataModelHeader from './DataModelHeader.vue';
import tableSchemaView from '@/components/data-workflows/common/item/schema/TableSchemaView.vue';
import { VueGoodTable } from 'vue-good-table';
// library to validate Object Json Schema from Firestore
import Ajv from 'ajv';
// library to convert units (bite to Go ) and format number
import * as convert from 'convert-units';
import * as numeral from 'numeral';
import VueMarkdown from 'vue-markdown';

import 'vue-good-table/dist/vue-good-table.css';

@Component({
	components: {
		VueJsonPretty,
		tableSchemaView,
		JsonSchemaIsInvalid,
		DataModelHeader,
		VueGoodTable,
		VueMarkdown
	},
	computed: {
		...mapState({
			dataTableDetails: (state: any) => state.dataTableDetails.data,
			schemas: (state: any) => state.schemas.data
		})
	}
})
export default class DataTableDetails extends Vue {
	private dataTableDetails: any; // TODO: Type
	private schemas: any; // TODO: Type

	isLoading: boolean = true;
	fetchAndAddStatus: string = '';
	dataTableOverviewColumns: [] = []; // TODO: Type
	dataTableOverviewRows: [] = []; // TODO: Type
	schemaRows: [] = []; // TODO: Type
	activeTab: null = null;
	isJsonValid: boolean = true;
	jsonObjectErrors: Object = {};

	async mounted() {
		await this.getDataTableDetails();
	}

	async getDataTableDetails() {
		this.isLoading = true;
		await this.getFirestoreData();
		//Test the Json Schema
		const ajv = new Ajv({ allErrors: true });
		//Get Schema to apply
		const testJson = ajv.compile(JSON.parse(this.schemas['gbq-table-preview-table'].schema));
		//Test Json Schema
		this.isJsonValid = testJson(this.dataTableDetails);
		this.jsonObjectErrors = testJson.errors;
		if (this.isJsonValid) {
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
		this.isLoading = false;
	}

	async getFirestoreData() {
		this.fetchAndAddStatus = 'Loading';
		try {
			await store.dispatch('dataTableDetails/closeDBChannel', {
				clearModule: true
			});
			await store.dispatch('dataTableDetails/fetchAndAdd', {
				projectId: this.projectId,
				datasetId: this.datasetId,
				tableId: this.tableId,
				limit: 0
			});
			this.fetchAndAddStatus = 'Success';
		} catch (e) {
			this.fetchAndAddStatus = 'Error';
		}
	}

	queryInBigQuery() {
		const url = `https://console.cloud.google.com/bigquery?project=${this.projectId}&p=${this.projectId}&d=${this.datasetId}&t=${this.tableId}&page=table`;
		window.open(url, '_blank');
	}

	get tableId() {
		return this.$route.params.tableId;
	}

	get datasetId() {
		return this.$route.params.datasetId;
	}

	get projectId() {
		return this.$route.params.projectId;
	}

	get numBytesFormated() {
		const numBytesConverted = convert(Number(this.dataTableDetails.numBytes))
			.from('b')
			.toBest({ cutOffNumber: 1 });
		const numBytesFormated = ''.concat(numeral(numBytesConverted.val).format('10,000.00'), ' ', numBytesConverted.unit);
		return numBytesFormated;
	}

	get numRowsFormated() {
		return numeral(this.dataTableDetails.numRows).format('10,000');
	}

	get isTimePartitioned() {
		return this.dataTableDetails.timePartitioning !== undefined;
	}

	get refreshedTimestamp() {
		var dateFormated = moment(this.dataTableDetails.refreshed_timestamp).format('YYYY/MM/DD - HH:mm');
		var dateFromNow = moment(this.dataTableDetails.refreshed_timestamp).fromNow();
		const refreshedTimestamp = {
			dateFormated: dateFormated,
			dateFromNow: dateFromNow
		};
		return refreshedTimestamp;
	}

	get workflowLastModifiedTime() {
		return moment(this.dataTableDetails.lastModifiedTime, 'x').format('YYYY/MM/DD - HH:mm');
	}

	get tableItems() {
		return [
			{
				text: this.projectId,
				disabled: true,
				href: ''
			},
			{
				text: this.datasetId,
				disabled: true,
				href: ''
			},
			{
				text: this.tableId,
				disabled: true,
				href: ''
			}
		];
	}
}
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
