<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary">
					<v-tab ripple href="#run-configuration">Overview</v-tab>
					<v-tab ripple href="#full-json">Full Json</v-tab>
					<v-tab ripple href="#conversation">Conversation</v-tab>

					<v-tab-item value="run-configuration">
						<v-card>
							<configuration-overview :data="configurationOverviewData" />
						</v-card>
					</v-tab-item>

					<v-tab-item value="full-json">
						<v-card>
							<!-- TODO: Move generic component -->
							<view-json :json="conf" :jsonID="confId" />
						</v-card>
					</v-tab-item>

					<v-tab-item value="conversation">
						<v-card>
							<blockquote class="blockquote">Coming soon...</blockquote>
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
import ConfigurationOverview from '../common/ConfigurationOverview';
import ViewJson from '../widgets/parameters/viewJson.vue';

import { mapState } from 'vuex';
import store from '@/store/index';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { ConfigurationOverview, ViewJson },
	data: () => ({
		conf: {},
		isFetchAndAdding: true,
		fetchAndAddStatus: '',
		moreToFetchAndAdd: false,
		activeTab: null
	}),
	mounted() {
		this.getConf();
	},
	methods: {
		getConf() {
			this.$data.isFetchAndAdding = true;
			//get the conf is not in mirrorExcGcsToGcsConfs
			if (this.mirrorExcGcsToGcsConfs[this.confId] === undefined) {
				this.getFirestoreData();
			}
			this.conf = this.mirrorExcGcsToGcsConfs[this.confId];
			this.$data.isFetchAndAdding = false;
		},
		getFirestoreData() {
			const confId = this.confId;
			this.$data.fetchAndAddStatus = 'Loading';
			this.$data.moreToFetchAndAdd = false;
			try {
				store.dispatch('mirrorExcGcsToGcsConfs/closeDBChannel', {
					clearModule: true
				});
				store.dispatch('mirrorExcGcsToGcsConfs/fetchById', confId);
				this.$data.fetchAndAddStatus = 'Success';
			} catch (e) {
				this.$data.fetchAndAddStatus = 'Error';
			}
		}
	},
	computed: {
		...mapState({
			mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data
		}),
		confId() {
			return this.$route.params.confId;
		},
		configurationOverviewData() {
			return [
				{
					component: 'overview-header',
					props: {
						activeHeader: true,
						viewId: this.confId,
						viewType: 'conf',
						// activatedConfStatus: null,
						// runStatus: null,
						description: null
					}
				},
				{
					component: 'parameters-list',
					props: {
						groupTitle: 'Context',
						description: 'Context of the Storage to Storage configuration',
						paramItems: [
							{
								id: 'account',
								label: 'Account',
								value: this.conf ? this.conf.account : null
							},
							{
								id: 'environment',
								label: 'Environment',
								value: this.conf ? this.conf.environment : null
							}
						]
					}
				}
			];
		}
	}
};
</script>
