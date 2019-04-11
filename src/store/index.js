import Vue from "vue";
import Vuex from "vuex";
import user from "./user";

import { firebase, initFirebase } from "../firebase/firestore";
import router from "@/router";

Vue.use(Vuex);

import VuexEasyFirestore from "vuex-easy-firestore";

// Modules working with Vuex Easy Firestore
import dagruns from "./dagruns";
const dagrunsModule = VuexEasyFirestore([dagruns], {
  logging: true,
  FirebaseDependency: firebase
});
import dagconfigurations from "./dagconfigurations";
const dagconfigurationsModule = VuexEasyFirestore([dagconfigurations], {
  logging: true,
  FirebaseDependency: firebase
});
import mirrorgcsruns from "./mirrorgcsruns";
const mirrorgcsrunsModule = VuexEasyFirestore([mirrorgcsruns], {
  logging: true,
  FirebaseDependency: firebase
});

const storeData = {
  modules: {
    user: user
  },
  plugins: [dagrunsModule, dagconfigurationsModule, mirrorgcsrunsModule]
};

const store = new Vuex.Store(storeData);

// initFirebase
initFirebase().catch(error => {
  // take user to a page stating an error occurred
  // (might be a connection error, or the app is open in another tab)
  router.push("/signin");
  console.log(error);
});

export default store;
