import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_TABLE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE}/${RUNS}`,
		name: 'GcsToGbqRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/listing" */ '@/views/data-workflows/storage-to-table/run/RunsView.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE}/${RUNS}/:pathId`,
		name: 'StorageToTableRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/runs/item" */ '@/views/data-workflows/storage-to-table/run/StorageToTableRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE}/${CONFIGURATIONS}`,
		name: 'GcsToGbqConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/listing" */ '@/views/data-workflows/storage-to-table/configuration/ConfigurationsView.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE}/${CONFIGURATIONS}/:pathId`,
		name: 'StorageToTableConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/item" */ '@/views/data-workflows/storage-to-table/configuration/StorageToTableConf.vue'
			)
	}
];
