<template>
  <v-flex :[vflexLength]="true" :[vflexOffset]="true">
    <h2 class="black--text pb-3">
      {{ name }}
      <v-tooltip right>
        <template v-slot:activator="{ on }">
          <v-icon color="blue-grey lighten-5" dark v-on="on">info</v-icon>
        </template>
        <span>{{ description }}</span>
      </v-tooltip>
    </h2>
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :filterable="filterable"
      :search-options="searchOptions"
      styleClass="vgt-table striped condensed"
      :line-numbers="lineNumbers"
    >
      >
      <div slot="emptystate">
        No information to display
      </div>
    </vue-good-table>
  </v-flex>
</template>

<script>
// vue-good-table import the styles
import "vue-good-table/dist/vue-good-table.css";
import { VueGoodTable } from "vue-good-table";

export default {
  components: {
    VueGoodTable
  },
  data() {
    return {};
  },
  props: {
    vflexLength: {
      type: String,
      default: "xs12"
    },
    vflexOffset: {
      type: String,
      default: "offset-xs0"
    },
    name: {
      type: String,
      default: "Parameters Table Name"
    },
    description: {
      type: String,
      default: "Parameters Table Description"
    },
    columns: {
      type: Array,
      default() {
        return [
          {
            label: "Name",
            field: "name"
          },
          {
            label: "Age",
            field: "age",
            type: "number"
          },
          {
            label: "Created On",
            field: "createdAt",
            type: "date",
            dateInputFormat: "YYYY-MM-DD",
            dateOutputFormat: "MMM Do YY"
          },
          {
            label: "Percent",
            field: "score",
            type: "percentage"
          }
        ];
      }
    },
    rows: {
      type: Array,
      default() {
        return [
          {
            id: 1,
            name: "John",
            age: 20,
            createdAt: "201-10-31:9: 35 am",
            score: 0.03343
          },
          {
            id: 2,
            name: "Jane",
            age: 24,
            createdAt: "2011-10-31",
            score: 0.03343
          },
          {
            id: 3,
            name: "Susan",
            age: 16,
            createdAt: "2011-10-30",
            score: 0.03343
          }
        ];
      }
    },
    fixedHeader: {
      type: Boolean,
      default: true
    },
    lineNumbers: {
      type: Boolean,
      default: true
    },
    searchOptionsEnabled: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: true
    },
    styleClass: {
      type: String,
      default: "vgt-table striped"
    }
  },
  computed: {
    searchOptions() {
      return {
        enabled: this.searchOptionsEnabled,
        placeholder: "Search for parameters"
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
