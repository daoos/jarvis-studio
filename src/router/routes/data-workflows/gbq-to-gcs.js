import { DATA_WORKFLOWS } from '@/constants/router/paths-prefixes';
import { GBQ_TO_GCS } from '@/constants/data-workflows/names';
import { RUNS, CONFIGURATIONS } from '@/constants/data-workflows/status';

export default [
	/**
	 * RUNS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${RUNS}`,
		name: 'gbqToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/runs/listing" */ '@/views/data-workflows/gbq-to-gcs/GbqToGcsRuns.vue'
			)
	},
	// TODO: Create run view

	/**
	 * CONFIGURATIONS
	 */
	{
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${CONFIGURATIONS}`,
		name: 'gbqToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/configurations/listing" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationsView.vue'
			)
	},
	{
		// TODO: Rename param to :id
		path: `/${DATA_WORKFLOWS}/${GBQ_TO_GCS}/${CONFIGURATIONS}/:confId`,
		name: 'GbqToGcsConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "/data-workflows/gbq-to-gcs/configurations/item" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationView.vue'
			)
	}
];
