<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <h1>GCS to GBQ Configurations:</h1>
      <v-flex xs12 offset-xs0>
        <v-card dark>
          <v-card-text>
            <vue-json-pretty
              :data="moduleJson"
              :deep="1"
              :show-double-quotes="true"
              :show-length="true"
              :show-line="false"
            >
            </vue-json-pretty>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";

export default {
  components: {
    VueJsonPretty
  },
  data: () => ({}),
  mounted() {
    this.getFirestoreData();
  },
  methods: {
    async getFirestoreData() {
      const where = this.whereConfFilter;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("mirrorExcGcsToGbqConf/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "mirrorExcGcsToGbqConf/fetchAndAdd",
          { where, limit: 0 }
        );
        if (fetchResult.done === true) {
          this.$data.moreToFetchAndAdd = false;
        } else {
          this.$data.moreToFetchAndAdd = true;
        }
        this.$data.fetchAndAddStatus = "Success";

        //Loop to the document at the 1st level to get the detail configuration in the CONFIGURATION collection of each document
        let mirrorExcGcsToGbqConfDetails = [];
        //Transform the mirrorExcGcsToGbqConf in Array to loop on
        const mirrorExcGcsToGbqConfArray = Object.values(this.mirrorExcGcsToGbqConf);
        //Loop on mirrorExcGcsToGbqConfArray to get the collection
        for (var confDetailsId in mirrorExcGcsToGbqConfArray) {
          try {
            store.dispatch("mirrorExcGcsToGbqConfDetails/closeDBChannel", {
              clearModule: true
            });
            let fetchResult = await store.dispatch(
              "mirrorExcGcsToGbqConfDetails/fetchAndAdd",
              { bucketId: mirrorExcGcsToGbqConfArray[confDetailsId].id, limit: 0 }
            );
            mirrorExcGcsToGbqConfDetails.push(fetchResult);
            } catch (e) {
              console.log("Firestore Error catched");
              console.log(e);
              this.$data.fetchAndAddStatus = "Error";
              this.$data.isFetchAndAdding = false;
            }
        };
        console.log(mirrorExcGcsToGbqConfDetails);
      } catch (e) {
        console.log("Firestore Error catched");
        console.log(e);
        this.$data.fetchAndAddStatus = "Error";
        this.$data.isFetchAndAdding = false;
      }
      this.$data.isFetchAndAdding = false;
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      mirrorExcGcsToGbqConf: state => state.mirrorExcGcsToGbqConf.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    moduleJson() {
      return store.state.mirrorExcGcsToGbqConf.data;
    }
  },
  watch: {
    whereConfFilter(newValue, oldValue) {
      this.getFirestoreData();
    }
  }
};
</script>

<style></style>
