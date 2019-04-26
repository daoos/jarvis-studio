<template>
    <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            <v-btn flat>{{dateFilterSelected.dateLabel}}</v-btn>
            <v-flex xs12>
            <v-select
            v-model="value"
            :items="items"
            prepend-icon="dns"
            multiple
            deletable-chips
          ></v-select>
          </v-flex>
          <v-flex xs12>
            <v-select
                @change="applyDateFilter"
                :items="dateFilters"
                item-text="dateLabel"
                item-value="nbDays"
                :label="dateFilterSelected.dateLabel"
                persistent-hint
                return-object
                single-line
                prepend-icon="date_range"
              >
            </v-select>
            </v-flex>
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
      items: ['foo', 'bar', 'fizz', 'buzz'],
      value: ['foo', 'bar', 'fizz', 'buzz']
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