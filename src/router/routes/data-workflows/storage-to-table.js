export default [
	{
		path: '/storagetotable/confs',
		name: 'GcsToGbqConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "gcstogbqconfs" */ '@/views/data-workflows/storage-to-table/configuration/ConfigurationsView.vue'
			),
		alias: '/conf/gcstogbq'
	},
	{
		path: '/storagetotable/confs/:pathId',
		name: 'StorageToTableConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotableconf" */ '@/views/data-workflows/storage-to-table/configuration/StorageToTableConf.vue'
			)
	},
	{
		path: '/storagetotable/runs',
		name: 'GcsToGbqRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogbqruns" */ '@/views/data-workflows/storage-to-table/run/RunsView.vue'),
		alias: '/runs/gcstogbq'
	},
	{
		path: '/storagetotable/runs/:pathId',
		name: 'StorageToTableRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotablerun" */ '@/views/data-workflows/storage-to-table/run/StorageToTableRun.vue'
			)
	}
];
