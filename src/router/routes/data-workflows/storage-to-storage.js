import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_STORAGE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${RUNS}`,
		name: 'StorageToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/runs/listing" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRuns.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${RUNS}/:runId`,
		name: 'StorageToStorageRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/run/item" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${CONFIGURATIONS}`,
		name: 'StorageToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/configurations/listing" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${CONFIGURATIONS}/:confId`,
		name: 'StorageToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/configurations/item" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConf.vue'
			)
	}
];
