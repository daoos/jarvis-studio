<template>
  <StorageToStorageConfView
    :conf="conf"
    :isFetchAndAdding="isFetchAndAdding"
  ></StorageToStorageConfView>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from "@/util";

export default {
  components: {
    VueJsonPretty,
    StorageToStorageConfView
  },
  data: () => ({
    conf: undefined,
    isFetchAndAdding: true,
    expand: false,
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    viewJson: false,
    viewedItem: {},
    confToDeleteFromFirestore: {},
    dialogDeleteConf: false,
    showDetailConfToDelete: false,
    showSnackbarDeleteConfSuccess: false
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
