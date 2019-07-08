<template>
  <v-container grid-list-xl>
    <v-layout row wrap v-if="!isFetchAndAdding">
      <v-flex xs12 offset-xs0>
        <v-tabs
          v-model="activeTab"
          color="grey lighten-3"
          slider-color="primary"
        >
          <v-tab ripple href="#runconfiguration">
            Overview
          </v-tab>
          <v-tab ripple href="#fulljson">
            Full Json
          </v-tab>
          <v-tab ripple href="#conversation">
            Conversation
          </v-tab>
          <v-tab-item value="runconfiguration">
            <v-card>
              <StorageToStorageConfView
                :conf="conf"
                :isFetchAndAdding="isFetchAndAdding"
                :activeHeader="true"
              ></StorageToStorageConfView>
            </v-card>
          </v-tab-item>
          <v-tab-item value="fulljson">
            <v-card>
              <viewJson :json="conf" :jsonID="confId" />
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
    <v-layout v-else>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView";
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import store from "@/store/index";

export default {
  components: {
    StorageToStorageConfView,
    viewJson
  },
  data: () => ({
    conf: undefined,
    isFetchAndAdding: true,
    expand: false,
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    viewedItem: {},
    confToDeleteFromFirestore: {},
    dialogDeleteConf: false,
    showDetailConfToDelete: false,
    showSnackbarDeleteConfSuccess: false,
    activeTab: null
  }),
  async mounted() {
    await this.getConf();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getConf() {
      this.$data.isFetchAndAdding = true;
      //get the conf is not in mirrorExcGcsToGcsConfs
      if (this.mirrorExcGcsToGcsConfs[this.confId] == undefined) {
        await this.getFirestoreData();
        console.log();
      }
      this.conf = this.mirrorExcGcsToGcsConfs[this.confId];
      this.$data.isFetchAndAdding = false;
    },
    async getFirestoreData() {
      const confId = this.confId;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      try {
        await store.dispatch("mirrorExcGcsToGcsConfs/closeDBChannel", {
          clearModule: true
        });
        await store.dispatch("mirrorExcGcsToGcsConfs/fetchById", confId);
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
        this.$data.fetchAndAddStatus = "Error";
      }
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data
    }),
    confId() {
      return this.$route.params.confId;
    }
  }
};
</script>

<style></style>
