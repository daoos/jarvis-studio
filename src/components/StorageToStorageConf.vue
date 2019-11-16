<template>
	<v-container grid-list-xl>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs
					v-model="activeTab"
					color="grey lighten-3"
					slider-color="primary"
				>
					<v-tab ripple href="#confoverview">
						Overview
					</v-tab>
					<v-tab ripple href="#fulljson">
						Full Json
					</v-tab>
					<v-tab ripple href="#conversation">
						Conversation
					</v-tab>
					<v-tab-item value="confoverview">
						<v-card>
							<StorageToStorageConfView
								:conf="conf"
								:configurationId="conf.id"
								:isFetchAndAdding="isFetchAndAdding"
								:activeHeader="true"
							></StorageToStorageConfView>
						</v-card>
					</v-tab-item>
					<v-tab-item value="fulljson">
						<v-card>
							<viewJson :json="conf" :jsonID="itemId" />
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>
		<v-row v-else>
			<v-progress-linear :indeterminate="true"></v-progress-linear>
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView";
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import store from "@/store/index";

export default {
	components: {
		StorageToStorageConfView,
		viewJson
	},
	data: () => ({
		isFetchAndAdding: true,
		activeTab: null
	}),
	async mounted() {
		this.isFetchAndAdding = true;
		await this.getFirestoreData();
		this.isFetchAndAdding = false;
	},
	methods: {
		async getFirestoreData() {
			await store.dispatch("storageToStorageConf/closeDBChannel", {
				clearModule: true
			});
			await store
				.dispatch("storageToStorageConf/fetchAndAdd", {
					itemId: this.itemId
				})
				.catch(console.error);
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			settings: state => state.settings,
			storageToStorageConf: state => state.storageToStorageConf.data
		}),
		itemId() {
			return this.$route.params.pathId;
		},
		conf() {
			return this.storageToStorageConf;
		}
	}
};
</script>

<style></style>
