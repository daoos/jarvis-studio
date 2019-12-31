import { SUPER_ADMIN } from '@/constants/user/roles';
import { HOME } from '@/constants/router/routes-names';

export default function superAdmin({ next, store, nextPipeline }) {
	if (store.getters.user && store.getters.user.studioRoles === SUPER_ADMIN.roleCode) return nextPipeline();
	return next({ name: HOME });
}
