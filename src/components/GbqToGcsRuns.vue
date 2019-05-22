<template>
  <v-container grid-list-xl fluid>
    <FiltersMenu viewAccount viewEnvironnement viewPeriode></FiltersMenu>
    <v-toolbar class="elevation-1" color="grey lighten-3">
      <v-toolbar-title>GBQ To GCS Runs</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
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
      :items="getGbqToGcsRunsFormated"
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
        <td>{{ props.item["destination_bucket"] }}</td>
        <td>{{ props.item["gcs_triggering_file"] }}</td>
        <td>
          <v-chip
            :color="props.item.statusColor"
            text-color="white"
            small
            class="text-lowercase"
            >{{ props.item["status"] }}</v-chip
          >
        </td>
        <td>{{ props.item["dag_execution_date_formated"] }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="viewItem(props, props.item)">
            remove_red_eye
          </v-icon>
          <v-icon class="mr-2" small @click="openAirflowDagRunUrl(props.item)">
            open_in_new
          </v-icon>
        </td>
      </template>
      <template v-slot:expand="props">
        <v-card flat>
          <v-card-title>
            <span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
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
            <span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
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
import FiltersMenu from "./widgets/filters/FiltersMenu.vue";

export default {
  components: {
    VueJsonPretty,
    FiltersMenu
  },
  data: () => ({
    search: "",
    isFetchAndAdding: false,
    expand: false,
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    pagination: {
      sortBy: "dag_execution_date_formated",
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
        text: "Destination Bucket",
        align: "left",
        sortable: true,
        value: "destination_bucket"
      },
      {
        text: "Generated File",
        align: "left",
        sortable: true,
        value: "gcs_triggering_file"
      },
      {
        text: "Status",
        align: "left",
        sortable: true,
        value: "status"
      },
      {
        text: "Execution Date",
        align: "left",
        sortable: true,
        value: "dag_execution_date_formated"
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
      this.viewedIndex = this.getGbqToGcsRunsFormated.indexOf(item);
      this.viewedItem = Object.assign({}, item);
    },
    openAirflowDagRunUrl(item) {
      window.open(item.dag_execution_airflow_url, "_blank");
    },
    async getFirestoreData() {
      const where = this.whereRunsFilter;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("getGbqToGcsRuns/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "getGbqToGcsRuns/fetchAndAdd",
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
      getGbqToGcsRuns: state => state.getGbqToGcsRuns.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters(["periodFiltered", "whereRunsFilter"]),
    getGbqToGcsRunsFormated() {
      const dataArray = Object.values(this.getGbqToGcsRuns);
      const airflowRootUrl = this.settings.airflowRootUrl;
      var dataFormated = dataArray.map(function(data, index) {
        return {
          dag_execution_date_formated: moment(data.dag_execution_date).format(
            "YYYY/MM/DD - HH:mm"
          ),
          dag_execution_date_from_now: moment(data.dag_execution_date).fromNow(),
          //color for the status
          statusColor: Util.getStatusColor(data.status),
          //generate Airflow URL 
          dag_execution_airflow_url: Util.dagRunAirflowUrl(airflowRootUrl,data.dag_id,data.dag_run_id,data.dag_execution_date)
        };
      });
      const dataArrayFormated = _.merge(dataArray, dataFormated);
      return dataArrayFormated;
    }
  },
  watch: {
    whereRunsFilter(newValue, oldValue) {
      this.getFirestoreData();
    }
  }
};
</script>

<style></style>
