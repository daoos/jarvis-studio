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
        //Load the Account into the Store/account module
        this.$store.dispatch("accounts/fetchAndAdd", { limit: 0 });
      } else {
        this.$store.dispatch("userSignOut");
      }
    });
  }
}).$mount("#app");
