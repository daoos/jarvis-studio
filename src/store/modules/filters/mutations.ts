import { MutationTree } from 'vuex';
import { FilterState } from '@/types';
import moment from 'moment';

export const mutations: MutationTree<FilterState> = {
	updateDateFilterSelected(state, dateFilterSelected) {
		state.dateFilterSelected = dateFilterSelected;
	},
	updateEnvFilterSelected(state, envFilterSelected) {
		state.envFilterSelected = envFilterSelected;
	},
	updateRunStatusFilterSelected(state, runStatusFilterSelected) {
		state.runStatusFilterSelected = runStatusFilterSelected;
	},
	updateMinDateFilter(state, dateFilterSelected) {
		state.minDateFilter = moment()
			.utc()
			.startOf('day')
			.subtract(dateFilterSelected.nbDays, 'days')
			.toISOString();
	},
	updateAccountFilterSelected(state, accounts) {
		state.filteredAccounts = accounts;
	}
};
