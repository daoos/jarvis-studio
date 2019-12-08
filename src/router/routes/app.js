import { NOT_FOUND, HOME } from '@/constants/router/routes-names';

export default [
	{
		path: '*',
		name: NOT_FOUND,
		meta: { authRequired: true },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/NotFound.vue')
	},
	{
		path: '/',
		name: HOME,
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/Home.vue')
	}
];
