export default [
	{
		path: '/storagetostorage/runs/:runId',
		name: 'StorageToStorageRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostoragerun" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRun.vue'
			)
	},
	{
		path: '/storagetostorage/confs',
		name: 'StorageToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageconfs" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConfs.vue'
			)
	},
	{
		path: '/storagetostorage/confs/:confId',
		name: 'StorageToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageconf" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConf.vue'
			)
	},
	{
		path: '/storagetostorage/runs',
		name: 'StorageToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageruns" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRuns.vue'
			)
	}
];
