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
      :items="getGbqToGbqConfsFormated"
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
        <td>{{ props.item.account }}</td>
        <td>{{ props.item.environment }}</td>
        <td>
          <router-link
            :to="{
              name: 'TablesToTablesConf',
              params: { pathId: props.item.id }
            }"
            ><span class="font-weight-medium">
              {{ props.item.id }}</span
            ></router-link
          >
        </td>
        <td>{{ props.item.configuration.default_bq_dataset }}</td>
        <td>{{ props.item["nb_tasks"] }}</td>
        <td>
          <ActivatedStatusChip
            @click.native="
              changeActivatedStatus(props.item, 'getGbqToGbqConfs')
            "
            :activatedConfStatus="props.item.configuration.activated"
          ></ActivatedStatusChip>
        </td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewItem(props, props.item)">
            remove_red_eye
          </v-icon>
        </td>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-title>
            <span class="headline">{{ viewedItem.id }}</span>
            <v-spacer></v-spacer>
            <v-btn color="warning" fab small dark outline>
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
        <v-card dark class="elevation-10">
          <v-card-title>
            <span class="headline">{{ id }}</span>
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
import DataManagementFilters from "./widgets/filters/DataManagementFilters";
import ActivatedStatusChip from "./widgets/datatablewidgets/ActivatedStatusChip.vue";
import ConfsComponent from "@/mixins/confsComponent.js";

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
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    expand: false,
    pagination: {
      sortBy: "table_name",
      descending: true,
      rowsPerPage: 10
    },
    viewJson: false,
    viewedItem: {},
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
        text: "BQ Default Dataset",
        align: "left",
        sortable: true,
        value: "configuration.default_bq_dataset"
      },
      {
        text: "# Tasks",
        align: "left",
        sortable: true,
        value: "nb_tasks"
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
  mounted() {
    this.getFirestoreData();
  },
  methods: {
    viewItem(props, item) {
      props.expanded = !props.expanded;
      this.viewedIndex = this.getGbqToGbqConfsFormated.indexOf(item);
      this.viewedItem = item;
    },
    async getFirestoreData() {
      const where = this.whereConfFilter;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("getGbqToGbqConfs/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch("getGbqToGbqConfs/fetchAndAdd", {
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
      getGbqToGbqConfs: state => state.getGbqToGbqConfs.data
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    getGbqToGbqConfsFormated() {
      const dataArray = Object.values(this.getGbqToGbqConfs);
      var dataFormated = dataArray.map(function(data, index) {
        return {
          nb_tasks: data.configuration.workflow.length,
          sqlArray: Object.entries(data.sql)
        };
      });
      const dataArrayFormated = _.merge(dataArray, dataFormated);
      return dataArrayFormated;
    }
  },
  watch: {
    whereConfFilter(newValue, oldValue) {
      this.getFirestoreData();
    }
  }
};
</script>

<style></style>
