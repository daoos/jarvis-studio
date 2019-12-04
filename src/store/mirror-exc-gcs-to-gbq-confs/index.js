const mirrorExcGcsToGbqConfs = {
	firestorePath: 'mirror-exc-gcs-to-gbq-conf',
	firestoreRefType: 'collection',
	moduleName: 'mirrorExcGcsToGbqConfs',
	statePropName: 'data',
	namespaced: true,
	sync: {
		guard: ['created_at', 'updated_at']
	}
};

export default mirrorExcGcsToGbqConfs;
