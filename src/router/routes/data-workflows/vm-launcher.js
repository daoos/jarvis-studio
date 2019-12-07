export default [
	{
		path: '/vmlauncherruns',
		name: 'vmLauncherRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "vmlauncherruns" */ '@/views/data-workflows/vm-launcher/VmLauncherRuns.vue'),
		alias: '/runs/vmlauncher'
	},
	{
		path: '/vmlauncherconfs',
		name: 'vmLauncherConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "vmlauncherconfs" */ '@/views/data-workflows/vm-launcher/VmLauncherConfs.vue'),
		alias: '/conf/vmlauncher'
	}
];
