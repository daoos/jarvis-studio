import Vue from 'vue';
import { Configuration } from '@/types';
import { IPluginState } from 'vuex-easy-firestore/types/declarations';
import { STATE_PROP_NAME } from '@/constants/store/easy-firestore';

/**
 * TODO: Remove this mutation when configuration update will be implemented on `ItemView` from `HistoryComponent`
 * Why? Because we need to "fake" the update
 * Once a user click on an archived conf, it data has to be updated but not saved **for the moment**
 */
export const UPDATE_DOCUMENT_LOCALLY = (
	state: IPluginState,
	{ id, newDoc }: { id: string; newDoc: Configuration }
): void => {
	if (!state[STATE_PROP_NAME][id]) throw new Error('Cannot find id to update document.');
	Vue.set(state, STATE_PROP_NAME, { ...state[STATE_PROP_NAME], [id]: newDoc });
};
