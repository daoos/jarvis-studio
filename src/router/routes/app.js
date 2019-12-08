export default [
	{
		path: '*',
		name: 'not-found',
		meta: { authRequired: true },
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/NotFound.vue')
	},
	{
		path: '/',
		name: 'home',
		meta: {
			authRequired: true
		},
		component: () => import(/* webpackChunkName: "app/home" */ '@/views/app/Home.vue')
	}
];
