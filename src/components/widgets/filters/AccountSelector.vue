<template>
    <v-layout v-if="viewAccount">
        <v-menu :nudge-width="100" :class="true ? 'hidden-xs-only' : ''">
            <v-toolbar-title slot="activator" class="pl-2">
                <span class="body-2 contrast--text" >{{ accountFilterSelected.account_name }}</span>   
                <v-icon class="contrast--text">arrow_drop_down</v-icon>
            </v-toolbar-title>
            <v-list light>
                <v-list-tile v-for="account in accountArray" :key="account.id" @click="applyAccountFilter(account)">
                    <v-list-tile-title v-text="account.account_name"></v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
    </v-layout>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store/index";

export default {
  components: {},
  props: {
    viewAccount: Boolean
  },
  data: () => ({}),
  created() {},
  methods: {
    applyAccountFilter(accountFilterSelected) {
      store.dispatch("applyAccountFilterSelected", accountFilterSelected);
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      accountFilterSelected: state => state.filters.accountFilterSelected,
      accounts: state => state.accounts.data
    }),
    accountArray() {
      let accountArray = Object.values(this.accounts);
      accountArray.push({ account_name: "All Accounts", id: "000000" });
      return accountArray;
    }
  }
};
</script>
