export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/Home.vue")
  },
  {
    path: "/signin",
    name: "signin",
    meta: {
      public: true
    },
    component: () =>
      import(/* webpackChunkName: "signin" */ "@/views/Signin.vue")
  },
  {
    path: "/about",
    name: "about",
    meta: {
      authRequired: true
    },
    component: () => import(/* webpackChunkName: "about" */ "@/views/About.vue")
  }
];
