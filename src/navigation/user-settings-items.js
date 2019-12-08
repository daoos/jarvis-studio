import index from '@/router';
import store from '@/store';

export default [
	{
		title: 'Profile',
		href: '#',
		icon: 'account_circle',
		click: () => {
			index.push({ name: 'userProfile' });
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
