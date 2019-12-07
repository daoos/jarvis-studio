export default [
	{
		path: '/tabletostorage/confs',
		name: 'TableToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationsView.vue'
			)
	},
	{
		path: '/tabletostorage/conf/:confId',
		name: 'TableToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationView.vue'
			)
	},
	{
		path: '/tabletostorage/runs',
		name: 'TableToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageruns" */ '@/views/data-workflows/table-to-storage/TableToStorageRuns.vue'
			)
	}

	// {
	// 	path: '/tabletostorage/runs/:pathId',
	// 	name: 'TableToStorageRun',
	// 	meta: {
	// 		authRequired: true
	// 	},
	// 	component: () => import(/* webpackChunkName: "tabletostoragerun" */ '@/views/TableToStorageRun.vue')
	// },
];
