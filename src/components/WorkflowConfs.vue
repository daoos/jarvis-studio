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
      <v-icon right @click="getFirestoreData" v-if="!isFetchAndAdding"
        >refresh</v-icon
      >
      <v-progress-circular
        indeterminate
        size="20"
        color="primary"
        v-if="isFetchAndAdding"
      ></v-progress-circular>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="workflowConfsFormated"
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
        <td>{{ props.item["id"] }}</td>
        <td>{{ props.item["target_dag"] }}</td>
        <td>{{ props.item["nb_authorized_jobs"] }}</td>
        <td>
          <ActivatedStatusChip
            @click.native="changeActivatedStatus(props.item, 'workflowConfs')"
            :activatedConfStatus="props.item.activated"
          ></ActivatedStatusChip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewItem(props, props.item)">
            remove_red_eye
          </v-icon>
          <v-icon
            small
            class="mr-2"
            @click="deleteConfFromFirestore(props, props.item)"
          >
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
          <h3 class="pt-3">
            <v-icon size="18">arrow_forward</v-icon
            >{{ confToDeleteFromFirestore.id }}
          </h3>
        </v-card-text>
        <v-card-actions>
          <v-btn icon @click="showDetailConfToDelete = !showDetailConfToDelete">
            <v-icon>{{
              showDetailConfToDelete
                ? "keyboard_arrow_up"
                : "keyboard_arrow_down"
            }}</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat="flat"
            @click="cancelDeleteConfFromFirestore"
          >
            Cancel
          </v-btn>
          <v-btn color="error" @click="confirmeDeleteConfFromFirestore">
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
      <v-btn flat @click="snackbarParam.show = false">
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
import Util from "@/util";
import ActivatedStatusChip from "./widgets/datatablewidgets/ActivatedStatusChip.vue";
import ConfsComponent from "@/mixins/confsComponent.js";
import DataManagementFilters from "./widgets/filters/DataManagementFilters";

export default {
  mixins: [ConfsComponent],
  components: {
    VueJsonPretty,
    ActivatedStatusChip,
    DataManagementFilters
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
        text: "Workflow Id",
        align: "left",
        sortable: true,
        value: "id"
      },
      {
        text: "Dag to fire",
        align: "left",
        sortable: true,
        value: "target_dag"
      },
      {
        text: "Nb triggering Jobs",
        align: "left",
        sortable: true,
        value: "nb_authorized_jobs"
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
      this.viewedIndex = this.workflowConfsFormated.indexOf(item);
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
      store
        .dispatch("workflowConfs/delete", this.confToDeleteFromFirestore.id)
        .then((this.showSnackbarDeleteConfSuccess = true));
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
        store.dispatch("workflowConfs/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch("workflowConfs/fetchAndAdd", {
          where,
          limit: 0
        });
        if (fetchResult.done === true) {
          this.$data.moreToFetchAndAdd = false;
        } else {
          this.$data.moreToFetchAndAdd = true;
        }
        this.$data.fetchAndAddStatus = "Success";
      } catch (e) {
        console.log("Firestore Error catched");
        console.log(e);
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
      workflowConfs: state => state.workflowConfs.data
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    workflowConfsFormated() {
      const dataArray = Object.values(this.workflowConfs);
      var dataFormated = dataArray.map(function(data, index) {
        return {
          nb_authorized_jobs: data.authorized_job_ids.length
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
