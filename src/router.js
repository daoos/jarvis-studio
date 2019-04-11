import Vue from "vue";
import Router from "vue-router";
import paths from "./router/paths";
import store from "@/store/index";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: "history",
  linkActiveClass: "active",
  routes: paths
});

// router gards
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
            path: "/signin",
            query: { redirect: to.fullPath }
          });
        }
      }, 2000);
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
