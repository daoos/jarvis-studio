import store from '@/store';
import { PROFILE } from '@/constants/router/routes-names';

export default [
	{
		title: 'Profile',
		link: { name: PROFILE },
		icon: 'account_circle',
		click: () => {}
	},
	// TODO: Remove click actions & redirect to logout page
	{
		title: 'Logout',
		link: null,
		icon: 'exit_to_app',
		click: () => {
			store.dispatch('userSignOut');
		}
	}
];
