<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-if="!isFetchAndAdding">
      <v-flex xs12 offset-xs0>
        <v-tabs
          v-model="activeTab"
          color="grey lighten-3"
          slider-color="primary"
        >
          <v-tab ripple href="#rundetails">
            Run Details
          </v-tab>
          <v-tab ripple href="#confoverview">
            Configuration
          </v-tab>
          <v-tab ripple href="#conftasks">
            Tasks
          </v-tab>
          <v-tab ripple href="#fulljson">
            Full Json
          </v-tab>
          <v-tab ripple href="#conversation">
            Conversation
          </v-tab>
          <v-tab-item value="rundetails">
            <v-card v-if="this.run !== undefined">
              <TablesToTablesRunView
                :run="this.run"
                :runId="this.run.dag_id"
                :activeHeader="true"
              ></TablesToTablesRunView
            ></v-card>
          </v-tab-item>
          <v-tab-item value="confoverview">
            <v-card v-if="this.conf !== undefined">
              <tablesToTablesConfOverview
                :conf="this.conf"
                :confId="this.conf.configuration.dag_name"
                :activeHeader="false"
              ></tablesToTablesConfOverview
            ></v-card>
          </v-tab-item>
          <v-tab-item value="conftasks">
            <v-card v-if="this.conf !== undefined">
              <tablesToTalesConfTasksView
                :tasksConf="this.conf.configuration.workflow"
                :tasksSQL="this.conf.sql"
                :dagConf="this.conf.configuration"
              />
            </v-card>
          </v-tab-item>
          <v-tab-item value="fulljson">
            <v-card>
              <viewJson :json="this.run" :jsonID="this.run.id" />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <template>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
      </template>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import TablesToTablesRunView from "@/components/widgets/runs/TablesToTablesRunView.vue";
import tablesToTablesConfOverview from "@/components/widgets/configurations/TablesToTablesConfOverview.vue";
import tablesToTalesConfTasksView from "@/components/widgets/configurations/TablesToTalesConfTasksView.vue";

export default {
  components: {
    viewJson,
    TablesToTablesRunView,
    tablesToTablesConfOverview,
    tablesToTalesConfTasksView
  },
  data() {
    return {
      isFetchAndAdding: true,
      activeTab: null
    };
  },
  async mounted() {
    await this.getFirestoreData();
    this.isFetchAndAdding = false;
  },
  methods: {
    async getFirestoreData() {
      await store.dispatch("tablesToTablesRun/closeDBChannel", {
        clearModule: true
      });
      await store
        .dispatch("tablesToTablesRun/fetchAndAdd", {
          itemId: this.itemId
        })
        .catch(console.error);
    }
  },
  computed: {
    ...mapState({
      tablesToTablesRun: state => state.tablesToTablesRun.data
    }),
    itemId() {
      var itemId = this.$route.params.pathId;
      return itemId;
    },
    conf() {
      //Add the bucket file source to the SingleDoc object
      var conf = this.tablesToTablesRun.configuration_context;
      console.log("conf ", conf);
      return conf;
    },
    run() {
      var run = this.tablesToTablesRun;
      console.log("run ", run);
      return run;
    }
  }
};
</script>

<style lang="scss" scoped></style>
