<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs color="black" background-color="#E0E0E0" slider-color="primary">
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
							<GcsToGcsRunView :run="run" :runId="run.gcs_triggering_file" :activeHeader="true" />
						</v-card>
					</v-tab-item>
					<v-tab-item value="runconfiguration">
						<v-card v-if="run !== undefined">
							<GcsToGcsConfView :conf="run.configuration_context" :activeHeader="false" />
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
				<v-progress-linear :indeterminate="true" />
			</template>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
import GcsToGcsConfView from './GcsToGcsConfView';
import GcsToGcsRunView from './GcsToGcsRunView';
import store from '@/store';
import viewJson from '@/components/common/tmp/viewJson.vue';

export default {
	components: {
		GcsToGcsConfView,
		GcsToGcsRunView,
		viewJson
	},
	data: () => ({
		run: undefined,
		isFetchAndAdding: true,
		fetchAndAddStatus: '',
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
			if (this.mirrorExcGcsToGcsRuns[this.confId] === undefined) {
				await this.getFirestoreData();
			}
			this.run = this.mirrorExcGcsToGcsRuns[this.runId];
			this.$data.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			const runId = this.runId;
			this.$data.fetchAndAddStatus = 'Loading';
			this.$data.moreToFetchAndAdd = false;
			try {
				await store.dispatch('mirrorExcGcsToGcsRuns/closeDBChannel', {
					clearModule: true
				});
				await store.dispatch('mirrorExcGcsToGcsRuns/fetchById', runId);
				this.$data.fetchAndAddStatus = 'Success';
			} catch (e) {
				this.$data.fetchAndAddStatus = 'Error';
				console.error(e);
			}
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			settings: state => state.settings,
			mirrorExcGcsToGcsRuns: state => state.mirrorExcGcsToGcsRuns.data
		}),
		runId() {
			return this.$route.params.runId;
		}
	}
};
</script>

<style></style>
