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
          <v-tab ripple href="#confschema">
            Schema
          </v-tab>
          <v-tab ripple href="#fulljson">
            Full Json
          </v-tab>
          <v-tab ripple href="#conversation">
            Conversation
          </v-tab>
          <v-tab-item value="rundetails">
            <v-card v-if="this.conf !== undefined">
              <StorageToTableRunView
                :run="this.run"
                :runId="this.run.job_id"
                :activeHeader="true"
              ></StorageToTableRunView
            ></v-card>
          </v-tab-item>
          <v-tab-item value="confoverview">
            <v-card v-if="this.conf !== undefined">
              <storageToTableConfOverview
                :conf="this.conf"
                :confId="this.conf.table_name"
                :activeHeader="false"
              ></storageToTableConfOverview
            ></v-card>
          </v-tab-item>
          <v-tab-item value="confschema">
            <v-card v-if="this.conf !== undefined">
              <tableSchemaView :schemaRows="this.conf.schema" />
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
import Util from "@/util";
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import StorageToTableRunView from "@/components/widgets/runs/StorageToTableRunView.vue";
import storageToTableConfOverview from "@/components/widgets/configurations/StorageToTableConfOverview.vue";
import tableSchemaView from "@/components/widgets/configurations/TableSchemaView.vue";

export default {
  components: {
    viewJson,
    storageToTableConfOverview,
    tableSchemaView,
    StorageToTableRunView
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
      return Util.storageToTableRunFirestorePath(this.itemId);
    },
    conf() {
      //Add the bucket file source to the SingleDoc object
      var conf = this.singleDoc.configuration_context;
      conf.source_bucket = this.singleDoc.source_bucket;
      conf.id = this.singleDoc.filename_template;
      return conf;
    },
    run() {
      var run = this.singleDoc;
      return run;
    }
  }
};
</script>

<style lang="scss" scoped></style>
