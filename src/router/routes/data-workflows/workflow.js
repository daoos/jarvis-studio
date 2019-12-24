import { auth, hasAccount } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { WORKFLOW } from '@/constants/data-workflows/names';
import { STATUS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import {
	WORKFLOW_STATUS_LISTING,
	WORKFLOW_STATUS_ITEM,
	WORKFLOW_CONFIGURATIONS_LISTING
} from '@/constants/router/routes-names';

export default [
	/**
	 * STATUS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${STATUS}`,
		name: WORKFLOW_STATUS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/status/ListingView'
			)
	},
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${STATUS}/:id`,
		name: WORKFLOW_STATUS_ITEM,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/status/ItemView'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${CONFIGURATIONS}`,
		name: WORKFLOW_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/configurations/listing" */ '@/views/data-workflows/workflow/WorkflowConfs.vue'
			)
	}
	// TODO: Create configuration view
];
