export default [
	/**
	 * App
	 */
	{
		path: '*',
		name: 'not-found',
		meta: { authRequired: true },
		component: () => import(/* webpackChunkName: "home" */ '@/views/app/NotFound.vue')
	},
	{
		path: '/',
		name: 'home',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "home" */ '@/views/app/Home.vue')
	},

	/**
	 * Auth
	 */
	{
		path: '/signin',
		name: 'signin',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "signin" */ '@/views/sign-in/Signin.vue')
	},
	{
		path: '/signinemail',
		name: 'signinEmail',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "signinEmail" */ '@/views/sign-in/SigninEmail.vue')
	},

	/**
	 * Settings
	 */
	{
		path: '/settings/user/profile',
		name: 'userProfile',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "userprofile" */ '@/views/settings/Profile.vue')
	},
	{
		path: '/settings/users',
		name: 'users',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "users" */ '@/views/settings/Users.vue')
	},
	{
		path: '/accounts',
		name: 'accounts',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "accounts" */ '@/views/settings/Accounts.vue'),
		alias: '/settings/accounts'
	},
	{
		path: '/gcpcloudfunctions',
		name: 'gcpcloudfunctions',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "gcpcloudfunctions" */ '@/views/settings/CloudFunctions.vue'),
		alias: '/settings/gcpcloudfunctions'
	},

	/**
	 * GcsToGcs
	 */
	{
		path: '/gcstogcsconfs',
		name: 'GcsToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogcsconfs" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConfs.vue'),
		alias: '/conf/gcstogcs'
	},
	{
		path: '/gcstogcsruns',
		name: 'GcsToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogcsruns" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRuns.vue'),
		alias: '/runs/gcstogcs'
	},
	{
		path: '/conf/gcstogcs/:confId',
		name: 'GcsToGcsConf',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsconf" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsConf.vue')
	},
	{
		path: '/gcstogcs/runs/:runId',
		name: 'GcsToGcsRun',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "gcstogcsrun" */ '@/views/data-workflows/gcs-to-gcs/GcsToGcsRun.vue')
	},

	/**
	 * Storage to storage
	 */
	{
		path: '/storagetostorage/runs/:runId',
		name: 'StorageToStorageRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostoragerun" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRun.vue'
			)
	},
	{
		path: '/storagetostorage/confs',
		name: 'StorageToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageconfs" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConfs.vue'
			)
	},
	{
		path: '/storagetostorage/confs/:confId',
		name: 'StorageToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageconf" */ '@/views/data-workflows/storage-to-storage/StorageToStorageConf.vue'
			)
	},
	{
		path: '/storagetostorage/runs',
		name: 'StorageToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetostorageruns" */ '@/views/data-workflows/storage-to-storage/StorageToStorageRuns.vue'
			)
	},

	/**
	 * Storage to table
	 */
	{
		path: '/storagetotable/confs',
		name: 'GcsToGbqConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "gcstogbqconfs" */ '@/views/data-workflows/storage-to-table/configuration/ConfigurationsView.vue'
			),
		alias: '/conf/gcstogbq'
	},
	{
		path: '/storagetotable/confs/:pathId',
		name: 'StorageToTableConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotableconf" */ '@/views/data-workflows/storage-to-table/configuration/StorageToTableConf.vue'
			)
	},
	{
		path: '/storagetotable/runs',
		name: 'GcsToGbqRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gcstogbqruns" */ '@/views/data-workflows/storage-to-table/run/RunsView.vue'),
		alias: '/runs/gcstogbq'
	},
	{
		path: '/storagetotable/runs/:pathId',
		name: 'StorageToTableRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotablerun" */ '@/views/data-workflows/storage-to-table/run/StorageToTableRun.vue'
			)
	},

	/**
	 * Tables to tables
	 */
	{
		path: '/tablestotables/confs',
		name: 'TablesToTablesConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesconfs" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConfs.vue'
			),
		alias: '/conf/gbqtogbq'
	},
	{
		path: '/tablestotables/confs/:confId',
		name: 'TablesToTablesConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesconf" */ '@/views/data-workflows/tables-to-tables/TablesToTablesConf.vue'
			)
	},
	{
		path: '/tablestotables/runs',
		name: 'TablesToTablesRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "storagetotableconfs" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRuns.vue'
			),
		alias: '/runs/gbqtogbq'
	},
	{
		path: '/tablestotables/runs/:pathId',
		name: 'TablesToTablesRun',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tablestotablesrun" */ '@/views/data-workflows/tables-to-tables/TablesToTablesRun.vue'
			)
	},

	/**
	 * GbqToGcs
	 */
	{
		path: '/gbqtogcsconfs',
		name: 'gbqToGcsConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationsView.vue'),
		alias: '/conf/gbqtogcs'
	},
	{
		path: '/gbqtogcs/conf/:confId',
		name: 'GbqToGcsConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsconfs" */ '@/views/data-workflows/gbq-to-gcs/ConfigurationView.vue')
	},
	{
		path: '/gbqtogcsruns',
		name: 'gbqToGcsRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(/* webpackChunkName: "gbqtogcsruns" */ '@/views/data-workflows/gbq-to-gcs/GbqToGcsRuns.vue'),
		alias: '/runs/gbqtogcs'
	},

	/**
	 * Table to Storage
	 */
	{
		path: '/tabletostorage/confs',
		name: 'TableToStorageConfs',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationsView.vue'
			)
	},
	{
		path: '/tabletostorage/conf/:confId',
		name: 'TableToStorageConf',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageconfs" */ '@/views/data-workflows/table-to-storage/ConfigurationView.vue'
			)
	},
	{
		path: '/tabletostorage/runs',
		name: 'TableToStorageRuns',
		meta: {
			authRequired: true
		},
		component: () =>
			import(
				/* webpackChunkName: "tabletostorageruns" */ '@/views/data-workflows/table-to-storage/TableToStorageRuns.vue'
			)
	},

	// {
	// 	path: '/tabletostorage/runs/:pathId',
	// 	name: 'TableToStorageRun',
	// 	meta: {
	// 		authRequired: true
	// 	},
	// 	component: () => import(/* webpackChunkName: "tabletostoragerun" */ '@/views/TableToStorageRun.vue')
	// },

	/**
	 * VM launcher
	 */
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
	},

	/**
	 * Workflow
	 */
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
	},

	/**
	 * Data Model
	 */
	{
		path: '/datamodel/:projectId/:datasetId/:tableId',
		name: 'DataTableDetails',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "datatabledetails" */ '@/views/data-models/DataTableDetails.vue')
	}
];
