import { Module } from 'vuex';
import { RootState, UserState } from '@/types';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

export const state: UserState = {
	user: Object,
	isAuthenticated: false
};

export const userModule: Module<UserState, RootState> = {
	state,
	getters,
	actions,
	mutations
};
