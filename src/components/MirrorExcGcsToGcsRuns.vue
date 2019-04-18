<template>
  <v-container grid-list-xl>
     <v-toolbar flat color="black">
      <v-toolbar-title>Mirror Exc GCS To GCS Runs</v-toolbar-title>
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
          :items="mirrorExcGcsToGcsRuns"
          :search="search"
          :loading="isFetchAndAdding"
          :expand="expand"
          item-key="dag_run_id"
          class="elevation-5"
        >
         <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td>{{ props.item["account"] }}</td>
            <td>{{ props.item["environment"]}}</td>
            <td>{{ props.item["source_bucket"]}}</td>
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
import VueJsonPretty from 'vue-json-pretty';
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";

export default {
  components: {
    VueJsonPretty
  },
  data: () => ({
    search: "",
    isFetchAndAdding: false,
    expand: false,
    viewJson: false,
    viewedItem: {},
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
            text: 'Source Bucket',
            align: 'left',
            sortable: true,
            value: 'source_bucket' },
          { 
            text: 'File',
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
  created() {
    //load the content of the module
    this.$data.isFetchAndAdding = true;
    store.dispatch("mirrorExcGcsToGcsRuns/fetchAndAdd").then(this.$data.isFetchAndAdding = false).catch(console.error);
  },
   methods: {
     viewItem (props,item) {
        props.expanded = !props.expanded;
        this.viewedIndex = this.mirrorExcGcsToGcsRuns.indexOf(item);
        this.viewedItem = Object.assign({}, item);
      },
      mirrorExcGcsToGcsRunsFormated() {
        const dataArray = Object.values(store.state.mirrorExcGcsToGcsRuns.data)
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
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user
    }),
    mirrorExcGcsToGcsRunsArray() {
      return Object.values(store.state.mirrorExcGcsToGcsRuns.data);
    },
    mirrorExcGcsToGcsRuns() {
      return this.mirrorExcGcsToGcsRunsFormated();
    }
  }
};
</script>

<style></style>
