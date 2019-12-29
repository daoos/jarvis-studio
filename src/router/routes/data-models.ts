import { auth, hasAccount } from '@/router/middleware';

import { DATA_MODELS } from '@/constants/router/paths-prefixes';
import { DATA_TABLE_DETAILS } from '@/constants/router/routes-names';

export default [
	{
		path: `/${DATA_MODELS}/:projectId/:datasetId/:tableId`,
		name: DATA_TABLE_DETAILS,
		meta: { middleware: [auth, hasAccount] },
		component: () =>
			import(/* webpackChunkName: "data-models/data-table-details" */ '@/views/data-models/DataTableDetails.vue')
	}
];
