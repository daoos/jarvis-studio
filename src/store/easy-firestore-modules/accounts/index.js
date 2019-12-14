const accounts = {
	firestorePath: 'accounts',
	firestoreRefType: 'collection', // 'collection' or 'doc'
	moduleName: 'accounts',
	statePropName: 'data',
	namespaced: true, // automatically added
	sync: {
		// TODO: Add where to filter on available user accounts
		guard: ['created_at', 'updated_at'] // array of keys
	},

	// this object is your store module (will be added as '/myModule')
	// you can also add state/getters/mutations/actions
	state: {},
	getters: {},
	mutations: {},
	actions: {}
};

export default accounts;
