<template>
	<v-container fluid>
		<v-toolbar class="elevation-1" color="grey lighten-3">
			<v-text-field
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details
			></v-text-field>
			<v-spacer></v-spacer>
			<DataManagementFilters
				viewEnvironnement
				viewPeriode
			></DataManagementFilters>
			<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding"
				>refresh</v-icon
			>
			<v-progress-circular
				indeterminate
				size="20"
				color="primary"
				v-if="isFetchAndAdding"
			></v-progress-circular>
		</v-toolbar>
		<v-data-table
			:headers="headers"
			:items="workflowStatusFormated"
			:search="search"
			:loading="isFetchAndAdding"
			:expand="expand"
			:pagination.sync="pagination"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear
				v-slot:progress
				color="blue"
				indeterminate
			></v-progress-linear>
			<template v-slot:items="props">
				<td>{{ props.item["id"] }}</td>
				<td>{{ props.item["target_dag"] }}</td>
				<td>{{ props.item["nb_triggering_jobs"] }}</td>
				<td>
					<v-progress-circular
						:rotate="270"
						:size="35"
						:value="
							(props.item.nb_triggered_jobs / props.item.nb_triggering_jobs) *
								100
						"
						color="green"
					>
						{{ props.item.nb_triggered_jobs }}
					</v-progress-circular>
				</td>
				<td>{{ props.item["last_update_date_from_now"] }}</td>
				<td>{{ props.item["last_fire_date_from_now"] }}</td>
				<td class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="viewItem(props, props.item)">
						remove_red_eye
					</v-icon>
				</td>
			</template>
			<template v-slot:expand="props">
				<v-card flat>
					<v-card-title>
						<span class="headline">{{ viewedItem.id }}</span>
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
						<span class="headline">{{ viewedItem.id }}</span>
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
				text: "Workflow Id",
				align: "left",
				sortable: true,
				value: "id"
			},
			{
				text: "Dag to fire",
				align: "left",
				sortable: true,
				value: "environment"
			},
			{
				text: "Triggering Jobs",
				align: "left",
				sortable: true,
				value: "nb_triggering_jobs"
			},
			{
				text: "Triggered Jobs",
				align: "left",
				sortable: true,
				value: "nb_triggered_jobs"
			},
			{
				text: "Last triggering date",
				align: "left",
				sortable: true,
				value: "last_update_date_from_now"
			},
			{
				text: "Last fire Date",
				align: "left",
				sortable: true,
				value: "last_fire_date_from_now"
			},
			{ text: "Actions", align: "center", value: "actions", sortable: false }
		]
	}),
	async mounted() {
		await this.getFirestoreData();
	},
	methods: {
		viewItem(props, item) {
			props.expanded = !props.expanded;
			this.viewedIndex = this.workflowStatusFormated.indexOf(item);
			this.viewedItem = Object.assign({}, item);
		},
		openAirflowDagRunUrl(item) {
			window.open(item.dag_execution_airflow_url, "_blank");
		},
		async getFirestoreData() {
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch("workflowStatus/closeDBChannel", {
					clearModule: true
				});
				let fetchResult = await store.dispatch("workflowStatus/fetchAndAdd", {
					limit: 0
				});
				if (fetchResult.done === true) {
					this.$data.moreToFetchAndAdd = false;
				} else {
					this.$data.moreToFetchAndAdd = true;
				}
				this.$data.fetchAndAddStatus = "Success";
			} catch (e) {
				console.log("Firestore Error catched");
				console.log(e);
				this.$data.fetchAndAddStatus = "Error";
				this.$data.isFetchAndAdding = false;
			}
			this.$data.isFetchAndAdding = false;
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			settings: state => state.settings,
			workflowStatus: state => state.workflowStatus.data,
			dateFilterSelected: state => state.filters.dateFilterSelected,
			dateFilters: state => state.filters.dateFilters,
			minDateFilter: state => state.filters.minDateFilter
		}),
		...mapGetters(["periodFiltered", "whereRunsFilter"]),
		workflowStatusFormated() {
			const dataArray = Object.values(this.workflowStatus);
			var dataFormated = dataArray.map(function(data) {
				return {
					last_update_date_formated: moment(data.last_modified).format(
						"YYYY/MM/DD - HH:mm"
					),
					last_update_date_from_now: moment(data.last_modified).fromNow(),
					last_fire_date_formated: moment(data.target_dag_last_executed).format(
						"YYYY/MM/DD - HH:mm"
					),
					last_fire_date_from_now: moment(
						data.target_dag_last_executed
					).fromNow(),
					nb_triggering_jobs: Object.keys(data.jobs).length,
					// Compute the number of jobs with a executed status == true
					nb_triggered_jobs: Object.values(data.jobs).filter(function(d) {
						return d.executed == true;
					}).length

					//color for the status
					//statusColor: Util.getStatusColor(data.status),
					//generate Airflow URL
					//TODO : GENERATE THE AIRFLOW URL TO THE JOBS ID
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
