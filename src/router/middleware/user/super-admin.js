import { SUPER_ADMIN } from '@/constants/user/roles';
import { HOME } from '@/constants/router/routes-names';

export default function auth({ next, store }) {
	if (store.getters.user.studioRoles === SUPER_ADMIN.roleCode) {
		return next();
	} else {
		return next({ name: HOME });
	}
}
