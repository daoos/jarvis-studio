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
						<view-json :json="conf" :json-id="confId" />
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
import ViewJson from '../../../common/ViewJson';

import OverviewData from './overview-data';

import { mapState } from 'vuex';
import store from '@/store/index';

export default {
	name: 'table-to-storage-run-item',
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
		async getConf() {
			this.isLoading = true;
			if (!this.getGbqToGcsRuns[this.confId]) await this.getFirestoreData();
			this.conf = this.getGbqToGcsRuns[this.confId];
			this.isLoading = false;
		},
		async getFirestoreData() {
			try {
				await store.dispatch('getGbqToGcsRuns/closeDBChannel', { clearModule: true });
				await store.dispatch('getGbqToGcsRuns/fetchById', this.confId);
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
			return this.$route.params.id;
		},
		...mapState({
			getGbqToGcsRuns: state => state.getGbqToGcsRuns.data
		})
	}
};
</script>
