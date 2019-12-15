import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';

import middlewarePipeline from './middleware/pipeline';

Vue.use(Router);

const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	linkActiveClass: 'active',
	routes: routes
});

router.beforeEach((to, from, next) => {
	if (!to.meta.middleware) return next();

	const middleware = to.meta.middleware;
	const context = { to, from, next, store };

	return middleware[0]({
		...context,
		next: middlewarePipeline(context, middleware, 1)
	});
});

export default router;
