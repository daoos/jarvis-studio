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
  created() {
    //load the content of the module
    store.dispatch("mirrorExcGcsToGcsConf/fetchAndAdd").catch(console.error);
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      mirrorExcGcsToGbqRuns: state => state.mirrorExcGcsToGbqRuns.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    moduleJson() {
      return store.state.mirrorExcGcsToGcsConf.data;
    }
  }
};
</script>

<style></style>
