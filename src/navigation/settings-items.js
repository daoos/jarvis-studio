import { PROFILE, USERS, ACCOUNTS, CLOUD_FUNCTIONS } from '@/constants/router/routes-names';
import { SUPER_ADMIN } from '@/constants/user/roles';
import store from '@/store';

export default [
	{
		title: 'Profile',
		icon: 'account_circle',
		link: { name: PROFILE }
	},
	{
		title: 'Users',
		icon: 'supervised_user_circle',
		link: { name: USERS },
		// TODO: Remove `store.getters.user` once Firebase & user are refactored
		displayRule: store.getters.user && store.getters.user.studioRoles === SUPER_ADMIN
	},
	{
		title: 'Accounts',
		icon: 'business',
		link: { name: ACCOUNTS }
	},
	{
		title: 'Cloud Function Configurations',
		icon: 'settings_ethernet',
		link: { name: CLOUD_FUNCTIONS }
	}
];
