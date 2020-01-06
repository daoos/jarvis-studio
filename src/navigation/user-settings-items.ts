import { LOGOUT, PROFILE } from '@/constants/router/routes-names';

export default [
	{
		title: 'Profile',
		link: { name: PROFILE },
		icon: 'account_circle'
	},
	{
		title: 'Logout',
		link: { name: LOGOUT },
		icon: 'exit_to_app'
	}
];
