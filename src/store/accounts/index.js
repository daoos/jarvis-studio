const accounts = {
  firestorePath: "accounts",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "accounts",
  statePropName: "data",
  namespaced: true, // automatically added
  sync: {
    guard: ["created_at", "updated_at"] // array of keys
  },

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

export default accounts;
