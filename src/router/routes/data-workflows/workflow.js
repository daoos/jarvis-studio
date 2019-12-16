import { auth } from '@/router/middleware';

import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { WORKFLOW } from '@/constants/data-workflows/names';
import { STATUS, CONFIGURATIONS } from '@/constants/data-workflows/status';
import { WORKFLOW_STATUS_LISTING, WORKFLOW_CONFIGURATIONS_LISTING } from '@/constants/router/routes-names';

export default [
	/**
	 * STATUS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${STATUS}`,
		name: WORKFLOW_STATUS_LISTING,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/status/listing" */ '@/views/data-workflows/workflow/WorkflowStatus.vue'
			)
	},
	// TODO: Create status view

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${WORKFLOW}/${CONFIGURATIONS}`,
		name: WORKFLOW_CONFIGURATIONS_LISTING,
		meta: { middleware: [auth] },
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/workflow/configurations/listing" */ '@/views/data-workflows/workflow/WorkflowConfs.vue'
			)
	}
	// TODO: Create configuration view
];
