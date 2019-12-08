import { DATA_MODELS } from '@/constants/router/paths-prefixes';

export default [
	{
		path: `/${DATA_MODELS}/:projectId/:datasetId/:tableId`,
		name: 'DataTableDetails',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "data-models/data-table-details" */ '@/views/data-models/DataTableDetails.vue')
	}
];
