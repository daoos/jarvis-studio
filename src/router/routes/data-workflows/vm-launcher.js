import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { VM_LAUNCHER } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER}/${RUNS}`,
		name: 'vmLauncherRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/runs/listing" */ '@/views/data-workflows/vm-launcher/VmLauncherRuns.vue'
			)
	},
	// TODO: Create run view

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${VM_LAUNCHER}/${CONFIGURATIONS}`,
		name: 'vmLauncherConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/vm-launcher/configurations/listing" */ '@/views/data-workflows/vm-launcher/VmLauncherConfs.vue'
			)
	}
	// TODO: Create configuration view
];
