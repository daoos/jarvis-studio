<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <h1>Mirror Gcs Configurations:</h1>
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
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";

export default {
  components: {
    VueJsonPretty
  },
  data: () => ({}),
  created() {
    //load the content of the module
    const where = [
      // an array of arrays
      ["destination_bucket", "array_contains", "*jules*"]
    ];
    store
      .dispatch("mirrorgcsconfigurations/fetchAndAdd", {
        where: [
          [
            "destination_bucket",
            "array-contains",
            "mirror-fd-io-exc-jules-n-in"
          ]
        ]
      })
      .catch(console.error);
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user
    }),
    moduleJson() {
      return store.state.mirrorgcsconfigurations.data;
    }
  }
};
</script>

<style></style>
