<template>
  <v-treeview
    v-model="tree"
    :items="items"
    :load-children="getTables"
    active-class="primary--text"
    class="grey lighten-5"
    item-key="treekey"
    item-text="name"
    open-on-click
    :open.sync = "open"
    :active.sync = "active"
    activatable
    return-object
  >
    <!-- <template v-slot:prepend="{ item, open }">
      <v-icon  v-if="!item.file">
        {{ open ? 'folder_open' : 'folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template> -->
  </v-treeview>
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
    data: () => ({
        fetchAndAddStatus : "",
        moreToFetchAndAdd : false,
        isFetchAndAdding : false,
      open: [],
      tree: [],
      active: [],
      tree: [],
      items: [],
      datatables: []
    }),
    async mounted() {
        await this.dataModelsFormated();
    },
    methods: {
        async getDataModel() {
        this.$data.fetchAndAddStatus = "Loading";
        this.$data.moreToFetchAndAdd = false;
        this.$data.isFetchAndAdding = true;
        try {
            store.dispatch("dataModels/closeDBChannel", {
            clearModule: true
            });
            let fetchResult = await store.dispatch(
            "dataModels/fetchAndAdd",
            { limit: 0 }
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
        async getTables (item) {
            console.log("item : ", item)
            // fetch Tables in the Dataset from Firestore
            try {
                store.dispatch("dataTables/closeDBChannel", { clearModule: true });
                //firestorePath: "gbq-table-preview/{projectId}/{datasetId}",
                let fetchResult = await store.dispatch(
                    "dataTables/fetchAndAdd", {projectId: item.projectId, datasetId: item.id, limit: 0},
                );
                if (fetchResult.done === true) {
                this.$data.moreToFetchAndAdd = false;
                } else {
                this.$data.moreToFetchAndAdd = true;
                }
                this.$data.fetchAndAddStatus = "Success";
                this.$data.isFetchAndAdding = false;
            } catch (e) {
                this.$data.fetchAndAddStatus = "Error";
                this.$data.isFetchAndAdding = false;
            }
            const dataTablesArray = Object.values(this.dataTables);
            var dataTablesFormated = dataTablesArray.map(function(data, index) {
                console.log("data",data);
                return {
                    name: data.id,
                    treekey: data.id
                }
            });
            const dataTablesArrayFormated = _.merge(dataTablesArray, dataTablesFormated);
            console.log("active : ",this.active);
            return item.children.push(...dataTablesArrayFormated);
            //this.datatables = dataTablesArrayFormated;
        },
        async dataModelsFormated() {
            await this.getDataModel();
            const dataArray = Object.values(this.dataModels);
            var dataFormated = dataArray.map(function(data, index) {
                const projectId = data.id;
                // format the sub_collections array to by compatible with the treeview componenent
                let sub_collections_formated = [];
                data.sub_collections.forEach(function(dataset) {
                    // add name, project id (used to fetch dataTable Later), type (to select the icon in the treeview), empty children to trigger the fetchTables function when necessary
                    sub_collections_formated.push({treekey:dataset, name:dataset, id:dataset, projectId:projectId , type:"dataset", children:[]});
                });
                return {
                children: sub_collections_formated,
                name: data.id,
                treekey: data.id
                };
            });
            const dataArrayFormated = _.merge(dataArray, dataFormated);
            this.items = dataArrayFormated;
        }
    },
    computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      dataModels: state => state.dataModels.data,
      dataTables: state => state.dataTables.data
    })
    }
  }

</script>

<style>

/* https://stackoverflow.com/questions/54119491/vuetify-treeview-cant-break-text-using-css/54119821#54119821 */
/* https://github.com/vuetifyjs/vuetify/issues/7177 */
    .v-treeview-node__label {
    flex-shrink: 1;
    word-break: break-all;
    font-size: 14px;
    }
    .v-treeview-node__root {
    height: auto;
    }
    .v-treeview-node--leaf {
        margin-left: 25px;
    }

</style>
