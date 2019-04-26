<template>
  <v-container grid-list-xl fluid>
    <RunFiltersMenu></RunFiltersMenu>
    <v-layout row wrap >
      <v-flex sm12>
        <v-toolbar flat color="black">
          <v-toolbar-title>Mirror Exc Gcs To Gbq Runs :</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
        <v-data-table
              :headers="headers"
              :items="mirrorExcGcsToGbqRunsFormated"
              :search="search"
              :loading="isFetchAndAdding"
              :expand="expand"
              :pagination.sync="pagination"
              item-key="dag_run_id"
              class="elevation-5"
            >
            <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
              <template v-slot:items="props">
                <td>{{ props.item["account"] }}</td>
                <td>{{ props.item["environment"]}}</td>
                <td>{{ props.item["gbq_table_refreshed"]}}</td>
                <td>{{ props.item["gcs_triggering_file"]}}</td>
                <td>{{ props.item["dag_execution_date_formated"] }}</td>
                <td class="justify-center layout px-0">
                  <v-icon
                    small
                    class="mr-2"
                    @click="viewItem(props,props.item)"
                  >
                    remove_red_eye
                  </v-icon>
                  </td>
              </template>
              <template v-slot:expand="props">
                <v-card flat>
                  <v-card-title>
                    <span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
                    <v-spacer></v-spacer>
                    <v-btn color="warning" fab small dark outline>
                      <v-icon
                      @click="props.expanded = !props.expanded;"
                      >
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
          </v-flex>
    </v-layout>
    <v-layout row wrap v-if="viewJson">
      <v-flex xs12 offset-xs0>
        <v-card dark class="elevation-10">
          <v-card-title>
            <span class="headline">{{ viewedItem.gcs_triggering_file }}</span>
            <v-spacer></v-spacer>
            <v-btn color="warning" fab small dark outline>
              <v-icon
              @click="viewJson=false"
              >
              close
              </v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text >
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
import { mapGetters } from 'vuex';
import VueJsonPretty from 'vue-json-pretty';
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import RunFiltersMenu from "./widgets/filters/RunFiltersMenu.vue"

export default {
  components: {
    VueJsonPretty,
    RunFiltersMenu
  },
  data: () => ({
    search: "",
    isFetchAndAdding: false,
    fetchAndAddStatus: "Loading",
    moreToFetchAndAdd: false,
    expand: false,
    pagination : {'sortBy': 'dag_execution_date_formated', 'descending': true, 'rowsPerPage': 10},
    viewJson: false,
    viewedItem: {},
    chartNbDays: 1,
    headers: [
      {
        text: 'Account ID',
        align: 'left',
        sortable: true,
        value: 'account'
      },
      { 
        text: 'Environnement',
        align: 'left',
        sortable: true,
        value: 'environment' 
      },
      { 
        text: 'Destination Table',
        align: 'left',
        sortable: true,
        value: 'gbq_table_refreshed' },
      { 
        text: 'Source file',
        align: 'left',
        sortable: true,
        value: 'gcs_triggering_file'
      },
      { 
        text: 'Execution Date',
        align: 'left',
        sortable: true,
        value: 'dag_execution_date_formated' 
      },
      { text: 'Actions', 
        align: 'center',
        value: 'actions', 
        sortable: false 
      }
    ]
  }),
    mounted() {
      this.handleMounted();
    },
   methods: {
     viewItem (props,item) {
        props.expanded = !props.expanded;
        this.viewedIndex = this.mirrorExcGcsToGbqRunsFormated.indexOf(item);
        this.viewedItem = Object.assign({}, item);
      },
      async handleMounted() {
        const where = this.whereFilter;
        this.$data.fetchAndAddStatus = "Loading";
        this.$data.moreToFetchAndAdd = false;
        this.$data.isFetchAndAdding = true;
        try {
          store.dispatch('mirrorExcGcsToGbqRuns/closeDBChannel', {clearModule: true});
          let fetchResult = await store.dispatch("mirrorExcGcsToGbqRuns/fetchAndAdd", {where, limit: 0});
          if (fetchResult.done === true) {
            this.$data.moreToFetchAndAdd = false;
          } else {
            this.$data.moreToFetchAndAdd = true;
          }
          this.$data.fetchAndAddStatus = 'Success';
        } catch (e) {
          this.$data.fetchAndAddStatus = 'Error';
          this.$data.isFetchAndAdding = false;
        };
        this.$data.isFetchAndAdding = false;
    },
   },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      mirrorExcGcsToGbqRuns: state => state.mirrorExcGcsToGbqRuns.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters([  
      "periodFiltered",
      "whereFilter"
    ]),
    mirrorExcGcsToGbqRunsFormated() {
      const dataArray = Object.values(this.mirrorExcGcsToGbqRuns);
      var dataFormated = dataArray.map(function(data,index) {
        return {
          dag_execution_date_formated: moment(data.dag_execution_date).format('YYYY/MM/DD - HH:mm'),
          dag_execution_date_from_now: moment(data.dag_execution_date).fromNow()
        };
      });
      const dataArrayFormated = _.merge(dataArray, dataFormated);
      return dataArrayFormated;
    }
  },
  watch: {
    whereFilter(newValue, oldValue) {
      this.handleMounted();
    }
  }
};
</script>

<style></style>


