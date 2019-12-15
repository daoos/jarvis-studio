import auth from '@/router/middleware/auth';

import { NOT_FOUND, HOME } from '@/constants/router/routes-names';

export default [
	{
		path: '*',
		name: NOT_FOUND,
		meta: { middleware: [auth] },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/NotFound.vue')
	},
	{
		path: '/',
		name: HOME,
		meta: {
			middleware: [auth]
		},
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/Home.vue')
	}
];
