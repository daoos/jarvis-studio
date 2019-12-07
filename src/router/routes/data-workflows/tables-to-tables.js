export default [
	{
		path: '/tablestotables/confs',
		name: 'TablesToTablesConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesconfs" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConfs.vue'
			),
		alias: '/conf/gbqtogbq'
	},
	{
		path: '/tablestotables/confs/:confId',
		name: 'TablesToTablesConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesconf" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConf.vue'
			)
	},
	{
		path: '/tablestotables/runs',
		name: 'TablesToTablesRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotableconfs" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRuns.vue'
			),
		alias: '/runs/gbqtogbq'
	},
	{
		path: '/tablestotables/runs/:pathId',
		name: 'TablesToTablesRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesrun" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRun.vue'
			)
	}
];
