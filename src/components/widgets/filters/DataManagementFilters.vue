<template>
	<v-row align="center" justify="end" class="pr-5">
		<v-menu :nudge-width="100" v-if="viewEnvironnement">
			<v-toolbar-title slot="activator" class="pr-2">
				<span class="body-2 contrast--text">{{
					envFilterSelected.envLabel
				}}</span>
				<v-icon class="contrast--text">arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list light>
				<v-list-item
					v-for="environment in envFilters"
					:key="environment.envId"
					@click="applyEnvFilter(environment)"
				>
					<v-list-item-title v-text="environment.envLabel"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-menu :nudge-width="100" v-if="viewRunStatus">
			<v-toolbar-title slot="activator" class="pr-2">
				<span class="body-2 contrast--text">{{
					runStatusFilterSelected.runStatusLabel
				}}</span>
				<v-icon class="contrast--text">arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list light>
				<v-list-item
					v-for="runStatus in runStatusFilters"
					:key="runStatus.runStatusId"
					@click="applyRunStatusFilter(runStatus)"
				>
					<v-list-item-title
						v-text="runStatus.runStatusLabel"
					></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
		<v-menu :nudge-width="100" v-if="viewPeriode">
			<v-toolbar-title slot="activator" class="pr-2">
				<span class="body-2 contrast--text">{{
					dateFilterSelected.dateLabel
				}}</span>
				<v-icon class="contrast--text">arrow_drop_down</v-icon>
			</v-toolbar-title>
			<v-list light>
				<v-list-item
					v-for="date in dateFilters"
					:key="date.nbDays"
					@click="applyDateFilter(date)"
				>
					<v-list-item-title v-text="date.dateLabel"></v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-row>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
	components: {},
	props: {
		viewEnvironnement: Boolean,
		viewPeriode: Boolean,
		viewRunStatus: Boolean
	},
	data: () => ({}),
	created() {},
	methods: {
		applyEnvFilter(envFilterSelected) {
			store.dispatch("applyEnvFilterSelected", envFilterSelected);
		},
		applyRunStatusFilter(runStatusSelected) {
			store.dispatch("applyRunStatusFilterSelected", runStatusSelected);
		},
		applyDateFilter(dateFilterSelected) {
			store.dispatch("applyDateFilterSelected", dateFilterSelected);
		}
	},
	computed: {
		...mapState({
			isAuthenticated: state => state.user.isAuthenticated,
			user: state => state.user.user,
			envFilterSelected: state => state.filters.envFilterSelected,
			envFilters: state => state.filters.envFilters,
			runStatusFilterSelected: state => state.filters.runStatusFilterSelected,
			runStatusFilters: state => state.filters.runStatusFilters,
			dateFilterSelected: state => state.filters.dateFilterSelected,
			dateFilters: state => state.filters.dateFilters
		})
	}
};
</script>
