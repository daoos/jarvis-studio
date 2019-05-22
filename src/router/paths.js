export default [
  {
    path: "/",
    name: "home",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqconfs" */ "@/views/GcsToGcsConfs.vue")
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
    path: "/gcstogcsconfs",
    name: "GcsToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsconfs" */ "@/views/GcsToGcsConfs.vue"),
    alias: "/conf/gcstogcs"
  },
  {
    path: "/gcstogcsruns",
    name: "GcsToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsruns" */ "@/views/GcsToGcsRuns.vue"),
    alias: "/runs/gcstogcs"
  },
  {
    path: "/conf/gcstogcs/:confId",
    name: "GcsToGcsConf",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogcsconf" */ "@/views/GcsToGcsConf.vue")
  },
  {
    path: "gcstogbqconfs",
    name: "GcsToGbqConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqconfs" */ "@/views/GcsToGbqConfs.vue"),
    alias: "/conf/gcstogbq"
  },
  {
    path: "/gcstogbqruns",
    name: "GcsToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gcstogbqruns" */ "@/views/GcsToGbqRuns.vue"),
    alias: "/runs/gcstogbq"
  },
  {
    path: "/gbqtogbqconfs",
    name: "GbqToGbqConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogbqconfs" */ "@/views/GbqToGbqConfs.vue"),
    alias: "/conf/gbqtogbq"
  },
  {
    path: "/gbqtogbqruns",
    name: "GbqToGbqRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogbqruns" */ "@/views/GbqToGbqRuns.vue"),
    alias: "/runs/gbqtogbq"
  },
  {
    path: "/gbqtogcsconfs",
    name: "gbqToGcsConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogcsconfs" */ "@/views/GbqToGcsConfs.vue"),
    alias: "/conf/gbqtogcs"
  },
  {
    path: "/gbqtogcsruns",
    name: "gbqToGcsRuns",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "gbqtogcsruns" */ "@/views/GbqToGcsRuns.vue"),
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
  },
  {
    path: "/conf/workflow",
    name: "WorkflowConfs",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "workflowconfs" */ "@/views/WorkflowConfs.vue")
  },
  {
    path: "/status/workflow",
    name: "WorkflowStatus",
    meta: {
      authRequired: true
    },
    component: () =>
      import(/* webpackChunkName: "workflowstatus" */ "@/views/WorkflowStatus.vue")
  }
];
