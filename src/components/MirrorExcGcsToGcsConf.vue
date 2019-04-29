<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <h1>GCS to GCS Configurations:</h1>
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
        store.dispatch("mirrorExcGcsToGcsConf/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "mirrorExcGcsToGcsConf/fetchAndAdd",
          { where, limit: 0 }
        );
        if (fetchResult.done === true) {
          this.$data.moreToFetchAndAdd = false;
        } else {
          this.$data.moreToFetchAndAdd = true;
        }
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
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
      mirrorExcGcsToGcsConf: state => state.mirrorExcGcsToGcsConf.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    moduleJson() {
      return store.state.mirrorExcGcsToGcsConf.data;
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
