<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary">
					<v-tab ripple href="#configuration">
						Overview
					</v-tab>
					<v-tab ripple href="#fulljson">
						Full Json
					</v-tab>
					<v-tab ripple href="#conversation">
						Conversation
					</v-tab>
					<v-tab-item value="configuration">
						<v-card>
							<GcsToGcsConfView :conf="conf" :isFetchAndAdding="isFetchAndAdding" :activeHeader="true" />
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
import GcsToGcsConfView from './GcsToGcsConfView';
import viewJson from '@/components/common/tmp/viewJson.vue';
import store from '@/store';

export default {
	components: {
		GcsToGcsConfView,
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
			if (this.mirrorExcGcsToGcsConfs[this.confId] === undefined) {
				await this.getFirestoreData();
			}
			this.conf = this.mirrorExcGcsToGcsConfs[this.confId];
			this.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			const confId = this.confId;
			try {
				await store.dispatch('mirrorExcGcsToGcsConfs/closeDBChannel', {
					clearModule: true
				});
				await store.dispatch('mirrorExcGcsToGcsConfs/fetchById', confId);
			} catch (error) {
				console.log(error);
			}
		}
	},
	computed: {
		...mapState({
			mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data
		}),
		confId() {
			return this.$route.params.confId;
		}
	}
};
</script>
