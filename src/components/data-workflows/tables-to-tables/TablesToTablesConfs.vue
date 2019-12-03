<template>
	<v-container fluid>
		<v-toolbar class="elevation-1" color="grey lighten-3">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<DataManagementFilters viewEnvironnement />

			<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="getGbqToGbqConfsFormated"
			:search="search"
			:loading="isFetchAndAdding"
			:expanded="expanded"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.account="{ item: { account } }">
				{{ account }}
			</template>

			<template v-slot:item.environment="{ item: { environment } }">
				{{ environment }}
			</template>

			<template v-slot:item.id="{ item: { id } }">
				<router-link
					:to="{
						name: 'TablesToTablesConf',
						params: { pathId: id }
					}"
				>
					<span class="font-weight-medium">{{ id }}</span>
				</router-link>
			</template>

			<template
				v-slot:item.configuration.default_bq_dataset="{
					item: { configuration: { default_bq_dataset } }
				}"
			>
				{{ default_bq_dataset }}
			</template>

			<template v-slot:item.nb_tasks="{ item: { nb_tasks } }">
				{{ nb_tasks }}
			</template>

			<template v-slot:item.activated="{ item }">
				<ActivatedStatusChip
					@click.native="changeActivatedStatus(item, 'getGbqToGbqConfs')"
					:activatedConfStatus="item.configuration.activated"
				/>
			</template>

			<template v-slot:item.actions="{ item }">
				<v-icon small @click="toggleExpand(item)">
					remove_red_eye
				</v-icon>
			</template>

			<template v-slot:expanded-item="{ headers }">
				<td :colspan="headers.length" class="pa-0">
					<v-card flat>
						<v-card-title>
							<span class="headline">{{ viewedItem.id }}</span>
							<v-spacer></v-spacer>
							<v-btn color="warning" fab small dark outlined>
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

		<v-row v-if="viewJson">
			<v-col cols="12" offset="0">
				<v-card dark class="elevation-10">
					<v-card-title>
						<span class="headline">{{ id }}</span>
						<v-spacer></v-spacer>
						<v-btn color="warning" fab small dark outlined>
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

		<v-snackbar v-model="snackbarParam.show" :color="snackbarParam.color" :timeout="2000">
			{{ snackbarParam.message }}
			<v-btn flat @click="snackbarParam.show = false">
				Close
			</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import store from '@/store';
import _ from 'lodash';
import DataManagementFilters from '../../common/DataManagementFilters';
import ActivatedStatusChip from '../../common/configuration/ConfigurationStatus.vue';
import ConfsComponent from '@/mixins/confsComponent.js';

export default {
	mixins: [ConfsComponent],
	components: {
		VueJsonPretty,
		DataManagementFilters,
		ActivatedStatusChip
	},
	data: () => ({
		expanded: [],
		search: '',
		isFetchAndAdding: false,
		fetchAndAddStatus: '',
		moreToFetchAndAdd: false,
		expand: false,
		pagination: {
			sortBy: 'table_name',
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
				text: 'Workflow Id',
				align: 'left',
				sortable: true,
				value: 'id'
			},
			{
				text: 'BQ Default Dataset',
				align: 'left',
				sortable: true,
				value: 'configuration.default_bq_dataset'
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
				value: 'activated'
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
		async getFirestoreData() {
			const where = this.whereConfFilter;
			this.$data.fetchAndAddStatus = 'Loading';
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch('getGbqToGbqConfs/closeDBChannel', {
					clearModule: true
				});
				let fetchResult = await store.dispatch('getGbqToGbqConfs/fetchAndAdd', {
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
				console.log('Firestore Error catched');
				console.log(e);
				this.$data.fetchAndAddStatus = 'Error';
				this.$data.isFetchAndAdding = false;
			}
			this.$data.isFetchAndAdding = false;
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			getGbqToGbqConfs: state => state.getGbqToGbqConfs.data
		}),
		...mapGetters(['periodFiltered', 'whereConfFilter']),
		getGbqToGbqConfsFormated() {
			const dataArray = Object.values(this.getGbqToGbqConfs);
			var dataFormated = dataArray.map(function(data) {
				return {
					nb_tasks: data.configuration.workflow.length,
					sqlArray: Object.entries(data.sql)
				};
			});
			const dataArrayFormated = _.merge(dataArray, dataFormated);
			return dataArrayFormated;
		}
	},
	watch: {
		whereConfFilter() {
			this.getFirestoreData();
		}
	}
};
</script>

<style></style>
