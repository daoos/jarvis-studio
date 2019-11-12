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
          <v-tab ripple href="#fulljson">
            Full Json
          </v-tab>
          <v-tab ripple href="#conversation">
            Conversation
          </v-tab>
          <v-tab-item value="confoverview">
            <v-card>
              <StorageToStorageConfView
                :conf="conf"
                :configurationId="conf.id"
                :isFetchAndAdding="isFetchAndAdding"
                :activeHeader="true"
              ></StorageToStorageConfView>
            </v-card>
          </v-tab-item>
          <v-tab-item value="fulljson">
            <v-card>
              <viewJson :json="conf" :jsonID="itemId" />
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
    isFetchAndAdding: true,
    activeTab: null
  }),
  async mounted() {
    this.isFetchAndAdding = true;
    await this.getFirestoreData();
    this.isFetchAndAdding = false;
  },
  methods: {
    async getFirestoreData() {
      await store.dispatch("storageToStorageConf/closeDBChannel", {
        clearModule: true
      });
      await store
        .dispatch("storageToStorageConf/fetchAndAdd", {
          itemId: this.itemId
        })
        .catch(console.error);
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      storageToStorageConf: state => state.storageToStorageConf.data
    }),
    itemId() {
      const itemId = this.$route.params.pathId;
      console.log(itemId);
      return itemId;
    },
    conf() {
      var conf = this.storageToStorageConf;
      return conf;
    }
  }
};
</script>

<style></style>
