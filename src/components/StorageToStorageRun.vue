<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-if="!isFetchAndAdding">
      <v-layout row wrap>
        <v-flex xs12 offset-xs0>
          <v-card>
            <v-card-title> </v-card-title>
            <v-card-text> </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 offset-xs0>
          <v-tabs
            v-model="activeTab"
            color="grey lighten-3"
            slider-color="primary"
          >
            <v-tab ripple href="#runconfiguration">
              Configuration
            </v-tab>
            <v-tab ripple href="#fulljson">
              Full Json
            </v-tab>
            <v-tab ripple href="#conversation">
              Conversation
            </v-tab>
            <v-tab-item value="runconfiguration">
              <v-card v-if="run !== undefined">
                <StorageToStorageConfView
                  :conf="run.configuration_context"
                  :isFetchAndAdding="isFetchAndAdding"
                  :activeHeader="false"
                ></StorageToStorageConfView>
              </v-card>
            </v-tab-item>
            <v-tab-item value="fulljson">
              <v-card>
                <viewJson :json="run" :jsonID="runId" />
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-flex>
      </v-layout>
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
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView";
import store from "@/store/index";
import viewJson from "@/components/widgets/parameters/viewJson.vue";

export default {
  components: {
    StorageToStorageConfView,
    viewJson
  },
  data: () => ({
    run: undefined,
    isFetchAndAdding: true,
    expand: false,
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    activeTab: null
  }),
  async mounted() {
    await this.getRun();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getRun() {
      this.$data.isFetchAndAdding = true;
      //get the conf is not in mirrorExcGcsToGcsRuns
      if (this.mirrorExcGcsToGcsRuns[this.confId] == undefined) {
        await this.getFirestoreData();
        console.log();
      }
      this.run = this.mirrorExcGcsToGcsRuns[this.runId];
      this.$data.isFetchAndAdding = false;
    },
    async getFirestoreData() {
      const runId = this.runId;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      try {
        await store.dispatch("mirrorExcGcsToGcsRuns/closeDBChannel", {
          clearModule: true
        });
        await store.dispatch("mirrorExcGcsToGcsRuns/fetchById", runId);
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
        console.log("Firestore Error catched");
        console.log(e);
        this.$data.fetchAndAddStatus = "Error";
      }
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      mirrorExcGcsToGcsRuns: state => state.mirrorExcGcsToGcsRuns.data
    }),
    runId() {
      return this.$route.params.runId;
    }
  }
};
</script>

<style></style>
