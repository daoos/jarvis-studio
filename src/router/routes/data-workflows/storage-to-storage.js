import { auth, hasAccount } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { STORAGE_TO_STORAGE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	STORAGE_TO_STORAGE_RUNS_LISTING,
	STORAGE_TO_STORAGE_RUNS_ITEM,
	STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING,
	STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${RUNS}`,
		name: STORAGE_TO_STORAGE_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/runs/listing" */ '@/views/data-workflows/storage-to-storage/runs/ListingView.vue'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${RUNS}/:id`,
		name: STORAGE_TO_STORAGE_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/run/item" */ '@/views/data-workflows/storage-to-storage/runs/ItemView.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${CONFIGURATIONS}`,
		name: STORAGE_TO_STORAGE_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/configurations/listing" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${STORAGE_TO_STORAGE}/${CONFIGURATIONS}/:confId`,
		name: STORAGE_TO_STORAGE_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/storage-to-storage/configurations/item" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConf.vue'
			)
	}
];
