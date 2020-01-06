import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { HOME } from '@/constants/router/routes-names';

export const guest: Middleware = ({ next, store }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
	if (store.getters['user/isAuthenticated']) return next({ name: HOME });
	return nextPipeline();
};
