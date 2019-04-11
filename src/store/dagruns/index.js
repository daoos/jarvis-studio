const dagruns = {
  firestorePath: "composer-dag-runs",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "dagruns",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

export default dagruns;
