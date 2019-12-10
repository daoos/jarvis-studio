import { SETTINGS } from '@/constants/router/paths-prefixes';
import { PROFILE, USERS, ACCOUNTS, CLOUD_FUNCTIONS } from '@/constants/router/routes-names';

export default [
	{
		path: `/${SETTINGS}/profile`,
		name: PROFILE,
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/profile" */ '@/views/settings/Profile.vue')
	},
	{
		path: `/${SETTINGS}/users`,
		name: USERS,
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/users" */ '@/views/settings/Users.vue')
	},
	{
		path: `/${SETTINGS}/accounts`,
		name: ACCOUNTS,
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/accounts" */ '@/views/settings/Accounts.vue')
	},
	{
		path: `/${SETTINGS}/cloud-functions`,
		name: CLOUD_FUNCTIONS,
		meta: {
			authRequired: true,
			adminRequired: true
		},
		component: () => import(/* webpackChunkName: "settings/cloud-functions" */ '@/views/settings/CloudFunctions.vue')
	}
];
