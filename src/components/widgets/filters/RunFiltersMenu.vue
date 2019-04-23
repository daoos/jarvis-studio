<template>
    <v-layout row wrap >
      <v-flex xs12 offset-xs0>
        <v-toolbar flat>
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>{{dateFilterSelected.dateLabel}}</v-btn>
            <v-btn flat>Env.</v-btn>
            <v-select
                @change="applyDateFilter"
                :items="dateFilters"
                item-text="dateLabel"
                item-value="nbDays"
                :label="dateFilterSelected.dateLabel"
                persistent-hint
                return-object
                single-line
              >
            </v-select>
          </v-toolbar-items>
        </v-toolbar>
      </v-flex>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";

export default {
    components: {
    },
    data: () => ({
    }),
    created() {
    },
   methods: {
      applyDateFilter (dateFilterSelected) {
        store.dispatch("applyDateFilterSelected", dateFilterSelected);
      }
   },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters
    })
  }
};
</script>