<template>
	<v-container>
		<v-row v-if="isLoading">
			<v-progress-linear :indeterminate="true" />
		</v-row>

		<v-row v-else>
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary" class="elevation-1">
					<v-tab v-for="tab in tabs" :key="tab.label" :href="tab.href" v-text="tab.label" ripple />

					<v-tab-item value="overview">
						<configuration-overview :data="overviewData" />
					</v-tab-item>

					<v-tab-item value="full-json">
						<!-- TODO: Move generic component -->
						<view-json :json="conf" :jsonID="confId" />
					</v-tab-item>

					<v-tab-item value="conversation">
						<blockquote class="blockquote">Coming soon...</blockquote>
					</v-tab-item>
				</v-tabs>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import ConfigurationOverview from '../../../common/configuration/ConfigurationOverview';
import ViewJson from '../../../widgets/parameters/viewJson.vue';

import OverviewData from './overview-data';

import { mapState } from 'vuex';
import store from '@/store/index';

export default {
	name: 'gbq-to-gcs-configuration-item',
	components: { ConfigurationOverview, ViewJson },
	mixins: [OverviewData],
	data: () => ({
		conf: null,
		isLoading: true,
		activeTab: null
	}),
	mounted() {
		this.getConf();
	},
	methods: {
		getConf() {
			this.isLoading = true;
			if (this.mirrorExcGcsToGcsConfs[this.confId] === undefined) this.getFirestoreData();
			this.conf = this.mirrorExcGcsToGcsConfs[this.confId];
			this.isLoading = false;
		},
		getFirestoreData() {
			const confId = this.confId;

			try {
				store.dispatch('mirrorExcGcsToGcsConfs/closeDBChannel', { clearModule: true });
				store.dispatch('mirrorExcGcsToGcsConfs/fetchById', confId);
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		tabs() {
			return [
				{
					label: 'Overview',
					href: '#overview'
				},
				{
					label: 'Full Json',
					href: '#full-json'
				},
				{
					label: 'Conversation',
					href: '#conversation'
				}
			];
		},
		confId() {
			return this.$route.params.confId;
		},
		...mapState({
			mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data
		})
	}
};
</script>
