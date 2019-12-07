export default [
	{
		path: '/conf/workflow',
		name: 'WorkflowConfs',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "workflowconfs" */ '@/views/data-workflows/workflow/WorkflowConfs.vue')
	},
	{
		path: '/status/workflow',
		name: 'WorkflowStatus',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "workflowstatus" */ '@/views/data-workflows/workflow/WorkflowStatus.vue')
	}
];
