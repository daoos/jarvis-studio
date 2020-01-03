<template>
	<v-container fluid>
		<v-toolbar class="elevation-0" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<DataManagementFilters viewEnvironnement viewPeriode viewRunStatus />

			<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="getGbqToGbqRunsFormated"
			:search="search"
			:loading="isFetchAndAdding"
			:expanded="expanded"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="id"
			light
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.account="{ item: { account } }">
				{{ account }}
			</template>

			<template v-slot:item.environment="{ item: { environment } }">
				{{ environment }}
			</template>

			<template v-slot:item.dag_id="{ item: { id, dag_id } }">
				<router-link :to="{ name: routeName, params: { pathId: id } }">
					<span class="font-weight-medium">
						{{ dag_id }}
					</span>
				</router-link>
			</template>

			<template v-slot:item.nb_tasks="{ item: { nb_tasks } }">
				{{ nb_tasks }}
			</template>

			<template v-slot:item.status="{ item: { status, statusColor } }">
				<v-chip :color="statusColor" text-color="white" small class="text-lowercase">
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

			<template v-slot:item.actions="{ item }">
				<div class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="toggleExpand(item)" v-if="item.confCompliance">
						remove_red_eye
					</v-icon>
					<v-icon small class="mr-2" @click="toggleExpand(item)" color="orange darken-1" v-else>
						warning
					</v-icon>
					<v-icon class="mr-2" small @click="openAirflowDagRunUrl(item)">
						open_in_new
					</v-icon>
				</div>
			</template>

			<template v-slot:expanded-item="{ headers }">
				<td :colspan="headers.length" class="pa-0">
					<v-card flat>
						<v-card-title>
							<span class="headline">{{ viewedItem.dag_id }}</span>
							<v-spacer></v-spacer>
							<v-btn color="warning" fab small dark outline>
								<v-icon @click="toggleExpand(viewedItem)">
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
				</td>
			</template>

			<v-alert v-slot:no-results :value="true" color="error" icon="warning">
				Your search for "{{ search }}" found no results.
			</v-alert>
		</v-data-table>
	</v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import DataManagementFilters from '../common/DataManagementFilters';

import { TABLES_TO_TABLES_RUNS_ITEM } from '@/constants/router/routes-names';
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import moment from 'moment';
import _ from 'lodash';
import Util from '@/util';

export default {
	components: {
		VueJsonPretty,
		DataManagementFilters
	},
	data: () => ({
		expanded: [],
		search: '',
		isFetchAndAdding: false,
		fetchAndAddStatus: '',
		moreToFetchAndAdd: false,
		expand: false,
		pagination: {
			sortBy: 'dag_execution_date_formated',
			descending: true,
			rowsPerPage: 10
		},
		viewJson: false,
		viewedItem: {},
		headers: [
			{
				text: 'Account ID',
				align: 'left',
				sortable: true,
				value: 'account'
			},
			{
				text: 'Environnement',
				align: 'left',
				sortable: true,
				value: 'environment'
			},
			{
				text: 'Workflow Id Bucket',
				align: 'left',
				sortable: true,
				value: 'dag_id'
			},
			{
				text: '# Tasks',
				align: 'left',
				sortable: true,
				value: 'nb_tasks'
			},
			{
				text: 'Status',
				align: 'left',
				sortable: true,
				value: 'status'
			},
			{
				text: 'Execution Date',
				align: 'left',
				sortable: true,
				value: 'dag_execution_date_formated'
			},
			{ text: 'Actions', align: 'center', value: 'actions', sortable: false }
		]
	}),
	mounted() {
		this.getFirestoreData();
	},
	methods: {
		toggleExpand(item) {
			const isAlreadyExpand = this.expanded.filter(expandedItem => expandedItem.id === item.id).length === 1;

			if (isAlreadyExpand) {
				this.expanded = [];
			} else {
				this.expanded = [item];
				this.viewedItem = item;
			}
		},
		openAirflowDagRunUrl(item) {
			window.open(item.dag_execution_airflow_url, '_blank');
		},
		async getFirestoreData() {
			const where = this.whereRunsFilter;
			this.$data.fetchAndAddStatus = 'Loading';
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch('getGbqToGbqRuns/closeDBChannel', {
					clearModule: true
				});
				let fetchResult = await store.dispatch('getGbqToGbqRuns/fetchAndAdd', {
					where,
					limit: 0
				});
				if (fetchResult.done === true) {
					this.$data.moreToFetchAndAdd = false;
				} else {
					this.$data.moreToFetchAndAdd = true;
				}
				this.$data.fetchAndAddStatus = 'Success';
			} catch (e) {
				this.$data.fetchAndAddStatus = 'Error';
				this.$data.isFetchAndAdding = false;
				console.error(e);
			}
			this.$data.isFetchAndAdding = false;
		}
	},
	computed: {
		routeName() {
			return TABLES_TO_TABLES_RUNS_ITEM;
		},
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			getGbqToGbqRuns: state => state.getGbqToGbqRuns.data,
			dateFilterSelected: state => state.filters.dateFilterSelected,
			dateFilters: state => state.filters.dateFilters,
			minDateFilter: state => state.filters.minDateFilter
		}),
		...mapGetters(['periodFiltered', 'whereRunsFilter']),
		getGbqToGbqRunsFormated() {
			const dataArray = Object.values(this.getGbqToGbqRuns);
			var dataFormated = dataArray.map(function(data) {
				// conCompliance is set to false if it detects a unexpected configuration json format
				// confComplianceError array stores the error messages when the conf seems not compliante
				let confCompliance = true;
				let confComplianceError = [];
				//try to compute the nb tasks in the configuration
				let nb_tasks = 0;
				try {
					nb_tasks = data.configuration_context.configuration.workflow.length;
				} catch (error) {
					confCompliance = false;
					confComplianceError.push(error);
				}
				return {
					confCompliance: confCompliance,
					confComplianceError: confComplianceError,
					nb_tasks: nb_tasks,
					dag_execution_date_formated: moment(data.dag_execution_date).format('YYYY/MM/DD - HH:mm'),
					dag_execution_date_from_now: moment(data.dag_execution_date).fromNow(),
					//color for the status
					statusColor: Util.getStatusColor(data.status),
					//generate Airflow URL
					dag_execution_airflow_url: Util.dagRunAirflowUrl(data.dag_id, data.dag_run_id, data.dag_execution_date)
				};
			});
			const dataArrayFormated = _.merge(dataArray, dataFormated);
			return dataArrayFormated;
		}
	},
	watch: {
		whereRunsFilter() {
			this.getFirestoreData();
		}
	}
};
</script>
