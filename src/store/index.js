import Vue from 'vue';
import Vuex from 'vuex';
import router from '@/router';

// Store modules
import user from './user';
import filters from './filters';

import VuexEasyFirestore from 'vuex-easy-firestore';
import VuexPersist from 'vuex-persist';
import easyFirestoreModules from './easy-firestore-modules';

import { firebase, initFirebase } from '../firebase/firestore';
import { SIGN_IN } from '@/constants/router/routes-names';

initFirebase().catch(error => {
	// TODO: Redirect to error page (have to create one)
	// Redirect user to a page stating an error occurred
	// => (might be a connection error, or the app is open in another tab)
	router.push({ name: SIGN_IN });
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
