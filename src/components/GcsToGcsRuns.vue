<template>
	<v-container fluid>
		<v-toolbar class="elevation-1" color="grey lighten-3">
			<v-text-field
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details
			/>

			<v-spacer></v-spacer>

			<DataManagementFilters viewEnvironnement viewPeriode viewRunStatus />

			<v-icon @click="getFirestoreData" v-if="!isFetchAndAdding">
				refresh
			</v-icon>

			<v-progress-circular
				indeterminate
				size="20"
				color="primary"
				v-if="isFetchAndAdding"
				class="pl-4"
			/>
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="mirrorExcGcsToGcsRunsFormated"
			:search="search"
			:loading="isFetchAndAdding"
			:expand="expand"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:expanded-item="{ headers }">
				<td :colspan="headers.length">Peek-a-boo!</td>
			</template>

			<template v-slot:item.account="{ item: { account } }">
				{{ account }}
			</template>

			<template v-slot:item.environment="{ item: { environment } }">
				{{ environment }}
			</template>

			<template v-slot:item.source_bucket="{ item: { source_bucket } }">
				{{ source_bucket }}
			</template>

			<template
				v-slot:item.gcs_triggering_file="{ item: { id, gcs_triggering_file } }"
			>
				<router-link :to="{ name: 'GcsToGcsRun', params: { runId: id } }">
					{{ gcs_triggering_file }}
				</router-link>
			</template>

			<template v-slot:item.status="{ item: { status, statusColor } }">
				<v-chip
					:color="statusColor"
					text-color="white"
					small
					class="text-lowercase"
				>
					{{ status }}
				</v-chip>
			</template>

			<template
				v-slot:item.dag_execution_date_formated="{
					item: { dag_execution_date_formated }
				}"
			>
				{{ dag_execution_date_formated }}
			</template>

			<template v-slot:item.actions="props">
				<div class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="viewItem(props, props.item)">
						remove_red_eye
					</v-icon>
					<v-icon small @click="openAirflowDagRunUrl(props.item)">
						open_in_new
					</v-icon>
				</div>
			</template>

			<template v-slot:expand="props">
				<v-card flat>
					<v-card-title>
						<span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
						<v-spacer></v-spacer>
						<v-btn color="warning" fab small dark outline>
							<v-icon @click="props.expanded = !props.expanded">
								close
							</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text>
						<vue-json-pretty
							:data="viewedItem"
							:deep="5"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-card>
			</template>
			<v-alert v-slot:no-results :value="true" color="error" icon="warning">
				Your search for "{{ search }}" found no results.
			</v-alert>
		</v-data-table>

		<v-row v-if="viewJson">
			<v-col cols="12" offset="0">
				<v-card dark class="elevation-10">
					<v-card-title>
						<span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
						<v-spacer></v-spacer>
						<v-btn color="warning" fab small dark outline>
							<v-icon @click="viewJson = false">
								close
							</v-icon>
						</v-btn>
					</v-card-title>
					<v-card-text>
						<vue-json-pretty
							:data="viewedItem"
							:deep="5"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from "@/util";
import DataManagementFilters from "./widgets/filters/DataManagementFilters";

export default {
	components: {
		VueJsonPretty,
		DataManagementFilters
	},
	data: () => ({
		search: "",
		isFetchAndAdding: false,
		expand: false,
		pagination: {
			sortBy: "dag_execution_date_formated",
			descending: true,
			rowsPerPage: 10
		},
		fetchAndAddStatus: "",
		moreToFetchAndAdd: false,
		viewJson: false,
		viewedItem: {},
		headers: [
			{
				text: "Account ID",
				align: "left",
				sortable: true,
				value: "account"
			},
			{
				text: "Environnement",
				align: "left",
				sortable: true,
				value: "environment"
			},
			{
				text: "Source Bucket",
				align: "left",
				sortable: true,
				value: "source_bucket"
			},
			{
				text: "File",
				align: "left",
				sortable: true,
				value: "gcs_triggering_file"
			},
			{
				text: "Status",
				align: "left",
				sortable: true,
				value: "status"
			},
			{
				text: "Execution Date",
				align: "left",
				sortable: true,
				value: "dag_execution_date_formated"
			},
			{ text: "Actions", align: "center", value: "actions", sortable: false }
		]
	}),
	async mounted() {
		await this.getFirestoreData();
	},
	methods: {
		viewItem(item) {
			console.log("1", item.expanded);
			item.expanded = !item.expanded;
			console.log("2-", item.expanded);
			this.viewedIndex = this.mirrorExcGcsToGcsRunsFormated.indexOf(item);
			this.viewedItem = Object.assign({}, item);
		},
		openAirflowDagRunUrl(item) {
			window.open(item.dag_execution_airflow_url, "_blank");
		},
		async getFirestoreData() {
			const where = this.whereRunsFilter;
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch("mirrorExcGcsToGcsRuns/closeDBChannel", {
					clearModule: true
				});
				let fetchResult = await store.dispatch(
					"mirrorExcGcsToGcsRuns/fetchAndAdd",
					{ where, limit: 0 }
				);
				if (fetchResult.done === true) {
					this.$data.moreToFetchAndAdd = false;
				} else {
					this.$data.moreToFetchAndAdd = true;
				}
				this.$data.fetchAndAddStatus = "Success";
			} catch (e) {
				this.$data.fetchAndAddStatus = "Error";
				this.$data.isFetchAndAdding = false;
				console.error(e);
			}
			this.$data.isFetchAndAdding = false;
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			mirrorExcGcsToGcsRuns: state => state.mirrorExcGcsToGcsRuns.data,
			dateFilterSelected: state => state.filters.dateFilterSelected,
			dateFilters: state => state.filters.dateFilters,
			minDateFilter: state => state.filters.minDateFilter
		}),
		...mapGetters(["periodFiltered", "whereRunsFilter"]),
		mirrorExcGcsToGcsRunsFormated() {
			const dataArray = Object.values(this.mirrorExcGcsToGcsRuns);
			var dataFormated = dataArray.map(function(data) {
				return {
					dag_execution_date_formated: moment(data.dag_execution_date).format(
						"YYYY/MM/DD - HH:mm"
					),
					dag_execution_date_from_now: moment(
						data.dag_execution_date
					).fromNow(),
					//color for the status
					statusColor: Util.getStatusColor(data.status),
					//generate Airflow URL
					dag_execution_airflow_url: Util.dagRunAirflowUrl(
						data.dag_id,
						data.dag_run_id,
						data.dag_execution_date
					)
				};
			});
			const dataArrayFormated = _.merge(dataArray, dataFormated);
			return dataArrayFormated;
		}
	},
	watch: {
		async whereRunsFilter() {
			await this.getFirestoreData();
		}
	}
};
</script>

<style></style>
