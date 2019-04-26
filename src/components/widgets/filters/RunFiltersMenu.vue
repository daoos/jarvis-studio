<template>
    <v-layout row wrap>
      <v-flex>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Filters</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
          <v-flex xs12>
            <v-select
                @change="applyAccountFilter"
                :items="accountArray"
                item-text="account_name"
                item-value="id"
                :label="accountFilterSelected.account_name"
                return-object
                single-line
                prepend-icon="business"
              >
            </v-select>
            </v-flex>
          <v-flex xs12>
            <v-select
                @change="applyDateFilter"
                :items="dateFilters"
                item-text="dateLabel"
                item-value="nbDays"
                :label="dateFilterSelected.dateLabel"
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
    }),
    created() {
    },
   methods: {
      applyDateFilter (dateFilterSelected) {
        store.dispatch("applyDateFilterSelected", dateFilterSelected);
      },
      applyAccountFilter (accountFilterSelected) {
        store.dispatch("applyAccountFilterSelected", accountFilterSelected);
      }
   },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      accountFilterSelected: state => state.filters.accountFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      accounts: state => state.accounts.data
    }),
    accountArray() {
      let accountArray = Object.values(this.accounts);
      accountArray.push({account_name: "All", id: "000000"})
      return accountArray;
    }
  }
};
</script>