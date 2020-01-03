import { auth, hasAccount } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { TABLE_TO_STORAGE } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	TABLE_TO_STORAGE_RUNS_LISTING,
	TABLE_TO_STORAGE_RUNS_ITEM,
	TABLE_TO_STORAGE_CONFIGURATIONS_LISTING,
	TABLE_TO_STORAGE_CONFIGURATIONS_ITEM
} from '@/constants/router/routes-names';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${RUNS}`,
		name: TABLE_TO_STORAGE_RUNS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/runs/listing" */ '@/views/data-workflows/table-to-storage/runs/ListingView'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${RUNS}/:id`,
		name: TABLE_TO_STORAGE_RUNS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(/* webpackChunkName: "tabletostoragerun" */ '@/views/data-workflows/table-to-storage/runs/ItemView')
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${CONFIGURATIONS}`,
		name: TABLE_TO_STORAGE_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/configurations/listing" */ '@/views/data-workflows/table-to-storage/configurations/ListingView'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${TABLE_TO_STORAGE}/${CONFIGURATIONS}/:id`,
		name: TABLE_TO_STORAGE_CONFIGURATIONS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/table-to-storage/configurations/item" */ '@/views/data-workflows/table-to-storage/configurations/ItemView'
			)
	}
];
