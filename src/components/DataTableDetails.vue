<template>
  <v-container grid-list-xl>
        <v-layout row wrap v-if="!isFetchAndAdding">
        <v-layout row wrap v-if="jsonIsValid">
        <v-flex xs12 offset-xs0>
            <v-card>
            <v-card-title>
                <span class="display-1 font-weight-bold">{{ this.dataTableDetails.id}}</span>
                <v-spacer></v-spacer>
                <v-btn color="black" fab small dark outline>
                <v-icon @click="getDataTableDetails()">
                    refresh
                </v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-layout row>
                 <v-flex>
                    <v-textarea
                    name="Description"
                    label="Description"
                    :value="dataTableDetails.description"
                    auto-grow
                    rows="1"
                    readonly
                    ></v-textarea>
                </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                        label="Account"
                        :value="dataTableDetails.account"
                        class="title"
                        ></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                    label="Project Id"
                    :value=this.projectId
                    class="title"
                    ></v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                    <v-text-field
                    label="Dataset"
                    :value=this.datasetId
                    class="title"
                    ></v-text-field>
                </v-flex>
                    <v-flex xs3 offset-xs1>
                    <v-text-field
                    label="Location"
                    :value="dataTableDetails.location"
                    class="title"
                    ></v-text-field>
                </v-flex>
                </v-layout>
                <v-layout row>
                    <v-flex xs3>
                        <v-text-field
                        label="Row Number"
                        :value="numRowsFormated"
                        class="title"
                        ></v-text-field>
                </v-flex>
                <v-flex xs3>
                    <v-text-field
                    label="Table Size"
                    :value="numBytesFormated"
                    class="title"
                    ></v-text-field>
                </v-flex>
                <v-flex xs3 offset-xs1>
                    <v-text-field
                    label="Table Type"
                    :value="dataTableDetails.kind"
                    class="title"
                    ></v-text-field>
                </v-flex>
                    <v-flex xs3 offset-xs1>
                    <v-text-field
                    label="Time Partitioned"
                    :value="isTimePartitioned"
                    class="title"
                    ></v-text-field>
                </v-flex>
                </v-layout>
            </v-card-text>
            </v-card>
        </v-flex>
        <v-flex xs12 offset-xs0>
            <v-tabs
                v-model="activeTab"
                color="grey lighten-3"
                slider-color="primary"
            >
                <v-tab
                    ripple
                    href="#dataoverview"
                >
                    Data Overview
                </v-tab>
                <v-tab
                    ripple
                    href="#schema"
                >
                    Schema
                </v-tab>
                <v-tab
                    ripple
                    href="#fulljson"
                >
                    Full Json
                </v-tab>
                <v-tab-item
                    value="dataoverview"
                >
                    <v-card>
                        <v-card-title>
                            <span class="title">Data Overview</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <vue-good-table
                            :columns="this.dataTableOverviewColumns"
                            :rows="this.dataTableOverviewRows"
                            styleClass="vgt-table condensed striped"
                        >
                        <template slot="table-row" slot-scope="props">
                            <span class="body-1">{{props.formattedRow[props.column.field]}}</span> 
                        </template>
                        </vue-good-table>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                    value="schema"
                >
                    <v-card>
                        <v-card-title>
                            <span class="title">Schema</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <vue-good-table
                            :columns="this.schemaColumns"
                            :rows="this.schemaRows"
                            styleClass="vgt-table condensed striped"
                        >
                        <template slot="table-row" slot-scope="props">
                            <span class="body-1">{{props.formattedRow[props.column.field]}}</span> 
                        </template>
                        </vue-good-table>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item
                    value="fulljson"
                >
                     <v-card>
                        <v-card-title>
                            <span class="title">Full Json</span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <vue-json-pretty
                                :data="this.dataTableDetails"
                                :deep="5"
                                :show-double-quotes="true"
                                :show-length="true"
                                :show-line="false"
                        >
                        </vue-json-pretty>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
        <JsonSchemaIsInvalid :jsonObject="this.dataTableDetails" :jsonObjectErrors="this.jsonObjectErrors"></JsonSchemaIsInvalid>
    </v-layout>
    </v-layout>
    <v-layout row wrap v-else>
        <template>
        <v-progress-linear :indeterminate="true"></v-progress-linear>
        </template>
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
import JsonSchemaIsInvalid from "./widgets/jsonvalidations/JsonSchemaIsInvalid.vue";
// vue-good-table import the styles 
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
// library to validate Object Json Schema from Firestore
import Ajv from "ajv";
// library to convert units (bite to Go ) and format number
import * as convert from "convert-units";
import * as numeral from "numeral";

export default {
  components: {
    VueJsonPretty,
    VueGoodTable,
    JsonSchemaIsInvalid
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
    showSnackbarDeleteConfSuccess: false,
    dataTableOverviewColumns: [],
    dataTableOverviewRows: [],
    schemaColumns: [
        {
          label: 'Name',
          field: 'name',
        },
        {
          label: 'Type',
          field: 'type',
        },
        {
          label: 'Mode',
          field: 'mode',
        },
        {
          label: 'Description',
          field: 'description',
        }
    ],
    schemaRows: [],
    activeTab: null,
    jsonIsValid: true,
    jsonObjectErrors: {}
  }),
  async mounted() {
    await this.getDataTableDetails();
  },
  watch: {
    '$route' (to, from) {
    this.getDataTableDetails();
    }
  },
  methods: {
    async getDataTableDetails() {
        this.$data.isFetchAndAdding = true;
        await this.getFirestoreData();
        console.log("this.dataTableDetails",this.dataTableDetails);
        //Test the Json Schema 
        const ajv = new Ajv({ allErrors: true });
        //Get Schema to apply
        const testJson = ajv.compile(JSON.parse(this.schemas["gbq-table-preview-table"].schema));
        //Test Json Schema
        this.jsonIsValid = testJson(this.dataTableDetails);
        this.jsonObjectErrors = testJson.errors;
        if (this.jsonIsValid) {
            this.dataTableOverviewRows = Object.values(this.dataTableDetails.json);
            const dataTableOverviewColumnsKey = Object.keys(this.dataTableOverviewRows[0]);
            this.dataTableOverviewColumns = dataTableOverviewColumnsKey.map(function(data, index) {
                return {
                    label: data,
                    field: data
                }
            });
            this.schemaRows = Object.values(this.dataTableDetails.schema.fields);
        }
        this.$data.isFetchAndAdding = false;
    },
    async getFirestoreData() {
      this.$data.fetchAndAddStatus = "Loading";
      this.$data.moreToFetchAndAdd = false;
      try {
        await store.dispatch("dataTableDetails/closeDBChannel", {
          clearModule: true
        });
        await store.dispatch('dataTableDetails/fetchAndAdd', {projectId: this.projectId, datasetId: this.datasetId, tableId: this.tableId, limit: 0})
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
      dataTableDetails: state => state.dataTableDetails.data,
      schemas: state => state.schemas.data
    }),
    tableId () {
        return this.$route.params.tableId ;
    },
    datasetId () {
      return this.$route.params.datasetId ;
    },
    projectId () {
      return this.$route.params.projectId ;
    },
    numBytesFormated () {
        const numBytesConverted = convert(Number(this.dataTableDetails.numBytes)).from('b').toBest({ cutOffNumber: 1 });
        const numBytesFormated = "".concat(numeral(numBytesConverted.val).format("10,000.00")," ",numBytesConverted.unit)
        return numBytesFormated;
    },
    numRowsFormated () {
        return numeral(this.dataTableDetails.numRows).format("10,000");
    },
    isTimePartitioned () {
        return this.dataTableDetails.timePartitioning !== undefined
    }
  }
};

</script>

<style></style>
