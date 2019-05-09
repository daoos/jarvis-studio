export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconf" */ "@/views/MirrorExcGcsToGcsConf.vue")
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
    path: "/mirrorexcgcstogcsconf",
    name: "mirrorExcGcsToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogcsconf" */ "@/views/MirrorExcGcsToGcsConf.vue"),
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
    path: "/mirrorexcgcstogbqconf",
    name: "mirrorExcGcsToGbqConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "mirrorexcgcstogbqconf" */ "@/views/MirrorExcGcsToGbqConf.vue"),
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
    path: "/viewgbqtogbqconf",
    name: "viewGbqToGbqConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogbqconf" */ "@/views/ViewGbqToGbqConf.vue"),
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
    path: "/viewgbqtogcsconf",
    name: "viewGbqToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "viewgbqtogcsconf" */ "@/views/ViewGbqToGcsConf.vue"),
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
    path: "/vmlauncherconf",
    name: "vmLauncherConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "vmlauncherconf" */ "@/views/VmLauncherConf.vue"),
    alias: "/conf/vmlauncher"
  }
];
