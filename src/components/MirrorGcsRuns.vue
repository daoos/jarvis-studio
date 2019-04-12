<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <div>
        <h1>Mirror GCS Runs: {{ mirrorIdSelected }}</h1>
      </div>
      <v-spacer></v-spacer>
      <v-menu offset-y right:true>
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            dark
            v-on="on"
          >
            Select an account
          </v-btn>
        </template>
        <v-list>
          <v-list-tile
            v-for="(mirrorItem, index) in mirrorIds"
            :key="index"
            @click="setAccount(mirrorItem.account)"
          >
            <v-list-tile-title>{{ mirrorItem.account }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-flex xs12 offset-xs0>
        <v-card dark>
          <v-card-text >
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
import VueJsonPretty from 'vue-json-pretty';
import store from "@/store/index";

export default {
  components: {
    VueJsonPretty
  },
  data: () => ({
    mirrorIds: [
        { account: "mirror-fd-io-exc-jules-n-in" },
        { account: "mirror-fd-io-exc-mip-in-all" },
        { account: "mirror-fd-io-exc-pim-n-in" },
        { account: "mirror-fd-io-exc-ysance-in-all" }
      ],
    mirrorIdSelected : null
  }),
  methods: {
    setAccount: function (mirrorItem) {
      // `this` fait référence à l'instance de Vue à l'intérieur de `methods`
      store.dispatch('mirrorgcsruns/closeDBChannel', {clearModule: true});
      this.$data.mirrorIdSelected = mirrorItem;
      store.dispatch("mirrorgcsruns/fetchAndAdd", {mirrorId: this.$data.mirrorIdSelected}).catch(console.error);
      console.log(store.state.mirrorgcsruns.data);
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user
    }),
    moduleJson() {
      return store.state.mirrorgcsruns.data
    }
  }
};
</script>

<style></style>
