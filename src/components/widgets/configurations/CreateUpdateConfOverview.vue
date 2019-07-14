<template>
  <ParametersTable
    tableTitle="Create / Update"
    description="When and Who create / update the configuration"
    :columns="dateColumns"
    :rows="dateRows"
    vflexLength="xs12"
    :lineNumbers="false"
    :searchOptionsEnabled="false"
  />
</template>

<script>
import ParametersTable from "@/components/widgets/parameters/ParametersTable.vue";
export default {
  components: { ParametersTable },
  props: {
    updateDate: {
      type: String,
      default: "2019-01-01T00:00:00.000000"
    },
    creationDate: {
      type: String,
      default: "2019-01-01T00:00:00.000000"
    },
    updatedBy: {
      type: String,
      default: "jarvis@fashiondata.io"
    },
    createdBy: {
      type: String,
      default: "jarvis@fashiondata.io"
    }
  },
  data() {
    return {
      dateColumns: [
        {
          label: "Update Date",
          field: "updateDate",
          type: "date",
          dateInputFormat: "YYYY-MM-DDTHH:mm:ss.SSSSSS", // expects 2018-03-16
          dateOutputFormat: "YYYY-MM-DD HH:mm:ss" // outputs Mar 16th 2018
        },
        {
          label: "Updated By",
          field: "updatedBy"
        },
        {
          label: "Creation Date",
          field: "creationDate",
          type: "date",
          dateInputFormat: "YYYY-MM-DDTHH:mm:ss.SSSSSS", // expects 2018-03-16
          dateOutputFormat: "YYYY-MM-DD HH:mm:ss" // outputs Mar 16th 2018
        },
        {
          label: "Created By",
          field: "createdBy"
        }
      ]
    };
  },

  computed: {
    dateRows() {
      return [
        {
          updatedBy: this.updatedBy,
          updateDate: this.updateDate,
          creationDate: this.creationDate,
          createdBy: this.createdBy
        }
      ];
    }
  }
};
</script>

<style lang="stylus" scoped>
.disabled
  color: black
  pointer-events: none
</style>
