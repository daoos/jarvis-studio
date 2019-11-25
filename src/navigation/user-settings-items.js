import router from '@/router';
import store from '@/store';

export default [
	{
		title: 'Profile',
		href: '#',
		icon: 'account_circle',
		click: () => {
			router.push({ name: 'userProfile' });
		}
	},
	{
		title: 'Logout',
		href: '#',
		icon: 'exit_to_app',
		click: () => {
			store.dispatch('userSignOut');
		}
	}
];
