<template>
	<v-row align="center" justify="end" class="pr-5">
		<v-menu transition="slide-y-transition" bottom>
			<template v-slot:activator="{ on }">
				<v-btn small outlined v-on="on" class="mr-3">
					{{ envFilterSelected.envLabel }}
					<v-icon>arrow_drop_down</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item v-for="environment in envFilters" :key="environment.envId" @click="applyEnvFilter(environment)">
					<v-list-item-title>{{ environment.envLabel }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-menu transition="slide-y-transition" bottom>
			<template v-slot:activator="{ on }">
				<v-btn small outlined v-on="on" class="mr-3">
					{{ runStatusFilterSelected.runStatusLabel }}
					<v-icon>arrow_drop_down</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="runStatus in runStatusFilters"
					:key="runStatus.runStatusId"
					@click="applyRunStatusFilter(runStatus)"
				>
					<v-list-item-title>{{ runStatus.runStatusLabel }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<v-menu transition="slide-y-transition" bottom>
			<template v-slot:activator="{ on }">
				<v-btn small outlined v-on="on">
					{{ dateFilterSelected.dateLabel }}
					<v-icon class="contrast--text">arrow_drop_down</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item v-for="date in dateFilters" :key="date.nbDays" @click="applyDateFilter(date)">
					<v-list-item-title>{{ date.dateLabel }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>
	</v-row>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';

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
			store.dispatch('applyEnvFilterSelected', envFilterSelected);
		},
		applyRunStatusFilter(runStatusSelected) {
			store.dispatch('applyRunStatusFilterSelected', runStatusSelected);
		},
		applyDateFilter(dateFilterSelected) {
			store.dispatch('applyDateFilterSelected', dateFilterSelected);
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
