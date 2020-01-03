import { getters } from '@/store/modules/filters/getters';
import { actions } from '@/store/modules/filters/actions';
import { mutations } from '@/store/modules/filters/mutations';

import moment from 'moment';
import { Module } from 'vuex';
import { FilterState, RootState } from '@/types';

export const state: FilterState = {
	dateFilterSelected: {
		dateLabel: 'Last 2 Days',
		nbDays: 1
	},
	dateFilters: [
		{ dateLabel: 'Today', nbDays: 0 },
		{ dateLabel: 'Last 2 Days', nbDays: 1 },
		{ dateLabel: 'Last 7 Days', nbDays: 7 },
		{ dateLabel: 'Last 30 Days', nbDays: 31 },
		{ dateLabel: 'Last 90 Days', nbDays: 90 }
	],
	envFilterSelected: {
		envLabel: 'All Env.',
		envId: 'ALL'
	},
	envFilters: [
		{ envLabel: 'All Env.', envId: 'ALL' },
		{ envLabel: 'Production', envId: 'PROD' },
		{ envLabel: 'Pre-Production', envId: 'PREPROD' },
		{ envLabel: 'Staging', envId: 'STAGING' },
		{ envLabel: 'Development', envId: 'DEV' }
	],
	runStatusFilterSelected: {
		runStatusLabel: 'All Status',
		runStatusId: 'ALL'
	},
	runStatusFilters: [
		{ runStatusLabel: 'All Status', runStatusId: 'ALL' },
		{ runStatusLabel: 'Success', runStatusId: 'SUCCESS' },
		{ runStatusLabel: 'Failed', runStatusId: 'FAILED' },
		{ runStatusLabel: 'Running', runStatusId: 'RUNNING' }
	],
	minDateFilter: moment()
		.utc()
		.startOf('day')
		.subtract(1, 'days')
		.toISOString(),
	accountFilterSelected: { account_name: 'All Accounts', id: '000000' },
	filteredAccounts: []
};

const namespaced: boolean = true;

export const filtersModule: Module<FilterState, RootState> = {
	// namespaced,
	state,
	getters,
	actions,
	mutations
};
