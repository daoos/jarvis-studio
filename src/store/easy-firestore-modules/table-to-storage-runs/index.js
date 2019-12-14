const tableToStorageRuns = {
	firestorePath: 'table-to-storage-runs',
	firestoreRefType: 'collection', // 'collection' or 'doc'
	moduleName: 'tableToStorageRuns',
	statePropName: 'data',
	namespaced: true, // automatically added
	sync: {
		guard: ['created_at', 'updated_at'] // array of keys
	},

	// this object is your store module (will be added as '/myModule')
	// you can also add state/getters/mutations/actions
	state: {},
	getters: {},
	mutations: {},
	actions: {}
};

export default tableToStorageRuns;
