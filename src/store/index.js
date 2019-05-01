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
import gcpcloudfunctions from "./gcpcloudfunctions";
import accounts from "./accounts";
import settings from "./settings";
import mirrorgcsconfigurations from "./mirrorgcsconfigurations";
import mirrorExcGcsToGcsRuns from "./mirror-exc-gcs-to-gcs-runs";
import mirrorExcGcsToGcsConf from "./mirror-exc-gcs-to-gcs-conf";
import mirrorExcGcsToGbqRuns from "./mirror-exc-gcs-to-gbq-runs";
import mirrorExcGcsToGbqConf from "./mirror-exc-gcs-to-gbq-conf";
import mirrorExcGcsToGbqConfDetails from "./mirror-exc-gcs-to-gbq-conf-details";
import getGbqToGcsRuns from "./get-gbq-to-gcs-runs";

import filters from "./filters";
import vmLauncherRuns from "./vm-launcher-runs";

const easyFirestores = VuexEasyFirestore(
  [
    dagruns,
    dagconfigurations,
    gcpcloudfunctions,
    accounts,
    mirrorgcsconfigurations,
    mirrorExcGcsToGcsRuns,
    mirrorExcGcsToGcsConf,
    mirrorExcGcsToGbqRuns,
    mirrorExcGcsToGbqConf,
    mirrorExcGcsToGbqConfDetails,
    getGbqToGcsRuns,
    vmLauncherRuns
  ],
  {
    logging: true,
    FirebaseDependency: firebase
  }
);

const storeData = {
  modules: {
    user,
    filters,
    settings
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
