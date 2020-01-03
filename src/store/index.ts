import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';
import VuexPersist from 'vuex-persist';
import { RootState } from '@/types';

import { userModule } from './modules/user';
import { filtersModule } from './modules/filters';
import easyFirestoreModules from './modules/easy-firestore';
import { firebase, initFirebase } from '../config/firebase';

initFirebase().catch(error => {
	console.error(error);
});

Vue.use(Vuex);

const easyFirestore = VuexEasyFirestore(easyFirestoreModules, {
	logging: process.env.NODE_ENV === 'development',
	FirebaseDependency: firebase,
	preventInitialDocInsertion: true
});

const vuexLocalStorage = new VuexPersist({
	key: 'vuex',
	storage: window.localStorage,
	reducer: (state: any) => ({
		filters: state.filters
	})
});

const storeOptions: StoreOptions<RootState> = {
	modules: { user: userModule, filters: filtersModule },
	plugins: [easyFirestore, vuexLocalStorage.plugin]
};

export default new Vuex.Store<RootState>(storeOptions);
