export default [
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
	}
];
