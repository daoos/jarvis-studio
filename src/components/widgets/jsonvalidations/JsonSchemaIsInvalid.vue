<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-card-title>
            <span class="display-1 font-weight-bold">{{
              this.jsonObject.id
            }}</span>
            <v-spacer></v-spacer>
            <v-chip color="red" text-color="white">{{
              this.jsonObjectErrors.length + " errors"
            }}</v-chip>
          </v-card-title>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-tabs
            v-model="activeTab"
            color="grey lighten-3"
            slider-color="primary"
          >
            <v-tab ripple href="#jsonobject">
              Json Object
            </v-tab>
            <v-tab ripple href="#jsonobjecterrors">
              Json Errors
            </v-tab>
            <v-tab-item value="jsonobject">
              <v-card>
                <v-card-title>
                  <span class="title">{{ this.jsonObject.id }}</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                  <vue-json-pretty
                    :data="this.jsonObject"
                    :deep="5"
                    :show-double-quotes="true"
                    :show-length="true"
                    :show-line="false"
                  >
                  </vue-json-pretty>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item value="jsonobjecterrors">
              <v-card>
                <v-card-title>
                  <span class="title"> Json Schema Errors</span>
                  <v-spacer></v-spacer>
                </v-card-title>
                <v-card-text>
                  <vue-json-pretty
                    :data="this.jsonObjectErrors"
                    :deep="5"
                    :show-double-quotes="true"
                    :show-length="true"
                    :show-line="false"
                  >
                  </vue-json-pretty>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
// https://jsonschema.net/

export default {
  components: { VueJsonPretty },
  props: {
    jsonObject: Object,
    jsonObjectErrors: Array
  },
  data: () => ({
    activeTab: null
  }),
  created() {},
  methods: {},
  computed: {}
};
</script>
