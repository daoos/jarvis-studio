import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "@/router";
import store from "./store";
import firebase from "firebase";
import FirebaseConfig from "./firebase/config";

Vue.config.productionTip = false;

firebase.initializeApp(FirebaseConfig);

firebase
  .auth()
  .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .catch(function(error) {
    // eslint-disable-next-line no-console
    console.error(error.message);
  });

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      } else {
        this.$store.dispatch("userSignOut");
      }
    });
  }
}).$mount("#app");
