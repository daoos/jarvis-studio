import Vue from 'vue';
import App from './App.vue';
import index from '@/router';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = null;

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch('autoSignIn', user);
		//Load Accounts into the Store/accounts module to apply user access management
		store.dispatch('accounts/fetchAndAdd', { limit: 0 });
		//Load Schemas into the Store/schemas module to validate the schema of the different JSON Object in Firestore
		store.dispatch('schemas/fetchAndAdd', { limit: 0 });
	} else {
		// TODO: Redirect to logout page once created
		store.dispatch('userSignOut');
	}

	if (!app) {
		app = new Vue({
			router: index,
			store,
			vuetify,
			render: h => h(App)
		}).$mount('#app');
	}
});
