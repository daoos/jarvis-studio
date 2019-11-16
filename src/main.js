import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "@/router";
import store from "@/store/index";
import firebase from "firebase";

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
	created() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.$store.dispatch("autoSignIn", user);
				//Load Accounts into the Store/accounts module to apply user access management
				this.$store.dispatch("accounts/fetchAndAdd", { limit: 0 });
				//Load Schemas into the Store/schemas module to validate the schema of the different JSON Object in Firestore
				this.$store.dispatch("schemas/fetchAndAdd", { limit: 0 });
			} else {
				this.$store.dispatch("userSignOut");
			}
		});
	}
}).$mount("#app");
