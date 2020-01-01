import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { SIGN_IN } from '@/constants/router/routes-names';

export const auth: Middleware = ({ next, store }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
	if (!store.getters.isAuthenticated) return next({ name: SIGN_IN });
	return nextPipeline();
};
