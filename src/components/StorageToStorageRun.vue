<template>
  <div v-if="run !== undefined">
  <StorageToStorageConfView :conf="run.configuration_context" :isFetchAndAdding="isFetchAndAdding"></StorageToStorageConfView>
  </div>     
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import StorageToStorageConfView from "./widgets/configurations/StorageToStorageConfView"
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from '@/util';


export default {
  components: {
    VueJsonPretty,
    StorageToStorageConfView
  },
  data: () => ({
    run: undefined,
    isFetchAndAdding: true,
    expand: false,
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    viewJson: false
  }),
  async mounted() {
    await this.getRun();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async getRun() {
      this.$data.isFetchAndAdding = true;
      //get the conf is not in mirrorExcGcsToGcsRuns
      if (this.mirrorExcGcsToGcsRuns[this.confId] == undefined) {
        await this.getFirestoreData();
        console.log();
      }
      this.run = this.mirrorExcGcsToGcsRuns[this.runId]
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
        await store.dispatch("mirrorExcGcsToGcsRuns/fetchById",runId);
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
    runId () {
      return this.$route.params.runId ;
    }
  }
};

</script>

<style></style>
