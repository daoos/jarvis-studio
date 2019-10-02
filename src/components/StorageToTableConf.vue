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
          <v-tab ripple href="#confschema">
            Schema
          </v-tab>
          <v-tab ripple href="#fulljson">
            Full Json
          </v-tab>
          <v-tab ripple href="#conversation">
            Conversation
          </v-tab>
          <v-tab-item value="confoverview">
            <v-card v-if="this.conf !== undefined">
              <storageToTableConfOverview
                :conf="this.conf"
                :confId="this.conf.table_name"
                :activeHeader="true"
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
import viewJson from "@/components/widgets/parameters/viewJson.vue";
import storageToTableConfOverview from "@/components/widgets/configurations/StorageToTableConfOverview.vue";
import tableSchemaView from "@/components/widgets/configurations/TableSchemaView.vue";

export default {
  components: {
    viewJson,
    storageToTableConfOverview,
    tableSchemaView
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
      await store.dispatch("storageToTableConf/closeDBChannel", {
        clearModule: true
      });
      await store
        .dispatch("storageToTableConf/fetchAndAdd", {
          sourceId: this.bucketIn,
          itemId: this.itemId
        })
        .catch(console.error);
    }
  },
  computed: {
    ...mapState({
      storageToTableConf: state => state.storageToTableConf.data
    }),
    itemId() {
      var itemId = this.$route.params.pathId.split("/")[1];
      console.log("itemId : ", itemId);
      return itemId;
    },
    bucketIn() {
      var bucketIn = this.$route.params.pathId.split("/")[0];
      console.log("bucketIn : ", bucketIn);
      return bucketIn;
    },
    conf() {
      //Add the bucket file source to the SingleDoc object
      var conf = this.storageToTableConf;
      conf.source_bucket = this.bucketIn;
      return conf;
    }
  }
};
</script>

<style lang="scss" scoped></style>
