import { Context, Middleware, MiddlewarePipeline } from '@/types';
import { NO_ACCOUNT } from '@/constants/router/routes-names';

export const hasAccount: Middleware = ({ next, store }: Context, nextPipeline: ReturnType<MiddlewarePipeline>) => {
	if (store.getters['user/accounts'].length === 0) return next({ name: NO_ACCOUNT });
	return nextPipeline();
};
