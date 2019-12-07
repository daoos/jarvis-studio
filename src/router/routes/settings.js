export default [
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
		path: '/settings/accounts',
		name: 'accounts',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "accounts" */ '@/views/settings/Accounts.vue'),
		alias: '/settings/accounts'
	},
	{
		path: '/settings/gcpcloudfunctions',
		name: 'gcpcloudfunctions',
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "gcpcloudfunctions" */ '@/views/settings/CloudFunctions.vue'),
		alias: '/settings/gcpcloudfunctions'
	}
];
