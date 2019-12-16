const accounts = {
	firestorePath: 'accounts',
	firestoreRefType: 'collection', // 'collection' or 'doc'
	moduleName: 'accounts',
	statePropName: 'data',
	namespaced: true, // automatically added
	sync: {
		guard: ['created_at', 'updated_at'] // array of keys
	},
	getters: {
		getAccounts(state) {
			return state.data;
		}
	}
};

export default accounts;
