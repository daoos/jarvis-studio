import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { SUPER_ADMIN } from '@/constants/user/roles';
import { HOME } from '@/constants/router/routes-names';

export const superAdmin: Middleware = ({ next, store }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
	if (store.getters.user && store.getters.user.studioRoles === SUPER_ADMIN.roleCode) return nextPipeline();
	return next({ name: HOME });
};
