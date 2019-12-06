<template>
	<v-container>
		<v-row v-if="!isFetchAndAdding">
			<v-col cols="12" offset="0">
				<v-tabs v-model="activeTab" color="black" background-color="#E0E0E0" slider-color="primary">
					<v-tab ripple href="#confoverview">Overview</v-tab>
					<v-tab ripple href="#conftasks">Tasks</v-tab>
					<v-tab ripple href="#fulljson">Full Json</v-tab>
					<v-tab ripple href="#conversation">Conversation</v-tab>

					<v-tab-item value="confoverview">
						<v-card v-if="this.conf !== undefined">
							<tablesToTablesConfOverview
								:conf="this.conf"
								:confId="this.conf.configuration.dag_name"
								:activeHeader="true"
							/>
						</v-card>
					</v-tab-item>

					<v-tab-item value="conftasks">
						<v-card v-if="this.conf !== undefined">
							<tablesToTalesConfTasksView
								:tasksConf="this.conf.configuration.workflow"
								:tasksSQL="this.conf.sql"
								:dagConf="this.conf.configuration"
							/>
						</v-card>
					</v-tab-item>

					<v-tab-item value="fulljson">
						<v-card>
							<viewJson :json="this.conf" :jsonID="this.conf.id" />
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
import store from '@/store';
import viewJson from '@/components/common/tmp/viewJson.vue';
import tablesToTablesConfOverview from '@/components/data-workflows/tables-to-tables/TablesToTablesConfOverview.vue';
import tablesToTalesConfTasksView from '@/components/data-workflows/tables-to-tables/TablesToTablesConfTasksView.vue';

export default {
	components: {
		viewJson,
		tablesToTablesConfOverview,
		tablesToTalesConfTasksView
	},
	data() {
		return {
			conf: undefined,
			isFetchAndAdding: true,
			activeTab: null
		};
	},
	async mounted() {
		await this.getConf();
	},
	methods: {
		async getConf() {
			this.isFetchAndAdding = true;
			if (this.getGbqToGbqConfs[this.confId] === undefined) await this.getFirestoreData();
			this.conf = this.getGbqToGbqConfs[this.confId];
			this.isFetchAndAdding = false;
		},
		async getFirestoreData() {
			try {
				await store.dispatch('getGbqToGbqConfs/closeDBChannel', { clearModule: true });
				await store.dispatch('getGbqToGbqConfs/fetchById', this.confId);
			} catch (e) {
				console.error(e);
			}
		}
	},
	computed: {
		...mapState({
			getGbqToGbqConfs: state => state.getGbqToGbqConfs.data
		}),
		confId() {
			return this.$route.params.confId;
		}
	}
};
</script>
