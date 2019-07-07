<template>
  <v-flex xs5>
    <v-treeview
      :active.sync="active"
      :items="items"
      :load-children="fetchTables"
      :open.sync="open"
      activatable
      active-class="primary--text"
      class="transparent"
      open-on-click
      transition
    >
      <template v-slot:prepend="{ item, active }">
        <v-icon v-if="!item.children" :color="active ? 'primary' : ''">
          table_chart
        </v-icon>
      </template>
    </v-treeview>
  </v-flex>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import store from "@/store/index";
import moment from "moment";
import _ from "lodash";
import Util from "@/util";

export default {
  data: () => ({
    fetchAndAddStatus: "",
    moreToFetchAndAdd: false,
    isFetchAndAdding: false,
    active: [],
    open: [],
    items: [{ id: "Loading", name: "Loading" }]
  }),

  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user,
      settings: state => state.settings,
      dataModels: state => state.dataModels.data
    })
  },

  watch: {
    active: function(newActive, oldActive) {
      if (!this.active.length) return undefined;
      const id = this.active[0];
      const projectId = id.split("/")[0];
      const datasetId = id.split("/")[1];
      const tableId = id.split("/")[2];
      this.$router.push({
        name: "DataTableDetails",
        params: { projectId: projectId, datasetId: datasetId, tableId: tableId }
      });
    }
  },
  async mounted() {
    await this.getDataModel();
  },
  methods: {
    async getDataModel() {
      return this.$store
        .dispatch("dataModels/fetchAndAdd", { limit: 0 })
        .then(fetchResult => {
          if (fetchResult.done === true) {
          }
          const dataModelsArray = Object.values(this.dataModels);
          var dataModelsFormated = dataModelsArray.map(function(data, index) {
            const projectId = data.id;
            // format the sub_collections array to by compatible with the treeview componenent
            let sub_collections_formated = [];
            data.sub_collections.forEach(function(dataset) {
              // add name, project id (used to fetch dataTable Later), type (to select the icon in the treeview), empty children to trigger the fetchTables function when necessary
              let id = projectId.concat("/", dataset);
              sub_collections_formated.push({
                id: id,
                name: dataset,
                projectId: projectId,
                type: "dataset",
                children: []
              });
            });
            return {
              name: data.id,
              id: data.id,
              type: "Project",
              children: sub_collections_formated
            };
          });
          this.items = dataModelsFormated;
        })
        .catch(console.error);
    },
    async fetchTables(item) {
      store.dispatch("dataTables/closeDBChannel", { clearModule: true });
      return this.$store
        .dispatch("dataTables/fetch", {
          projectId: item.projectId,
          datasetId: item.name,
          limit: 0
        })
        .then(querySnapshot => {
          if (querySnapshot.done === true) {
          }
          var dataTablesFormated = querySnapshot.docs.map(function(
            data,
            index
          ) {
            return {
              id: item.projectId.concat("/", item.name, "/", data.id),
              name: data.id,
              type: "table"
            };
          });
          item.children.push(...dataTablesFormated);
        })
        .catch(console.error);
    }
  }
};
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
