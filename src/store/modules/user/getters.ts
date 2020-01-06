import { GetterTree } from 'vuex';
import { RootState, UserState } from '@/types';

export const getters: GetterTree<UserState, RootState> = {
	isAuthenticated(state) {
		return state.isAuthenticated;
	},
	user(state) {
		return state.user;
	},
	accounts(state) {
		return state.user!.accounts;
	}
};
