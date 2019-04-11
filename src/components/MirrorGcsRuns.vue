<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <h1>Mirror GCS Runs:</h1>
      <v-flex xs12 offset-xs0>
        <v-card dark>
          <v-card-text>
            <vue-json-pretty
              :data="moduleJson"
              :deep="5"
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
    json: {"status":200,"error":"","data":[{"news_id":51184,"title":"iPhone X Review: Innovative future with real black technology","source":"Netease phone"},{"news_id":51183,"title":"Traffic paradise: How to design streets for people and unmanned vehicles in the future?","source":"Netease smart"},{"news_id":51182,"title":"Teslamask's American Business Relations: The government does not pay billions to build factories","source":"AI Finance","members":["Daniel","Mike","John"]}]}
  }),
  created() {
    //load the content of the module
    store.dispatch("mirrorgcsruns/fetchAndAdd", {mirrorId: "mirror-fd-io-exc-jules-n-in"}).catch(console.error);
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user
    }),
    moduleJson() {
      return store.state.mirrorgcsruns.data;
    }
  }
};
</script>

<style></style>
