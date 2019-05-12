const getGbqToGbqConfs = {
  firestorePath: "gbq-to-gbq-conf",
  firestoreRefType: "collection", // 'collection' or 'doc'
  moduleName: "getGbqToGbqConfs",
  statePropName: "data",
  namespaced: true, // automatically added
  sync: {
    guard: ["created_at", "updated_at"], // array of keys
  },

  // this object is your store module (will be added as '/myModule')
  // you can also add state/getters/mutations/actions
  state: {},
  getters: {},
  mutations: {},
  actions: {}
};

export default getGbqToGbqConfs;
