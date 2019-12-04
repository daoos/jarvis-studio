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
			:items="vmLauncherConfsFormated"
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
				{{ id }}
			</template>

			<template
				v-slot:item.gcs_file_exchange_bucket="{
					item: { gcs_file_exchange_bucket }
				}"
			>
				{{ gcs_file_exchange_bucket }}
			</template>

			<template v-slot:item.working_dir="{ item: { working_dir } }">
				{{ working_dir }}
			</template>

			<template v-slot:item.activated="{ item }">
				<configuration-status
					:item="item"
					collection="vmLauncherConfs"
					:activatedConfStatus="item.activated"
					@statusUpdate="onStatusUpdate"
					@statusError="onStatusError"
				/>
			</template>

			<template v-slot:item.actions="{ item }">
				<div class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="toggleExpand(item)">
						remove_red_eye
					</v-icon>

					<v-icon small @click="deleteConfFromFirestore(item)">
						delete_forever
					</v-icon>
				</div>
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

		<v-dialog v-model="dialogDeleteConf" max-width="400">
			<v-card light>
				<v-card-title class="headline">Delete Configuration</v-card-title>

				<v-card-text>
					Do you really want to delete the configuration?
					<h3 class="pt-3"><v-icon size="18">arrow_forward</v-icon>{{ confToDeleteFromFirestore.id }}</h3>
				</v-card-text>

				<v-card-actions>
					<v-btn icon @click="showDetailConfToDelete = !showDetailConfToDelete">
						<v-icon>{{ showDetailConfToDelete ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
					</v-btn>

					<v-spacer />

					<v-btn color="grey" text @click="cancelDeleteConfFromFirestore">
						Cancel
					</v-btn>

					<v-btn color="error" @click="confirmeDeleteConfFromFirestore">
						Delete
					</v-btn>
				</v-card-actions>

				<v-slide-y-transition>
					<v-card-text v-show="showDetailConfToDelete">
						<vue-json-pretty
							:data="confToDeleteFromFirestore"
							:deep="5"
							:show-double-quotes="true"
							:show-length="true"
							:show-line="false"
						>
						</vue-json-pretty>
					</v-card-text>
				</v-slide-y-transition>
			</v-card>
		</v-dialog>

		<!-- TODO: Update @closeSnackbar  -->
		<configuration-snackbar
			:show-snackbar="showSnackbarDeleteConfSuccess"
			color="success"
			msg="Configuration deleted with success!"
			@closeSnackbar="onCloseSnackbar"
		/>

		<configuration-snackbar
			:show-snackbar="snackbarParam.show"
			:color="snackbarParam.color"
			:msg="snackbarParam.message"
			@closeSnackbar="onCloseSnackbar"
		/>
	</v-container>
</template>

<script>
import VueJsonPretty from 'vue-json-pretty';
import DataManagementFilters from '../../common/DataManagementFilters';
import ConfigurationStatus from '../../common/configuration/ConfigurationStatus.vue';
import ConfigurationSnackbar from '@/components/common/configuration/ConfigurationSnackbar';

import ConfigurationStatusMixin from '@/mixins/configuration/status';

import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
import store from '@/store';
import _ from 'lodash';

export default {
	name: 'vm-launcher-configurations-listing',
	components: {
		VueJsonPretty,
		DataManagementFilters,
		ConfigurationStatus,
		ConfigurationSnackbar
	},
	mixins: [ConfigurationStatusMixin],
	data: () => ({
		snackbarParam: { message: '', show: false, color: 'info' },
		alertParam: { message: '', show: false, color: 'info', dismissible: true },
		expanded: [],
		search: '',
		isFetchAndAdding: false,
		expand: false,
		pagination: {
			sortBy: 'id',
			descending: true,
			rowsPerPage: 10
		},
		fetchAndAddStatus: '',
		moreToFetchAndAdd: false,
		viewJson: false,
		viewedItem: {},
		confToDeleteFromFirestore: {},
		dialogDeleteConf: false,
		showDetailConfToDelete: false,
		showSnackbarDeleteConfSuccess: false,
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
				text: 'ID Configuration',
				align: 'left',
				sortable: true,
				value: 'id'
			},
			{
				text: 'Bucket Exchange',
				align: 'left',
				sortable: true,
				value: 'gcs_file_exchange_bucket'
			},
			{
				text: 'Working Directory',
				align: 'left',
				sortable: true,
				value: 'working_dir'
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
		deleteConfFromFirestore(item) {
			this.confToDeleteFromFirestore = item;
			this.dialogDeleteConf = true;
		},
		cancelDeleteConfFromFirestore() {
			this.dialogDeleteConf = false;
			this.confToDeleteFromFirestore = {};
			this.showDetailConfToDelete = false;
		},
		confirmeDeleteConfFromFirestore() {
			this.dialogDeleteConf = false;
			store
				.dispatch('vmLauncherConfs/delete', this.confToDeleteFromFirestore.id)
				.then((this.showSnackbarDeleteConfSuccess = true));
			this.confToDeleteFromFirestore = {};
			this.showDetailConfToDelete = false;
		},
		async getFirestoreData() {
			const where = this.whereConfFilter;
			this.$data.fetchAndAddStatus = 'Loading';
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch('vmLauncherConfs/closeDBChannel', {
					clearModule: true
				});
				let fetchResult = await store.dispatch('vmLauncherConfs/fetchAndAdd', {
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
			settings: state => state.settings,
			vmLauncherConfs: state => state.vmLauncherConfs.data
		}),
		...mapGetters(['periodFiltered', 'whereConfFilter']),
		vmLauncherConfsFormated() {
			const dataArray = Object.values(this.vmLauncherConfs);
			var dataFormated = dataArray.map(function() {
				return {
					//Put here the new attributs to add to the object
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
