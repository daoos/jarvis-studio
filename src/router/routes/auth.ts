import { auth, guest } from '@/router/middleware';

import { LOGOUT, SIGN_IN } from '@/constants/router/routes-names';

export default [
	{
		path: '/sign-in',
		name: SIGN_IN,
		meta: {
			middleware: [guest]
		},
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/SignIn')
	},
	{
		path: '/logout',
		name: LOGOUT,
		meta: {
			middleware: [auth]
		},
		component: () => import(/* webpackChunkName: "auth/sign-in" */ '@/views/auth/Logout')
	}
];
