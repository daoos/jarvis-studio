<template>
	<v-container grid-list-xl>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs :activeTab="null" color="grey lighten-3" slider-color="primary">
					<v-tab ripple href="#rundetails">
						Overview
					</v-tab>
					<v-tab ripple href="#runconfiguration">
						Configuration
					</v-tab>
					<v-tab ripple href="#fulljson">
						Full Json
					</v-tab>
					<v-tab ripple href="#conversation">
						Conversation
					</v-tab>
					<v-tab-item value="rundetails">
						<v-card v-if="run !== undefined">
							<StorageToStorageRunView
								:run="run"
								:runId="run.triggering_file"
								:activeHeader="true"
							></StorageToStorageRunView>
						</v-card>
					</v-tab-item>
					<v-tab-item value="runconfiguration">
						<v-card v-if="run !== undefined">
							<StorageToStorageConfView
								:conf="run.configuration_context"
								:configurationId="run.configuration_id"
								:activeHeader="false"
							></StorageToStorageConfView>
						</v-card>
					</v-tab-item>
					<v-tab-item value="fulljson">
						<v-card>
							<viewJson :json="run" :jsonID="runId" />
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>
		<v-row v-else>
			<template>
				<v-progress-linear :indeterminate="true"></v-progress-linear>
			</template>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView";
import StorageToStorageRunView from "./widgets/runs/StorageToStorageRunView";
import store from "@/store/index";
import viewJson from "@/components/widgets/parameters/viewJson.vue";

export default {
	components: {
		StorageToStorageConfView,
		StorageToStorageRunView,
		viewJson
	},
	data: () => ({
		run: undefined,
		isFetchAndAdding: true,
		fetchAndAddStatus: "",
		moreToFetchAndAdd: false,
		activeTab: null
	}),
	async mounted() {
		await this.getRun();
	},
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		async getRun() {
			this.$data.isFetchAndAdding = true;
			//get the conf is not in mirrorExcGcsToGcsRuns
			if (this.storageToStorageRuns[this.confId] === undefined) {
				await this.getFirestoreData();
			}
			this.run = this.storageToStorageRuns[this.runId];
			this.$data.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			const runId = this.runId;
			this.$data.fetchAndAddStatus = "Loading";
			this.$data.moreToFetchAndAdd = false;
			try {
				await store.dispatch("storageToStorageRuns/closeDBChannel", {
					clearModule: true
				});
				await store.dispatch("storageToStorageRuns/fetchById", runId);
				this.$data.fetchAndAddStatus = "Success";
			} catch (e) {
				this.$data.fetchAndAddStatus = "Error";
				console.error(e);
			}
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			settings: state => state.settings,
			storageToStorageRuns: state => state.storageToStorageRuns.data
		}),
		runId() {
			return this.$route.params.runId;
		}
	}
};
</script>

<style></style>
