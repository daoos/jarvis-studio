import { HOME } from '@/constants/router/routes-names';

export default function auth({ next, store }) {
	if (store.getters.isAuthenticated) {
		return next({ name: HOME });
	}

	return next();
}
