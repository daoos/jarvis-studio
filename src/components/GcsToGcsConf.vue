<template>
  <v-container grid-list-xl>
      <v-layout row wrap v-if="!isFetchAndAdding">
      <v-flex xs12 offset-xs0>
        <v-card>
          <v-card-title>
            <span class="display-1 font-weight-bold">{{ conf.id }}</span>
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
                    @click=""
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
  </v-container>             
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from '@/util';


export default {
  components: {
    VueJsonPretty
  },
  data: () => ({
    conf: undefined,
    search: "",
    isFetchAndAdding: true,
    expand: false,
    pagination: {
      sortBy: "id",
      descending: true,
      rowsPerPage: 10
    },
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    viewJson: false,
    viewedItem: {},
    confToDeleteFromFirestore: {},
    dialogDeleteConf: false,
    showDetailConfToDelete: false,
    showSnackbarDeleteConfSuccess: false
  }),
  async mounted() {
    await this.getConf();
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    async getConf() {
      this.$data.isFetchAndAdding = true;
      //get the conf is not in mirrorExcGcsToGcsConfs 
      if (this.mirrorExcGcsToGcsConfs[this.confId] == undefined) {
        await this.getFirestoreData();
        console.log();
      }
      this.conf = this.mirrorExcGcsToGcsConfs[this.confId]
      this.$data.isFetchAndAdding = false;
    },
    async getFirestoreData() {
      const confId = this.confId;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      try {
        await store.dispatch("mirrorExcGcsToGcsConfs/closeDBChannel", {
          clearModule: true
        });
        await store.dispatch("mirrorExcGcsToGcsConfs/fetchById",confId);
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
        this.$data.fetchAndAddStatus = "Error";
      }
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data
    }),
    confId () {
      return this.$route.params.confId ;
    }
  }
};

</script>

<style></style>
