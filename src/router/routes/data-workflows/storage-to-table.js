import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_TABLE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	STORAGE_TO_TABLE_RUNS_LISTING,
	STORAGE_TO_TABLE_RUNS_ITEM,
	STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
	STORAGE_TO_TABLE_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_TABLE}/${RUNS}`,
		name: STORAGE_TO_TABLE_RUNS_LISTING,
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
		name: STORAGE_TO_TABLE_RUNS_ITEM,
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
		name: STORAGE_TO_TABLE_CONFIGURATIONS_LISTING,
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
		name: STORAGE_TO_TABLE_CONFIGURATIONS_ITEM,
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-table/configurations/item" */ '@/views/data-workflows/storage-to-table/configuration/StorageToTableConf.vue'
			)
	}
];
