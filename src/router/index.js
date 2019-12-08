import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';
import store from '@/store';

Vue.use(Router);

const router = new Router({
	base: process.env.BASE_URL,
	mode: 'history',
	linkActiveClass: 'active',
	routes: routes
});

// index gards
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.authRequired)) {
		// this route requires auth, check if logged in
		// if not, redirect to login page.
		if (store.getters.isAuthenticated) {
			next();
		} else {
			//waiting from auto login to check if a user was logged in the session
			setTimeout(function() {
				if (store.getters.isAuthenticated) {
					next();
				} else {
					next({
						name: 'SignIn',
						query: { redirect: to.fullPath }
					});
				}
			}, 1000);
		}
	} else {
		next(); // make sure to always call next()!
	}
});

// Stop the loading picto
router.afterEach(() => {
	//NProgress.done();
});

export default router;
