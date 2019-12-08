import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { TABLES_TO_TABLES } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${RUNS}`,
		name: 'TablesToTablesRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/listing" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRuns.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${RUNS}/:pathId`,
		name: 'TablesToTablesRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/runs/item" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${CONFIGURATIONS}`,
		name: 'TablesToTablesConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/listing" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${TABLES_TO_TABLES}/${CONFIGURATIONS}/:confId`,
		name: 'TablesToTablesConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/tables-to-tables/configurations/item" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConf.vue'
			)
	}
];
