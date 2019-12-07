export default [
	{
		path: '/gcs-to-gcs/conf/listing',
		name: 'GcsToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogcsconfs" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConfs.vue'),
		alias: '/conf/gcstogcs'
	},
	{
		path: '/gcs-to-gcs-run/listing',
		name: 'GcsToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogcsruns" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRuns.vue'),
		alias: '/runs/gcstogcs'
	},
	{
		path: '/gcs-to-gcs/conf/:confId',
		name: 'GcsToGcsConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsconf" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConf.vue')
	},
	{
		path: '/gcs-to-gcs/run/:runId',
		name: 'GcsToGcsRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsrun" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRun.vue')
	}
];
