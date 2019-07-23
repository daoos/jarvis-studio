<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-if="!isFetchAndAdding">
      <v-flex xs12 offset-xs0>
        <v-tabs
          v-model="activeTab"
          color="grey lighten-3"
          slider-color="primary"
        >
          <v-tab ripple href="#confoverview">
            Overview
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
          <v-tab-item value="confoverview">
            <v-card v-if="this.conf !== undefined">
              <tablesToTablesConfOverview
                :conf="this.conf"
                :confId="this.conf.table_name"
                :activeHeader="true"
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
              <viewJson :json="this.conf" :jsonID="this.conf.id" />
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
import Util from "@/util";
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import tablesToTablesConfOverview from "@/components/widgets/configurations/TablesToTablesConfOverview.vue";
import tablesToTalesConfTasksView from "@/components/widgets/configurations/TablesToTalesConfTasksView.vue";

export default {
  components: {
    viewJson,
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
      await store.dispatch("singleDoc/closeDBChannel", { clearModule: true });
      await store
        .dispatch("singleDoc/openDBChannel", {
          singleDocPath: this.firestorePath
        })
        .catch(console.error);
    }
  },
  computed: {
    ...mapState({
      singleDoc: state => state.singleDoc.data
    }),
    itemId() {
      var itemId = this.$route.params.pathId;
      return itemId;
    },
    firestorePath() {
      return Util.tablesToTablesConfFirestorePath(this.itemId);
    },
    conf() {
      //Add the bucket file source to the SingleDoc object
      var conf = this.singleDoc;
      return conf;
    }
  }
};
</script>

<style lang="scss" scoped></style>
