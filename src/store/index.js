import Vue from "vue";
import Vuex from "vuex";
import user from "./user";

import { firebase, initFirebase } from "../firebase/firestore";
import router from "@/router";

Vue.use(Vuex);

import VuexEasyFirestore from "vuex-easy-firestore";

// Modules working with Vuex Easy Firestore
import gcpcloudfunctions from "./gcpcloudfunctions";
import accounts from "./accounts";
import schemas from "./schemas";
import settings from "./settings";
import mirrorExcGcsToGcsRuns from "./mirror-exc-gcs-to-gcs-runs";
import mirrorExcGcsToGcsConfs from "./mirror-exc-gcs-to-gcs-confs";
import mirrorExcGcsToGbqRuns from "./mirror-exc-gcs-to-gbq-runs";
import mirrorExcGcsToGbqConfs from "./mirror-exc-gcs-to-gbq-confs";
import mirrorExcGcsToGbqConfDetails from "./mirror-exc-gcs-to-gbq-conf-details";
import getGbqToGcsRuns from "./get-gbq-to-gcs-runs";
import getGbqToGcsConfs from "./get-gbq-to-gcs-confs";
import getGbqToGbqConfs from "./get-gbq-to-gbq-confs";
import getGbqToGbqRuns from "./get-gbq-to-gbq-runs";
import vmLauncherConfs from "./vm-launcher-confs";
import vmLauncherRuns from "./vm-launcher-runs";
import workflowConfs from "./workflow-confs";
import workflowStatus from "./workflow-status";
import dataModels from "./data-models";
import dataTables from "./data-tables";
import dataTableDetails from "./data-table-details";
import filters from "./filters";
import singleDoc from "./single-doc";
import storageToStorageConfs from "./storage-to-storage-confs";
import storageToStorageConf from "./storage-to-storage-conf";
import storageToStorageRuns from "./storage-to-storage-runs";
import storageToStorageRun from "./storage-to-storage-run";
import storageToTableConf from "@/store/storage-to-table-conf";
import storageToTableRun from "@/store/storage-to-table-run";
import tablesToTablesConf from "@/store/tables-to-tables-conf";
import tablesToTablesRun from "@/store/tables-to-tables-run";

const easyFirestores = VuexEasyFirestore(
  [
    gcpcloudfunctions,
    accounts,
    schemas,
    mirrorExcGcsToGcsRuns,
    mirrorExcGcsToGcsConfs,
    mirrorExcGcsToGbqRuns,
    mirrorExcGcsToGbqConfs,
    mirrorExcGcsToGbqConfDetails,
    getGbqToGcsRuns,
    getGbqToGcsConfs,
    getGbqToGbqConfs,
    getGbqToGbqRuns,
    vmLauncherConfs,
    vmLauncherRuns,
    workflowConfs,
    workflowStatus,
    dataModels,
    dataTables,
    dataTableDetails,
    storageToStorageConfs,
    storageToStorageConf,
    storageToStorageRuns,
    storageToStorageRun,
    storageToTableConf,
    storageToTableRun,
    tablesToTablesConf,
    tablesToTablesRun,
    singleDoc
  ],
  {
    logging: true,
    FirebaseDependency: firebase,
    preventInitialDocInsertion: true
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
  router.push("/signinEmail");
  // eslint-disable-next-line no-console
  console.error(error);
});

export default store;
