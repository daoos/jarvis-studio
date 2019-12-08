import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { GCS_TO_GCS } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${RUNS}`,
		name: 'GcsToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/listing" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRuns.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${RUNS}/:runId`,
		name: 'GcsToGcsRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/runs/item" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRun.vue'
			)
	},

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${CONFIGURATIONS}`,
		name: 'GcsToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/listing" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConfs.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${GCS_TO_GCS}/${CONFIGURATIONS}/:confId`,
		name: 'GcsToGcsConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gcs-to-gcs/configurations/item" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConf.vue'
			)
	}
];
