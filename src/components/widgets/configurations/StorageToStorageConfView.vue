<template>
  <v-container grid-list-xl>
      <v-layout row wrap v-if="!isFetchAndAdding">
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-card-title>
            <span class="display-1 font-weight-bold">{{ getConfId }}</span>
            <v-spacer></v-spacer>
            <v-btn color="black" fab small dark outline>
              <v-icon @click="goBack()">
                arrow_back
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <v-layout row>
              <v-flex xs3>
                <v-text-field
                  label="Account"
                  :value=conf.account
                  class="title"
                ></v-text-field>
              </v-flex>
              <v-flex xs3 offset-xs1>
                <v-text-field
                  label="Environement"
                  :value=conf.environment
                  class="title"
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-card-text>
            <v-flex xs12 sm6>
              <h2 class="black--text">Source</h2>
            </v-flex>
            <v-form>
            <v-layout row wrap>
            <v-flex xs12 sm4>
              <v-text-field
                append-outer-icon="label"
                :value=conf.source_bucket
                label="Bucket"
                readonly
                outline
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
              <v-text-field
                append-outer-icon="label"
                :value=conf.source_gcs_prefix
                label="Source Prefix"
                readonly
                outline
              ></v-text-field>
            </v-flex>
                 <v-flex xs12 sm4>
              <v-text-field
                :value=conf.source_archive_prefix
                label="Archive Prefix"
                readonly
                outline
              ></v-text-field>
            </v-flex>
            </v-layout>
            </v-form>
          </v-card-text>
          <v-card-text>
            <v-flex xs12 sm6>
              <h2>Destination(s)</h2>
            </v-flex>
            <v-form>
            <v-layout row wrap>
            <v-flex xs12 sm4>
              <span v-for="item in conf.destination_bucket" :key="item">
              <v-text-field
                append-outer-icon="label"
                :value=item
                label="Bucket"
                readonly
                outline
              ></v-text-field>
              </span>
            </v-flex>
            <v-flex xs12 sm4>
              <span v-for="item in conf.destination_gcs_prefix" :key="item">
              <v-text-field
                :value=item
                label="Destination Prefix"
                readonly
                outline
              ></v-text-field>
              </span>
            </v-flex>
            </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-card-text>
            <v-flex xs12 sm6>
              <h2>File Name Template(s)</h2>
            </v-flex>
            <v-flex xs12 sm6 ml-4>
              <v-layout row>
                <v-list subheader>
                  <v-list-tile
                    v-for="item in conf.filename_templates"
                    :key="item"
                  >
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item"></v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                      <v-icon>info</v-icon>
                    </v-list-tile-action>
                  </v-list-tile>
                </v-list>
              </v-layout>
            </v-flex>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 offset-xs0>
         <v-btn color="warning" fab small dark outline>
              <v-icon @click="viewJson=!viewJson">
                note
              </v-icon>
            </v-btn>
        <v-card v-if="viewJson">
          <v-card-title>
            <span class="display-1 font-weight-bold">{{ conf.id }}</span>
            <v-spacer></v-spacer>
            <v-btn color="warning" fab small dark outline>
              <v-icon @click="viewJson=!viewJson">
                close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <vue-json-pretty
              :data="conf"
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
    <v-layout v-else>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-layout>
  </v-container>             
</template>

<script>
import VueJsonPretty from "vue-json-pretty";
import moment from "moment";
import _ from "lodash";
import Util from '@/util';


export default {
    components: {
        VueJsonPretty
    },
    props: {
        conf: undefined,
        isFetchAndAdding: true,
    },
  data: () => ({
    expand: false,
    viewJson: false
  }),
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  computed: {
    getConfId () {
      //Set a Conf Id to the first destination bucket in the Array when the Id of the Conf is not present in the payload
      let getConfId = "";
      if (this.conf.id !== undefined) {
        getConfId = this.conf.id;
      } else if (this.conf.destination_bucket[0] !== undefined) {
        getConfId = this.conf.destination_bucket[0];
      } else {
        getConfId = "";
      }
      return getConfId
    }
  }
};

</script>

<style></style>
