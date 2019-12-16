import { NO_ACCOUNT } from '@/constants/router/routes-names';

export default function hasAccount({ next, store, nextPipeline }) {
	if (store.getters.getUserAccounts.length === 0) return next({ name: NO_ACCOUNT });
	return nextPipeline();
}
