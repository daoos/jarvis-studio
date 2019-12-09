<template>
	<v-container fluid>
		<v-toolbar class="elevation-1" color="grey lighten-3">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<DataManagementFilters viewEnvironnement viewPeriode viewRunStatus />

			<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="tableToStorageRunsFormatted"
			:search="search"
			:loading="isFetchAndAdding"
			:expanded="expanded"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.firestore_conf_doc_id="{ item: { id, firestore_conf_doc_id } }">
				<router-link :to="{ name: 'TableToStorageRun', params: { id } }">
					{{ firestore_conf_doc_id }}
				</router-link>
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
					<v-icon small class="mr-2" @click="toggleExpand(item)">remove_red_eye</v-icon>
					<v-icon small @click="openAirflowDagRunUrl(item)">open_in_new</v-icon>
				</div>
			</template>

			<template v-slot:expanded-item="{ headers }">
				<td :colspan="headers.length" class="pa-0">
					<v-card flat>
						<v-card-title>
							<span class="headline">{{ viewedItem.firestore_conf_doc_id }}</span>
							<v-spacer />
							<v-btn color="warning" fab small dark outlined>
								<v-icon @click="toggleExpand(viewedItem)">close</v-icon>
							</v-btn>
						</v-card-title>

						<v-card-text>
							<vue-json-pretty
								:data="viewedItem"
								:deep="5"
								:show-double-quotes="true"
								:show-length="true"
								:show-line="false"
							/>
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
import DataManagementFilters from '../../../common/DataManagementFilters';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import Util from '@/util';
import moment from 'moment';
import _ from 'lodash';

export default {
	name: 'table-to-storage-runs-listing',
	components: { VueJsonPretty, DataManagementFilters },
	data: () => ({
		expanded: [],
		search: '',
		isFetchAndAdding: false,
		expand: false,
		fetchAndAddStatus: '',
		pagination: {
			sortBy: 'dag_execution_date_formated',
			descending: true,
			rowsPerPage: 10
		},
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
				text: 'Configuration Id',
				align: 'left',
				sortable: true,
				value: 'firestore_conf_doc_id'
			},
			{
				text: 'Destination Bucket',
				align: 'left',
				sortable: true,
				value: 'destination_bucket'
			},
			{
				text: 'Generated File',
				align: 'left',
				sortable: true,
				value: 'output_filename'
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
			this.fetchAndAddStatus = 'Loading';
			this.isFetchAndAdding = true;
			try {
				await store.dispatch('tableToStorageRuns/closeDBChannel', { clearModule: true });
				await store.dispatch('tableToStorageRuns/fetchAndAdd', { where, limit: 0 });
				this.fetchAndAddStatus = 'Success';
			} catch (e) {
				console.log('Firestore Error catched');
				console.log(e);
				this.fetchAndAddStatus = 'Error';
				this.isFetchAndAdding = false;
			}
			this.isFetchAndAdding = false;
		}
	},
	computed: {
		...mapState({
			tableToStorageRuns: state => state.tableToStorageRuns.data
		}),
		...mapGetters(['periodFiltered', 'whereRunsFilter']),
		tableToStorageRunsFormatted() {
			const dataArray = Object.values(this.tableToStorageRuns);
			const dataFormatted = dataArray.map(function(data) {
				return {
					dag_execution_date_formated: moment(data.dag_execution_date).format('YYYY/MM/DD - HH:mm'),
					dag_execution_date_from_now: moment(data.dag_execution_date).fromNow(),
					//color for the status
					statusColor: Util.getStatusColor(data.status),
					//generate Airflow URL
					dag_execution_airflow_url: Util.dagRunAirflowUrl(data.dag_id, data.dag_run_id, data.dag_execution_date)
				};
			});

			return _.merge(dataArray, dataFormatted);
		}
	},
	watch: {
		whereRunsFilter() {
			this.getFirestoreData();
		}
	}
};
</script>
