<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <HeaderConfView
          :viewId="confId"
          :activatedConfStatus="conf.activated"
          :activeHeader="activeHeader"
        />
        <ParametersList
          groupTitle="Context"
          description="Context of the Storage to Storage configuration"
          :paramItems="paramItems"
        />
        <ParametersTable
          tableTitle="Source Storage"
          description="Source Storage of the files to copy"
          :columns="sourceStorageColumns"
          :rows="sourceStorageRows"
          vflexLength="xs9"
          :lineNumbers="false"
          :searchOptionsEnabled="false"
        ></ParametersTable>
        <ParametersTable
          tableTitle="Destination Storage(s)"
          description="Multi destination storages for the copied files"
          :columns="destinationStorageColumns"
          :rows="destinationStorageRows"
          vflexLength="xs7"
          :lineNumbers="false"
          :searchOptionsEnabled="false"
        ></ParametersTable>
        <ParametersTable
          tableTitle="File Name Template(s)"
          description="Templates of the incomming files that should be copied to the destination storages. Do not put the date/timestamp prefix file in the template "
          :columns="fileNameTemplateColumns"
          :rows="fileNameTemplateRows"
        ></ParametersTable>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ParametersTable from "@/components/widgets/parameters/ParametersTable.vue";
import HeaderConfView from "@/components/widgets/parameters/HeaderConfView.vue";
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";
export default {
  components: {
    ParametersTable,
    HeaderConfView,
    ParametersList
  },
  props: {
    conf: undefined,
    isFetchAndAdding: {
      type: Boolean,
      default: true
    },
    activeHeader: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    expand: false,
    viewJson: false,
    fileNameTemplateColumns: [
      {
        label: "File Name Template",
        field: "filename_template"
      },
      {
        label: "File Name Description",
        field: "filename_description"
      }
    ],
    sourceStorageColumns: [
      {
        label: "Type",
        field: "source_type",
        width: "100px"
      },
      {
        label: "Storage ID",
        field: "source_storage_id",
        width: "200px"
      },
      {
        label: "Source Folder",
        field: "source_input_folder",
        width: "200px"
      },
      {
        label: "Archive Folder",
        field: "source_archive_folder",
        width: "200px"
      }
    ],
    destinationStorageColumns: [
      {
        label: "Type",
        field: "destination_type",
        width: "100px"
      },
      {
        label: "Storage ID",
        field: "destination_storage_id",
        width: "200px"
      },
      {
        label: "Destination Folder",
        field: "destination_input_folder",
        width: "230px"
      }
    ]
  }),
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    confId() {
      //Set a Conf Id to the first destination bucket in the Array when the Id of the Conf is not present in the payload
      let getConfId = "";
      if (this.conf.id !== undefined) {
        getConfId = this.conf.id;
      } else if (this.conf.destination_bucket[0] !== undefined) {
        getConfId = this.conf.destination_bucket[0];
      } else {
        getConfId = "";
      }
      return getConfId;
    },
    fileNameTemplateRows() {
      var filename_templates_rows = this.conf.filename_templates.map(function(
        filename
      ) {
        return {
          filename_template: filename,
          filename_description: "No Description"
        };
      });
      return filename_templates_rows;
    },
    sourceStorageRows() {
      return [
        {
          source_type: "GCS",
          source_storage_id: this.conf.source_bucket,
          source_input_folder: this.conf.source_gcs_prefix,
          source_archive_folder: this.conf.source_archive_prefix
        }
      ];
    },
    destinationStorageRows() {
      //Combine the two array this.conf.destination_bucket and this.conf.destination_input_prefix into a array of json.
      //Can't use map :(
      var destinationStorageRows = [];
      for (var i = 0; i < this.conf.destination_bucket.length; i++) {
        destinationStorageRows.push({
          destination_type: "GCS",
          destination_storage_id: this.conf.destination_bucket[i],
          destination_input_folder: this.conf.destination_gcs_prefix[i]
        });
      }
      return destinationStorageRows;
    },
    paramItems() {
      return [
        { id: "account", label: "Account", value: this.conf.account },
        {
          id: "environment",
          label: "Environment",
          value: this.conf.environment
        }
      ];
    }
  }
};
</script>

<style></style>
