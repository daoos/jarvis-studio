import { PROFILE, USERS, ACCOUNTS, CLOUD_FUNCTIONS } from '@/constants/router/routes-names';

export default [
	{
		title: 'Profile',
		icon: 'account_circle',
		link: {
			name: PROFILE
		}
	},
	{
		title: 'Users',
		icon: 'supervised_user_circle',
		link: {
			name: USERS
		}
	},
	{
		title: 'Accounts',
		icon: 'business',
		link: {
			name: ACCOUNTS
		}
	},
	{
		title: 'Cloud Function Configurations',
		icon: 'settings_ethernet',
		link: {
			name: CLOUD_FUNCTIONS
		}
	}
];
