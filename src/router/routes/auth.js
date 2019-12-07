export default [
	{
		path: '/sign-in',
		name: 'SignIn',
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "signinEmail" */ '@/views/auth/SignIn.vue')
	}
];
