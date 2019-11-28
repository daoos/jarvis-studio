<template>
	<v-container fluid>
		<v-alert
			:value="alertParam.show"
			:color="alertParam.color"
			:icon="alertParam.icon"
			:dismissible="alertParam.dismissible"
		>
			{{ alertParam.message }}
		</v-alert>

		<v-toolbar class="elevation-O" color="transparent">
			<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

			<v-spacer />

			<DataManagementFilters viewEnvironnement />

			<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">
				refresh
			</v-icon>

			<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
		</v-toolbar>

		<v-data-table
			:headers="headers"
			:items="getGbqToGcsConfsFormated"
			:search="search"
			:loading="isFetchAndAdding"
			:expanded="expanded"
			:sort-by.sync="pagination.sortBy"
			:sort-desc.sync="pagination.descending"
			item-key="id"
			class="elevation-1"
		>
			<v-progress-linear v-slot:progress color="blue" indeterminate />

			<template v-slot:item.activated="{ item }">
				<ActivatedStatusChip
					@click.native="changeActivatedStatus(item, 'getGbqToGcsConfs')"
					:activatedConfStatus="item.activated"
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
							<span class="headline">{{ viewedItem.table_name }}</span>
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
import store from '@/store/index';
import _ from 'lodash';
import Util from '@/util';
import DataManagementFilters from '../widgets/filters/DataManagementFilters';
import ActivatedStatusChip from '../widgets/datatablewidgets/ActivatedStatusChip.vue';
import ConfsComponent from '@/mixins/confsComponent.js';

export default {
	name: 'configurations-listing',
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
				text: 'Generated File',
				align: 'left',
				sortable: true,
				value: 'table_name'
			},
			{
				text: 'BQ Project Id',
				align: 'left',
				sortable: true,
				value: 'gcp_project'
			},
			{
				text: 'Destination Bucket',
				align: 'left',
				sortable: true,
				value: 'gcs_dest_bucket'
			},
			{
				text: 'Destination Prefix',
				align: 'left',
				sortable: true,
				value: 'gcs_dest_prefix'
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
				store.dispatch('getGbqToGcsConfs/closeDBChannel', {
					clearModule: true
				});
				let fetchResult = await store.dispatch('getGbqToGcsConfs/fetchAndAdd', {
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
				console.log('Firestore Error catched:', e);
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
			settings: state => state.settings,
			getGbqToGcsConfs: state => state.getGbqToGcsConfs.data
		}),
		...mapGetters(['periodFiltered', 'whereConfFilter']),
		getGbqToGcsConfsFormated() {
			const dataArray = Object.values(this.getGbqToGcsConfs);
			var dataFormated = dataArray.map(function(data) {
				return {
					//color for the activated status
					activeConfColor: Util.getActiveConfColor(data.activated)
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
