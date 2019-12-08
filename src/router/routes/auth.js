import { SIGN_IN } from '@/constants/router/routes-names';

export default [
	{
		path: '/sign-in',
		name: SIGN_IN,
		meta: {
			public: true
		},
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/SignIn.vue')
	}
];
