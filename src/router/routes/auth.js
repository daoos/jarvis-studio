export default [
	{
		path: '/sign-in',
		name: 'SignIn',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/SignIn.vue')
	}
];
