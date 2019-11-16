<template>
	<v-container grid-list-xl fluid>
		<v-toolbar class="elevation-1" color="grey lighten-3">
			<v-text-field
				v-model="search"
				append-icon="search"
				label="Search"
				single-line
				hide-details
			></v-text-field>
			<v-spacer></v-spacer>
			<DataManagementFilters viewEnvironnement></DataManagementFilters>
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
			:items="vmLauncherConfsFormated"
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
				<td>{{ props.item["account"] }}</td>
				<td>{{ props.item["environment"] }}</td>
				<td>{{ props.item["id"] }}</td>
				<td>{{ props.item["gcs_file_exchange_bucket"] }}</td>
				<td>{{ props.item["working_dir"] }}</td>
				<td>
					<ActivatedStatusChip
						@click.native="changeActivatedStatus(props.item, 'vmLauncherConfs')"
						:activatedConfStatus="props.item.activated"
					></ActivatedStatusChip>
				</td>
				<td class="justify-center layout px-0">
					<v-icon small class="mr-2" @click="viewItem(props, props.item)">
						remove_red_eye
					</v-icon>
					<v-icon
						small
						class="mr-2"
						@click="deleteConfFromFirestore(props, props.item)"
					>
						delete_forever
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
		<v-layout row wrap v-if="viewJson">
			<v-flex xs12 offset-xs0>
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
			</v-flex>
		</v-layout>
		<v-dialog v-model="dialogDeleteConf" max-width="400">
			<v-card light>
				<v-card-title class="headline">Delete Configuration</v-card-title>
				<v-card-text>
					Do you really want to delete the configuration?
					<h3 class="pt-3">
						<v-icon size="18">arrow_forward</v-icon
						>{{ confToDeleteFromFirestore.id }}
					</h3>
				</v-card-text>
				<v-card-actions>
					<v-btn icon @click="showDetailConfToDelete = !showDetailConfToDelete">
						<v-icon>{{
							showDetailConfToDelete
								? "keyboard_arrow_up"
								: "keyboard_arrow_down"
						}}</v-icon>
					</v-btn>
					<v-spacer></v-spacer>
					<v-btn
						color="grey"
						flat="flat"
						@click="cancelDeleteConfFromFirestore"
					>
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
		<v-snackbar
			v-model="showSnackbarDeleteConfSuccess"
			color="success"
			:timeout="1000"
			auto-height
		>
			Configuration deleted with sucess
		</v-snackbar>
		<v-snackbar
			v-model="snackbarParam.show"
			:color="snackbarParam.color"
			:timeout="2000"
			auto-height
		>
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
import _ from "lodash";
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
		search: "",
		isFetchAndAdding: false,
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
				text: "ID Configuration",
				align: "left",
				sortable: true,
				value: "id"
			},
			{
				text: "Bucket Exchange",
				align: "left",
				sortable: true,
				value: "gcs_file_exchange_bucket"
			},
			{
				text: "Working Directory",
				align: "left",
				sortable: true,
				value: "working_dir"
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
		viewItem(props, item) {
			props.expanded = !props.expanded;
			this.viewedIndex = this.vmLauncherConfsFormated.indexOf(item);
			this.viewedItem = item;
		},
		deleteConfFromFirestore(props, item) {
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
				.dispatch("vmLauncherConfs/delete", this.confToDeleteFromFirestore.id)
				.then((this.showSnackbarDeleteConfSuccess = true));
			this.confToDeleteFromFirestore = {};
			this.showDetailConfToDelete = false;
		},
		async getFirestoreData() {
			const where = this.whereConfFilter;
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			this.$data.isFetchAndAdding = true;
			try {
				store.dispatch("vmLauncherConfs/closeDBChannel", {
					clearModule: true
				});
				let fetchResult = await store.dispatch("vmLauncherConfs/fetchAndAdd", {
					where,
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
			vmLauncherConfs: state => state.vmLauncherConfs.data
		}),
		...mapGetters(["periodFiltered", "whereConfFilter"]),
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
