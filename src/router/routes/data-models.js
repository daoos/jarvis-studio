export default [
	{
		path: '/datamodel/:projectId/:datasetId/:tableId',
		name: 'DataTableDetails',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "datatabledetails" */ '@/views/data-models/DataTableDetails.vue')
	}
];
