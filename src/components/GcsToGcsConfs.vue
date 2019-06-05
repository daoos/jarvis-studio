<template>
  <v-container grid-list-xl fluid>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <DataManagementFilters viewEnvironnement></DataManagementFilters>
      <v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>
      <v-progress-circular
      indeterminate
      size=20
      color="primary"
      v-if="isFetchAndAdding"
      ></v-progress-circular>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="mirrorExcGcsToGcsConfsFormated"
      :search="search"
      :loading="isFetchAndAdding"
      :expand="expand"
      :pagination.sync="pagination"
      item-key="id"
      class="elevation-1"
    >
      <v-progress-linear
        v-slot:progress
        color="blue"
        indeterminate
      ></v-progress-linear>
      <template v-slot:items="props">
        <td>{{ props.item["account"] }}</td>
        <td>{{ props.item["environment"] }}</td>
        <td><router-link :to="{ name: 'GcsToGcsConf', params: { confId: props.item.id }}"><span class="font-weight-medium">{{ props.item["id"] }}</span></router-link></td>
        <td>{{ props.item["source_bucket"] }}</td>
        <td>{{ props.item["nb_destination_buckets"] }} </td>
        <td>{{ props.item["nb_filename_templates"] }}</td>
        <td>
          <ActivatedStatusChip @click.native="changeActivatedStatus(props.item,'mirrorExcGcsToGcsConfs')" :activatedConfStatus=props.item.activated ></ActivatedStatusChip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewItem(props, props.item)">
            remove_red_eye
          </v-icon>
          <v-icon small class="mr-2" @click="deleteConfFromFirestore(props, props.item)">
            delete_forever
          </v-icon>
        </td>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-title>
            <span class="headline">{{ viewedItem.id }}</span>
            <v-spacer></v-spacer>
            <v-btn color="warning" fab small outline>
              <v-icon @click="props.expanded = !props.expanded">
                close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <vue-json-pretty
              :data="viewedItem"
              :deep="5"
              :show-double-quotes="true"
              :show-length="true"
              :show-line="false"
            >
            </vue-json-pretty>
          </v-card-text>
        </v-card>
      </template> 
      <v-alert v-slot:no-results :value="true" color="error" icon="warning">
        Your search for "{{ search }}" found no results.
      </v-alert>
    </v-data-table>
    <v-layout row wrap v-if="viewJson">
      <v-flex xs12 offset-xs0>
        <v-card class="elevation-10">
          <v-card-title>
            <span class="headline">{{ viewedItem.id }}</span>
            <v-spacer></v-spacer>
            <v-btn color="warning" fab small dark outline>
              <v-icon @click="viewJson = false">
                close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>
            <vue-json-pretty
              :data="viewedItem"
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
    <v-dialog v-model="dialogDeleteConf" max-width="400">
      <v-card light>
        <v-card-title class="headline">Delete Configuration</v-card-title>
        <v-card-text>
          Do you really want to delete the configuration?
          <h3 class="pt-3"><v-icon size=18>arrow_forward</v-icon>{{ confToDeleteFromFirestore.id }}</h3>
        </v-card-text>
        <v-card-actions>
          <v-btn icon @click="showDetailConfToDelete = !showDetailConfToDelete">
            <v-icon>{{ showDetailConfToDelete ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat="flat"
            @click="cancelDeleteConfFromFirestore"
          >
            Cancel
          </v-btn>
          <v-btn
            color="error"
            @click="confirmeDeleteConfFromFirestore"
          >
            Delete
          </v-btn>
        </v-card-actions>
        <v-slide-y-transition>
          <v-card-text v-show="showDetailConfToDelete">
            <vue-json-pretty
                :data="confToDeleteFromFirestore"
                :deep="5"
                :show-double-quotes="true"
                :show-length="true"
                :show-line="false"
              >
              </vue-json-pretty>
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-dialog>
      <v-snackbar
        v-model="showSnackbarDeleteConfSuccess"
        color="success"
        :timeout="1000"
        auto-height
      >
        Configuration deleted with sucess
      </v-snackbar>
      <v-snackbar
        v-model="snackbarParam.show"
        :color="snackbarParam.color"
        :timeout="2000"
        auto-height
        >
        {{ snackbarParam.message }}
        <v-btn
        flat
        @click="snackbarParam.show = false"
        >
        Close
      </v-btn>
    </v-snackbar>
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
import ActivatedStatusChip from "./widgets/datatablewidgets/ActivatedStatusChip.vue";
import ConfsComponent from "@/mixins/confsComponent.js";
import DataManagementFilters from "./widgets/filters/DataManagementFilters";

export default {
  mixins: [ConfsComponent],
  components: {
    VueJsonPretty,
    DataManagementFilters,
    ActivatedStatusChip
  },
  data: () => ({
    search: "",
    isFetchAndAdding: false,
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
    showSnackbarDeleteConfSuccess: false,
    headers: [
      {
        text: "Account ID",
        align: "left",
        sortable: true,
        value: "account"
      },
      {
        text: "Environnement",
        align: "left",
        sortable: true,
        value: "environment"
      },
      {
        text: "Configuration Id",
        align: "left",
        sortable: true,
        value: "id"
      },
      {
        text: "Source Bucket",
        align: "left",
        sortable: true,
        value: "source_bucket"
      },
      {
        text: "Nb Destination Buckets",
        align: "left",
        sortable: true,
        value: "nb_destination_buckets"
      },
      {
        text: "Nb File Templates",
        align: "left",
        sortable: true,
        value: "nb_filename_templates"
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "activated"
      },
      { text: "Actions", align: "center", value: "actions", sortable: false }
    ]
  }),
  async mounted() {
    await this.getFirestoreData();
  },
  methods: {
    viewItem(props, item) {
      props.expanded = !props.expanded;
      this.viewedIndex = this.mirrorExcGcsToGcsConfsFormated.indexOf(item);
      this.viewedItem = item;
    },
    deleteConfFromFirestore(props, item) {
      this.confToDeleteFromFirestore = item;
      this.dialogDeleteConf = true;
    }, 
    cancelDeleteConfFromFirestore() {
      this.dialogDeleteConf = false;
      this.confToDeleteFromFirestore = {};
      this.showDetailConfToDelete = false;
    },
    confirmeDeleteConfFromFirestore() {
      this.dialogDeleteConf = false;
      this.showSnackbarDeleteConfSuccess = false;
      store.dispatch('mirrorExcGcsToGcsConfs/delete', this.confToDeleteFromFirestore.id).then(this.showSnackbarDeleteConfSuccess = true);
      this.confToDeleteFromFirestore = {};
      this.showDetailConfToDelete = false;
    }, 
    async getFirestoreData() {
      const where = this.whereConfFilter;
      console.log(where);
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("mirrorExcGcsToGcsConfs/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "mirrorExcGcsToGcsConfs/fetchAndAdd",
          { where, limit: 0 }
        );
        if (fetchResult.done === true) {
          this.$data.moreToFetchAndAdd = false;
        } else {
          this.$data.moreToFetchAndAdd = true;
        }
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
        this.$data.fetchAndAddStatus = "Error";
        this.$data.isFetchAndAdding = false;
      }
      this.$data.isFetchAndAdding = false;
    }
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      mirrorExcGcsToGcsConfs: state => state.mirrorExcGcsToGcsConfs.data,
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    mirrorExcGcsToGcsConfsFormated() {
      const dataArray = Object.values(this.mirrorExcGcsToGcsConfs);
      var dataFormated = dataArray.map(function(data, index) {
        return {
          nb_destination_buckets: data.destination_bucket.length,
          nb_filename_templates: data.filename_templates.length,
        };
      });
      const dataArrayFormated = _.merge(dataArray, dataFormated);
      return dataArrayFormated;
    }
  },
  watch: {
    async whereConfFilter(newValue, oldValue) {
      await this.getFirestoreData();
    }
  }
};
</script>

<style></style>
