const gcpcloudfunctions = {
  firestorePath: "gcp-cloud-functions",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "gcpcloudfunctions",
  statePropName: "data",
  namespaced: true, // automatically added

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {
    data(state) {
      return state.data;
    }
  },
  mutations: {},
  actions: {}
};

export default gcpcloudfunctions;
