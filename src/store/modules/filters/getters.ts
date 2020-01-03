import { GetterTree } from 'vuex';
import { FilterState, RootState } from '@/types';
import moment from 'moment';

export const getters: GetterTree<FilterState, RootState> = {
	periodFiltered(state) {
		//Compute the date array from minDateFilter to Now to build chart
		let periodFiltered = [];
		var i;
		for (i = 0; i <= state.dateFilterSelected.nbDays; i++) {
			periodFiltered.push(
				moment()
					.utc()
					.startOf('day')
					.subtract(state.dateFilterSelected.nbDays - i, 'days')
					.toISOString()
			);
		}
		return periodFiltered;
	},
	whereRunsFilter(state, getters, rootState) {
		let whereRunsFilter = [];

		const { filteredAccounts, minDateFilter, envFilterSelected, runStatusFilterSelected } = state;
		const formattedFilteredAccounts = filteredAccounts.map(account => account.id);

		if (minDateFilter !== undefined) {
			whereRunsFilter.push(['dag_execution_date', '>=', minDateFilter]);
		} else {
			whereRunsFilter.push(['dag_execution_date', '>=', '2019-01-01T00:00:00.000Z']);
		}

		if (filteredAccounts.length > 0) {
			whereRunsFilter.push(['account', 'in', formattedFilteredAccounts]);
		} else {
			whereRunsFilter.push(['account', 'in', rootState.user.user!.accounts]);
		}

		if (envFilterSelected.envId !== 'ALL') {
			whereRunsFilter.push(['environment', '==', envFilterSelected.envId]);
		}

		if (runStatusFilterSelected.runStatusId !== 'ALL') {
			whereRunsFilter.push(['status', '==', runStatusFilterSelected.runStatusId]);
		}

		return whereRunsFilter;
	},
	whereConfFilter(state, getters, rootState) {
		// TODO: Add status filter (activated)

		let whereConfFilter = [];
		const { filteredAccounts, envFilterSelected } = state;
		const formattedFilteredAccounts = filteredAccounts.map(account => account.id);

		if (formattedFilteredAccounts.length > 0) {
			whereConfFilter.push(['account', 'in', formattedFilteredAccounts]);
		} else {
			whereConfFilter.push(['account', 'in', rootState.user.user!.accounts]);
		}

		if (envFilterSelected.envId !== 'ALL') whereConfFilter.push(['environment', '==', state.envFilterSelected.envId]);

		return whereConfFilter;
	}
};
