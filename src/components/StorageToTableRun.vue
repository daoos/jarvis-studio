<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary">
					<v-tab ripple href="#rundetails">
						Run Details
					</v-tab>
					<v-tab ripple href="#confoverview">
						Configuration
					</v-tab>
					<v-tab ripple href="#confschema">
						Schema
					</v-tab>
					<v-tab ripple href="#fulljson">
						Full Json
					</v-tab>
					<v-tab ripple href="#conversation">
						Conversation
					</v-tab>
					<v-tab-item value="rundetails">
						<v-card v-if="this.run !== undefined">
							<StorageToTableRunView
								:run="this.run"
								:runId="this.run.job_id"
								:activeHeader="true"
							></StorageToTableRunView
						></v-card>
					</v-tab-item>
					<v-tab-item value="confoverview">
						<v-card v-if="this.conf !== undefined">
							<storageToTableConfOverview
								:conf="this.conf"
								:confId="this.conf.table_name"
								:activeHeader="false"
							></storageToTableConfOverview
						></v-card>
					</v-tab-item>
					<v-tab-item value="confschema">
						<v-card v-if="this.conf !== undefined">
							<tableSchemaView :schemaRows="this.conf.schema" />
						</v-card>
					</v-tab-item>
					<v-tab-item value="fulljson">
						<v-card>
							<viewJson :json="this.run" :jsonID="this.run.id" />
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
import { mapState } from 'vuex';
import store from '@/store/index';
import viewJson from '@/components/widgets/parameters/viewJson.vue';
import StorageToTableRunView from '@/components/widgets/runs/StorageToTableRunView.vue';
import storageToTableConfOverview from '@/components/widgets/configurations/StorageToTableConfOverview.vue';
import tableSchemaView from '@/components/widgets/configurations/TableSchemaView.vue';

export default {
	components: {
		viewJson,
		storageToTableConfOverview,
		tableSchemaView,
		StorageToTableRunView
	},
	data() {
		return {
			isFetchAndAdding: true,
			activeTab: null
		};
	},
	async mounted() {
		await this.getFirestoreData();
		this.isFetchAndAdding = false;
	},
	methods: {
		async getFirestoreData() {
			await store.dispatch('storageToTableRun/closeDBChannel', {
				clearModule: true
			});
			await store
				.dispatch('storageToTableRun/fetchAndAdd', {
					itemId: this.itemId
				})
				.catch(console.error);
		}
	},
	computed: {
		...mapState({
			storageToTableRun: state => state.storageToTableRun.data
		}),
		itemId() {
			var itemId = this.$route.params.pathId;
			return itemId;
		},
		conf() {
			//Add the bucket file source to the storageToTableRun object
			var conf = this.storageToTableRun.configuration_context;
			conf.source_bucket = this.storageToTableRun.source_bucket;
			conf.id = this.storageToTableRun.filename_template;
			return conf;
		},
		run() {
			var run = this.storageToTableRun;
			return run;
		}
	}
};
</script>

<style lang="scss" scoped></style>
