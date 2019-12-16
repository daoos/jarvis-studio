import { HOME } from '@/constants/router/routes-names';

export default function guest({ next, store, nextPipeline }) {
	if (store.getters.isAuthenticated) return next({ name: HOME });
	return nextPipeline();
}
