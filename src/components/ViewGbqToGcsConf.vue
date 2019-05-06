<template>
  <v-container grid-list-xl fluid>
    <FiltersMenu viewAccount viewEnvironnement></FiltersMenu>
    <v-toolbar flat color="black">
      <v-toolbar-title>GBQ To GCS Conf</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-icon right dark @click="getFirestoreData" v-if="!isFetchAndAdding">refresh</v-icon>
      <v-progress-circular
      indeterminate
      size=20
      color="primary"
      v-if="isFetchAndAdding"
      ></v-progress-circular>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="getGbqToGcsConfFormated"
      :search="search"
      :loading="isFetchAndAdding"
      :expand="expand"
      :pagination.sync="pagination"
      item-key="id"
      class="elevation-5"
    >
      <v-progress-linear
        v-slot:progress
        color="blue"
        indeterminate
      ></v-progress-linear>
      <template v-slot:items="props">
        <td>{{ props.item["account"] }}</td>
        <td>{{ props.item["environment"] }}</td>
        <td>{{ props.item["table_name"] }}</td>
        <td>{{ props.item["gcp_project"] }}</td>
        <td>{{ props.item["gcs_dest_bucket"] }} </td>
        <td>{{ props.item["gcs_dest_prefix"] }}</td>
        <td @click="changeActivatedStatus(props.item)">
        <ActivatedStatusChip :activatedConfStatus=props.item.activated ></ActivatedStatusChip>
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
            <span class="headline">{{ viewedItem.table_name }}</span>
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
            <span class="headline">{{ viewedItem }}</span>
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
import ActivatedStatusChip from "./widgets/datatablewidgets/ActivatedStatusChip.vue"

export default {
  components: {
    VueJsonPretty,
    FiltersMenu,
    ActivatedStatusChip
  },
  data: () => ({
    search: "",
    isFetchAndAdding: false,
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
        text: "Generated File",
        align: "left",
        sortable: true,
        value: "table_name"
      },
      {
        text: "BQ Project Id",
        align: "left",
        sortable: true,
        value: "gcp_project"
      },
      {
        text: "Destination Bucket",
        align: "left",
        sortable: true,
        value: "gcs_dest_bucket"
      },
      {
        text: "Destination Prefix",
        align: "left",
        sortable: true,
        value: "gcs_dest_prefix"
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
      this.viewedIndex = this.getGbqToGcsConfFormated.indexOf(item);
      this.viewedItem = item;
    },
    async getFirestoreData() {
      const where = this.whereConfFilter;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("getGbqToGcsConf/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "getGbqToGcsConf/fetchAndAdd",
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
    },
    changeActivatedStatus(item) {
      console.log("hello")
      let newActivatedStatus = false;
      let id=item.id;

      switch (item.activated) {
        case true:
        newActivatedStatus = false;
        break;
        case false:
        newActivatedStatus = true;
        break;
        default:
        newActivatedStatus = false;;
        break;
      }
      //console.log(item)
      store.dispatch('getGbqToGcsConf/patch', {id, activated: newActivatedStatus});
    } 
  },
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      getGbqToGcsConf: state => state.getGbqToGcsConf.data,
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    getGbqToGcsConfFormated() {
      const dataArray = Object.values(this.getGbqToGcsConf);
      var dataFormated = dataArray.map(function(data, index) {
        return {
          //color for the activated status
          activeConfColor: Util.getActiveConfColor(data.activated),
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
