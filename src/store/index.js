import Vue from "vue";
import Vuex from "vuex";
import user from "./user";

import { firebase, initFirebase } from "../firebase/firestore";
import router from "@/router";

Vue.use(Vuex);

import VuexEasyFirestore from "vuex-easy-firestore";

// Modules working with Vuex Easy Firestore
import dagruns from "./dagruns";
import dagconfigurations from "./dagconfigurations";
import mirrorgcsruns from "./mirrorgcsruns";
import gcpcloudfunctions from "./gcpcloudfunctions";
import accounts from "./accounts";
import mirrorgcsconfigurations from "./mirrorgcsconfigurations";
const easyFirestores = VuexEasyFirestore(
  [
    dagruns,
    dagconfigurations,
    mirrorgcsruns,
    gcpcloudfunctions,
    accounts,
    mirrorgcsconfigurations
  ],
  {
    logging: true,
    FirebaseDependency: firebase
  }
);

const storeData = {
  modules: {
    user: user
  },
  plugins: [easyFirestores]
};

const store = new Vuex.Store(storeData);

// initFirebase
initFirebase().catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
  router.push("/signin");
  // eslint-disable-next-line no-console
  console.error(error);
});

export default store;
