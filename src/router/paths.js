export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconfs" */ "@/views/MirrorExcGcsToGcsConfs.vue")
  },
  {
    path: "/home",
    name: "homevue",
    meta: {
      authRequired: true
    },
    component: () => import(/* webpackChunkName: "home" */ "@/views/Home.vue")
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
    path: "/accounts",
    name: "accounts",
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "accounts" */ "@/views/Accounts.vue"),
    alias: "/settings/accounts"
  },
  {
    path: "/gcpcloudfunctions",
    name: "gcpcloudfunctions",
    meta: {
      authRequired: true,
      adminRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcpcloudfunctions" */ "@/views/GcpCloudFunctions.vue"),
    alias: "/settings/gcpcloudfunctions"
  },
  {
    path: "/mirrorexcgcstogcsconfs",
    name: "mirrorExcGcsToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogcsconfs" */ "@/views/MirrorExcGcsToGcsConfs.vue"),
    alias: "/conf/gcstogcs"
  },
  {
    path: "/mirrorexcgcstogcsruns",
    name: "mirrorExcGcsToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogcsruns" */ "@/views/MirrorExcGcsToGcsRuns.vue"),
    alias: "/runs/gcstogcs"
  },
  {
    path: "/mirrorexcgcstogbqconfs",
    name: "mirrorExcGcsToGbqConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconfs" */ "@/views/MirrorExcGcsToGbqConfs.vue"),
    alias: "/conf/gcstogbq"
  },
  {
    path: "/mirrorexcgcstogbqruns",
    name: "mirrorExcGcsToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqruns" */ "@/views/MirrorExcGcsToGbqRuns.vue"),
    alias: "/runs/gcstogbq"
  },
  {
    path: "/viewgbqtogbqconfs",
    name: "viewGbqToGbqConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogbqconfs" */ "@/views/ViewGbqToGbqConfs.vue"),
    alias: "/conf/gbqtogbq"
  },
  {
    path: "/viewgbqtogbqruns",
    name: "viewGbqToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogbqruns" */ "@/views/ViewGbqToGbqRuns.vue"),
    alias: "/runs/gbqtogbq"
  },
  {
    path: "/viewgbqtogcsconfs",
    name: "viewGbqToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogcsconfs" */ "@/views/ViewGbqToGcsConfs.vue"),
    alias: "/conf/gbqtogcs"
  },
  {
    path: "/viewgbqtogcsruns",
    name: "viewGbqToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogcsruns" */ "@/views/ViewGbqToGcsRuns.vue"),
    alias: "/runs/gbqtogcs"
  },
  {
    path: "/vmlauncherruns",
    name: "vmLauncherRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherruns" */ "@/views/VmLauncherRuns.vue"),
    alias: "/runs/vmlauncher"
  },
  {
    path: "/vmlauncherconfs",
    name: "vmLauncherConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherconfs" */ "@/views/VmLauncherConfs.vue"),
    alias: "/conf/vmlauncher"
  }
];
