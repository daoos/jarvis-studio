import { SIGN_IN } from '@/constants/router/routes-names';

export default function auth({ next, store, nextPipeline }) {
	if (!store.getters.isAuthenticated) return next({ name: SIGN_IN });
	return nextPipeline();
}
