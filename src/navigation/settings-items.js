import { PROFILE, USERS, ACCOUNTS, CLOUD_FUNCTIONS } from '@/constants/router/routes-names';
import { SUPER_ADMIN } from '@/constants/user/roles';
import store from '@/store';

const isSuperAdminRule = () => store.getters.user.studioRoles === SUPER_ADMIN.roleCode;

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
		displayRule: isSuperAdminRule
	},
	{
		title: 'Accounts',
		icon: 'business',
		link: { name: ACCOUNTS }
	},
	{
		title: 'Cloud Function Configurations',
		icon: 'settings_ethernet',
		link: { name: CLOUD_FUNCTIONS },
		displayRule: isSuperAdminRule
	}
];
