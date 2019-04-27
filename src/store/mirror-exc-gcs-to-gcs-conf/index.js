const mirrorExcGcsToGcsConf = {
  firestorePath: "mirror-exc-gcs-to-gcs-conf",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "mirrorExcGcsToGcsConf",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

export default mirrorExcGcsToGcsConf;
