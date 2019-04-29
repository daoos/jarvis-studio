const mirrorExcGcsToGbqConf = {
  firestorePath: "mirror-exc-gcs-to-gbq-conf",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "mirrorExcGcsToGbqConf",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

export default mirrorExcGcsToGbqConf;
