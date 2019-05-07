<template>
  <v-container grid-list-xl fluid>
    <FiltersMenu viewAccount viewEnvironnement></FiltersMenu>
    <v-layout row wrap>
      <v-flex sm12>
        <v-toolbar flat color="black">
          <v-toolbar-title>Mirror Exc Gcs To Gbq Configuration :</v-toolbar-title>
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
          :items="mirrorExcGcsToGbqConfAllDetailsArrayFlat"
          :search="search"
          :loading="isFetchAndAdding"
          :expand="expand"
          :pagination.sync="pagination"
          item-key="key"
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
            <td>{{ props.item["gbq_dataset"] }}</td>
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
                <span class="headline">{{
                  viewedItem.table_name
                }}</span>
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
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="viewJson">
      <v-flex xs12 offset-xs0>
        <v-card dark class="elevation-10">
          <v-card-title>
            <span class="headline">{{ viewedItem.table_name }}</span>
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
    <v-dialog v-model="dialogDeleteConf" max-width="400" >
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
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import VueJsonPretty from "vue-json-pretty";
import store from "@/store/index";
import FiltersMenu from "./widgets/filters/FiltersMenu.vue";

export default {
  components: {
    VueJsonPretty,
    FiltersMenu
  },
  data: () => ({
    mirrorExcGcsToGbqConfAllDetailsArray : [],
    search: "",
    isFetchAndAdding: false,
    fetchAndAddStatus: "Loading",
    moreToFetchAndAdd: false,
    expand: false,
    pagination: {
      sortBy: "id",
      descending: true,
      rowsPerPage: 10
    },
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
        text: "Destination Table",
        align: "left",
        sortable: true,
        value: "table_name"
      },
      {
        text: "BQ Project ID",
        align: "left",
        sortable: true,
        value: "gcp_project"
      },
      {
        text: "BQ Dataset",
        align: "left",
        sortable: true,
        value: "gbq_dataset"
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
      this.viewedIndex = this.mirrorExcGcsToGbqConfAllDetailsArrayFlat.indexOf(item);
      this.viewedItem = Object.assign({}, item);
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
      store.dispatch('mirrorExcGcsToGbqConf/delete', this.confToDeleteFromFirestore.id).then(this.showSnackbarDeleteConfSuccess = true);
      this.confToDeleteFromFirestore = {};
      this.showDetailConfToDelete = false;
    }, 
    async getFirestoreData() {
      this.mirrorExcGcsToGbqConfAllDetailsArray = [];
      const where = this.whereConfFilter;
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      this.$data.isFetchAndAdding = true;
      try {
        store.dispatch("mirrorExcGcsToGbqConf/closeDBChannel", {
          clearModule: true
        });
        let fetchResult = await store.dispatch(
          "mirrorExcGcsToGbqConf/fetchAndAdd",
          { where, limit: 0 }
        );
        if (fetchResult.done === true) {
          this.$data.moreToFetchAndAdd = false;
        } else {
          this.$data.moreToFetchAndAdd = true;
        }
        this.$data.fetchAndAddStatus = "Success";

        //Loop to the document at the 1st level to get the detail configuration in the CONFIGURATION collection of each document
        //Transform the mirrorExcGcsToGbqConf in Array to loop on
        const mirrorExcGcsToGbqConfArray = Object.values(this.mirrorExcGcsToGbqConf);
        //Loop on mirrorExcGcsToGbqConfArray to get the collection
        for (var confDetailsId in mirrorExcGcsToGbqConfArray) {
          let bucketId = mirrorExcGcsToGbqConfArray[confDetailsId].id
          try {
            store.dispatch("mirrorExcGcsToGbqConfDetails/closeDBChannel", {
              clearModule: true
            });
            let fetchResult = await store.dispatch(
              "mirrorExcGcsToGbqConfDetails/fetchAndAdd",
              { bucketId: bucketId, limit: 0 }
            );
            //Ad the bucket source to the doc configuration and an unique key 
            let mirrorExcGcsToGbqConfDetailsEnriched = Object.values(this.mirrorExcGcsToGbqConfDetails).map(x => Object.assign({bucket_source:bucketId},x));
            //Ad an unique key to the doc configuration (bucket + input filder + table destination)
            mirrorExcGcsToGbqConfDetailsEnriched = mirrorExcGcsToGbqConfDetailsEnriched.map((val, i, arr) => {
              let key = "";
              key = key.concat(val.bucket_source,"__",val.gcs_prefix,"__",val.table_name);
              return Object.assign({key: key},val);
            });
            //Concat the fetched documents in the same Array
            this.mirrorExcGcsToGbqConfAllDetailsArray.push(Object.values(mirrorExcGcsToGbqConfDetailsEnriched));
            } catch (e) {
              console.log("Firestore Error catched");
              console.log(e);
              this.$data.fetchAndAddStatus = "Error";
              this.$data.isFetchAndAdding = false;
            }
        };
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
      mirrorExcGcsToGbqConf: state => state.mirrorExcGcsToGbqConf.data,
      mirrorExcGcsToGbqConfDetails: state => state.mirrorExcGcsToGbqConfDetails.data,
      dateFilterSelected: state => state.filters.dateFilterSelected,
      dateFilters: state => state.filters.dateFilters,
      minDateFilter: state => state.filters.minDateFilter
    }),
    ...mapGetters(["periodFiltered", "whereConfFilter"]),
    mirrorExcGcsToGbqConfAllDetailsArrayFlat() {
      return this.mirrorExcGcsToGbqConfAllDetailsArray.flat();
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
