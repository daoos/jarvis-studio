import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { TABLE_TO_STORAGE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${RUNS}`,
		name: 'TableToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/runs/listing" */ '@/views/data-workflows/table-to-storage/TableToStorageRuns.vue'
			)
	},
	// TODO: Create run view

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${CONFIGURATIONS}`,
		name: 'TableToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/configurations/listing" */ '@/views/data-workflows/table-to-storage/ConfigurationsView.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${CONFIGURATIONS}/:confId`,
		name: 'TableToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/configurations/item" */ '@/views/data-workflows/table-to-storage/ConfigurationView.vue'
			)
	}
];
