export default [
	{
		path: '/settings/profile',
		name: 'userProfile',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/profile" */ '@/views/settings/Profile.vue')
	},
	{
		path: '/settings/users',
		name: 'users',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/users" */ '@/views/settings/Users.vue')
	},
	{
		path: '/settings/accounts',
		name: 'accounts',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/accounts" */ '@/views/settings/Accounts.vue')
	},
	{
		path: '/settings/cloud-functions',
		name: 'gcpcloudfunctions',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/cloud-functions" */ '@/views/settings/CloudFunctions.vue')
	}
];
