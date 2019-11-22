<template>
	<v-container fluid>
		<v-row>
			<v-col sm="12">
				<v-toolbar class="elevation-1" color="grey lighten-3">
					<v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details />

					<v-spacer />

					<DataManagementFilters viewEnvironnement />

					<v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>

					<v-progress-circular indeterminate size="20" color="primary" v-if="isFetchAndAdding" />
				</v-toolbar>

				<v-data-table
					:headers="headers"
					:items="mirrorExcGcsToGbqConfsAllDetailsArrayFlat"
					:search="search"
					:loading="isFetchAndAdding"
					:expanded="expanded"
					:sort-by.sync="pagination.sortBy"
					:sort-desc.sync="pagination.descending"
					item-key="key"
					class="elevation-1"
				>
					<v-progress-linear v-slot:progress color="blue" indeterminate />

					<template v-slot:item.account="{ item: { account } }">
						{{ account }}
					</template>

					<template v-slot:item.environment="{ item: { environment } }">
						{{ environment }}
					</template>

					<template v-slot:item.table_name="{ item: { key, table_name } }">
						<router-link
							:to="{
								name: 'StorageToTableConf',
								params: { pathId: key }
							}"
						>
							<span class="font-weight-medium">
								{{ table_name }}
							</span>
						</router-link>
					</template>

					<template v-slot:item.gcp_project="{ item: { gcp_project } }">
						{{ gcp_project }}
					</template>

					<template v-slot:item.gbq_dataset="{ item: { gbq_dataset } }">
						{{ gbq_dataset }}
					</template>

					<template v-slot:item.activated="{ item }">
						<ActivatedStatusChip
							@click.native="changeActivatedStatus(item, 'mirrorExcGcsToGbqConfs')"
							:activatedConfStatus="item.activated"
						/>
					</template>

					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2" @click="toggleExpand(item)">
							remove_red_eye
						</v-icon>

						<v-icon small @click="deleteConfFromFirestore(item)">
							delete_forever
						</v-icon>
					</template>

					<template v-slot:expanded-item="{ headers }">
						<td :colspan="headers.length" class="pa-0">
							<v-card flat>
								<v-card-title>
									<span class="headline">{{ viewedItem.table_name }}</span>
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
			</v-col>
		</v-row>

		<v-dialog v-model="dialogDeleteConf" max-width="400">
			<v-card light>
				<v-card-title class="headline">Delete Configuration</v-card-title>
				<v-card-text>
					Do you really want to delete the configuration?
					<h3 class="pt-3"><v-icon size="18">arrow_forward</v-icon>{{ confToDeleteFromFirestore.id }}</h3>
				</v-card-text>
				<v-card-actions>
					<v-btn icon @click="showDetailConfToDelete = !showDetailConfToDelete">
						<v-icon>{{ showDetailConfToDelete ? "keyboard_arrow_up" : "keyboard_arrow_down" }}</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn color="grey" flat="flat" @click="cancelDeleteConfFromFirestore">
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

		<v-snackbar v-model="showSnackbarDeleteConfSuccess" color="success" :timeout="1000">
			Configuration deleted with sucess
		</v-snackbar>

		<v-snackbar v-model="snackbarParam.show" :color="snackbarParam.color" :timeout="2000">
			{{ snackbarParam.message }}
			<v-btn flat @click="snackbarParam.show = false">
				Close
			</v-btn>
		</v-snackbar>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import DataManagementFilters from "./widgets/filters/DataManagementFilters";
import ActivatedStatusChip from "./widgets/datatablewidgets/ActivatedStatusChip.vue";
import ConfsComponent from "@/mixins/confsComponent.js";

export default {
	mixins: [ConfsComponent],
	components: {
		VueJsonPretty,
		DataManagementFilters,
		ActivatedStatusChip
	},
	data: () => ({
		expanded: [],
		mirrorExcGcsToGbqConfsAllDetailsArray: [],
		search: "",
		isFetchAndAdding: false,
		fetchAndAddStatus: "",
		moreToFetchAndAdd: false,
		expand: false,
		pagination: {
			sortBy: "id",
			descending: true,
			rowsPerPage: 10
		},
		viewJson: false,
		viewedItem: {},
		confToDeleteFromFirestore: {},
		dialogDeleteConf: false,
		showDetailConfToDelete: false,
		showSnackbarDeleteConfSuccess: false,
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
				text: "Destination Table",
				align: "left",
				sortable: true,
				value: "table_name"
			},
			{
				text: "BQ Project ID",
				align: "left",
				sortable: true,
				value: "gcp_project"
			},
			{
				text: "BQ Dataset",
				align: "left",
				sortable: true,
				value: "gbq_dataset"
			},
			{
				text: "Status",
				align: "left",
				sortable: true,
				value: "activated"
			},
			{ text: "Actions", align: "center", value: "actions", sortable: false }
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
			this.showSnackbarDeleteConfSuccess = false;
			store
				.dispatch("mirrorExcGcsToGbqConfs/delete", this.confToDeleteFromFirestore.id)
				.then((this.showSnackbarDeleteConfSuccess = true));
			this.confToDeleteFromFirestore = {};
			this.showDetailConfToDelete = false;
		},
		async getFirestoreData() {
			this.mirrorExcGcsToGbqConfsAllDetailsArray = [];
			const where = this.whereConfFilter;
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch("mirrorExcGcsToGbqConfs/closeDBChannel", {
					clearModule: true
				});
				let fetchResult = await store.dispatch("mirrorExcGcsToGbqConfs/fetchAndAdd", { where, limit: 0 });
				if (fetchResult.done === true) {
					this.$data.moreToFetchAndAdd = false;
				} else {
					this.$data.moreToFetchAndAdd = true;
				}
				this.$data.fetchAndAddStatus = "Success";

				//Loop to the document at the 1st level to get the detail configuration in the CONFIGURATION collection of each document
				//Transform the mirrorExcGcsToGbqConfs in Array to loop on
				const mirrorExcGcsToGbqConfsArray = Object.values(this.mirrorExcGcsToGbqConfs);
				//Loop on mirrorExcGcsToGbqConfsArray to get the collection
				for (var confDetailsId in mirrorExcGcsToGbqConfsArray) {
					let bucketId = mirrorExcGcsToGbqConfsArray[confDetailsId].id;
					try {
						store.dispatch("mirrorExcGcsToGbqConfDetails/closeDBChannel", {
							clearModule: true
						});
						// let fetchResult = await store.dispatch(
						// 	"mirrorExcGcsToGbqConfDetails/fetchAndAdd",
						// 	{ bucketId: bucketId, limit: 0 }
						// );
						//Ad the bucket source to the doc configuration and an unique key
						let mirrorExcGcsToGbqConfDetailsEnriched = Object.values(this.mirrorExcGcsToGbqConfDetails).map(x =>
							Object.assign({ bucket_source: bucketId }, x)
						);
						//Ad an unique key to the doc configuration (bucket + table destination + input folder)
						mirrorExcGcsToGbqConfDetailsEnriched = mirrorExcGcsToGbqConfDetailsEnriched.map(val => {
							let key = "";
							key = key.concat(val.bucket_source, "/", val.id, "/", val.gcs_prefix);
							return Object.assign({ key: key }, val);
						});
						//Concat the fetched documents in the same Array
						this.mirrorExcGcsToGbqConfsAllDetailsArray.push(Object.values(mirrorExcGcsToGbqConfDetailsEnriched));
					} catch (e) {
						console.error("Firestore Error catched", e);
						this.$data.fetchAndAddStatus = "Error";
						this.$data.isFetchAndAdding = false;
					}
				}
			} catch (e) {
				console.error("Firestore Error catched:", e);
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
			mirrorExcGcsToGbqConfs: state => state.mirrorExcGcsToGbqConfs.data,
			mirrorExcGcsToGbqConfDetails: state => state.mirrorExcGcsToGbqConfDetails.data,
			dateFilterSelected: state => state.filters.dateFilterSelected,
			dateFilters: state => state.filters.dateFilters,
			minDateFilter: state => state.filters.minDateFilter
		}),
		...mapGetters(["periodFiltered", "whereConfFilter"]),
		mirrorExcGcsToGbqConfsAllDetailsArrayFlat() {
			return this.mirrorExcGcsToGbqConfsAllDetailsArray.flat();
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
