import Vue from 'vue';
import App from './App.vue';
import router from '@/router';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import vueMoment from 'vue-moment';
import firebase from 'firebase';

Vue.config.productionTip = false;

Vue.use(vueMoment);

let app = null;

const createApp = () => {
	if (!app) {
		app = new Vue({
			store,
			router,
			vuetify,
			render: h => h(App)
		}).$mount('#app');
	}
};

firebase.auth().onAuthStateChanged(user => {
	// TODO: Fetch accounts while filtering on account_name from `getUserAccounts`

	if (user) {
		Promise.all([
			store.dispatch('autoSignIn', user),
			store.dispatch('accounts/fetchAndAdd'),
			store.dispatch('schemas/fetchAndAdd')
		]).then(() => createApp());
	} else {
		createApp();
	}
});

Vue.use(require('vue-moment'));
