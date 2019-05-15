<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex xs12 v-if="this.isFetchAndAdding">
      </v-flex>
      <v-flex xs12 v-else>
        HELLO {{ this.conf.id }}
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from '@/util';


export default {
  components: {
    VueJsonPretty 
  },
  data: () => ({
    conf: undefined,
    search: "",
    isFetchAndAdding: true,
    expand: false,
    pagination: {
      sortBy: "id",
      descending: true,
      rowsPerPage: 10
    },
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    viewJson: false,
    viewedItem: {},
    confToDeleteFromFirestore: {},
    dialogDeleteConf: false,
    showDetailConfToDelete: false,
    showSnackbarDeleteConfSuccess: false,
  }),
  async mounted() {
    await this.getConf();
  },
  methods: {
    async getConf() {
      this.$data.isFetchAndAdding = true;
      //get the conf is not in mirrorExcGcsToGcsConfs 
      if (this.mirrorExcGcsToGcsConfs[this.confId] == undefined) {
        await this.getFirestoreData();
        console.log();
      }
      this.conf = this.mirrorExcGcsToGcsConfs[this.confId]
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
        console.log("getfirestore");
        //let fetchResult = await store.dispatch("mirrorExcGcsToGcsConfs/fetchAndAdd");
        //const where = [["id", "==", "mirror-fd-io-exc-tao-n-in"]];
        await store.dispatch("mirrorExcGcsToGcsConfs/fetchById",confId);
        console.log("mirrorExcGcsToGcsConfs",this.mirrorExcGcsToGcsConfs);
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
    confId () {
      return this.$route.params.confId ;
    }
  }
};

</script>

<style></style>
