<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary">
					<v-tab ripple href="#configuration">Overview</v-tab>
					<v-tab ripple href="#fulljson">Full Json</v-tab>
					<v-tab ripple href="#conversation">Conversation</v-tab>

					<v-tab-item value="configuration">
						<v-card>
							<StorageToStorageConfView :conf="conf" :isFetchAndAdding="isFetchAndAdding" :activeHeader="true" />
						</v-card>
					</v-tab-item>

					<v-tab-item value="fulljson">
						<v-card>
							<viewJson :json="conf" :jsonID="confId" />
						</v-card>
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>

		<v-row v-else>
			<v-progress-linear :indeterminate="true" />
		</v-row>
	</v-container>
</template>

<script>
import { mapState } from 'vuex';
import StorageToStorageConfView from './StorageToStorageConfView';
import viewJson from '@/components/common/tmp/viewJson.vue';
import store from '@/store';

export default {
	components: {
		StorageToStorageConfView,
		viewJson
	},
	data: () => ({
		conf: undefined,
		isFetchAndAdding: true,
		activeTab: null
	}),
	async mounted() {
		await this.getConf();
	},
	methods: {
		async getConf() {
			this.isFetchAndAdding = true;
			if (this.storageToStorageConfs[this.confId] === undefined) await this.getFirestoreData();
			this.conf = this.storageToStorageConfs[this.confId];
			this.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			try {
				await store.dispatch('storageToStorageConfs/closeDBChannel', { clearModule: true });
				await store.dispatch('storageToStorageConfs/fetchById', this.confId);
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		...mapState({
			storageToStorageConfs: state => state.storageToStorageConfs.data
		}),
		confId() {
			return this.$route.params.confId;
		}
	}
};
</script>
