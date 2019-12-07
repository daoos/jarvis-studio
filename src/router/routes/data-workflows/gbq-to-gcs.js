export default [
	{
		path: '/gbqtogcsconfs',
		name: 'gbqToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationsView.vue'),
		alias: '/conf/gbqtogcs'
	},
	{
		path: '/gbqtogcs/conf/:confId',
		name: 'GbqToGcsConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationView.vue')
	},
	{
		path: '/gbqtogcsruns',
		name: 'gbqToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsruns" */ '@/views/data-workflows/gbq-to-gcs/GbqToGcsRuns.vue'),
		alias: '/runs/gbqtogcs'
	}
];
