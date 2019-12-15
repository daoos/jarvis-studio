import Vue from 'vue';
import App from './App.vue';
import index from '@/router';
import store from '@/store/index';
import vuetify from './plugins/vuetify';
import firebase from 'firebase';

Vue.config.productionTip = false;

let app = null;

const createApp = () => {
	if (!app) {
		app = new Vue({
			router: index,
			store,
			vuetify,
			render: h => h(App)
		}).$mount('#app');
	}
};

firebase.auth().onAuthStateChanged(user => {
	if (user) {
		store.dispatch('autoSignIn', user).then(() => createApp());
		store.dispatch('accounts/fetchAndAdd', { limit: 0 });
		store.dispatch('schemas/fetchAndAdd', { limit: 0 });
	} else {
		createApp();
		// TODO: Redirect to logout page once created
	}
});
