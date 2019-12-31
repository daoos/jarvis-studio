import Vue from 'vue';
import Vuex from 'vuex';
import VuexEasyFirestore from 'vuex-easy-firestore';
import VuexPersist from 'vuex-persist';

import user from './modules/user';
import filters from './modules/filters';
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
	reducer: state => ({
		filters: state.filters
	})
});

const store = new Vuex.Store({
	modules: { user, filters },
	plugins: [easyFirestore, vuexLocalStorage.plugin]
});

export default store;
