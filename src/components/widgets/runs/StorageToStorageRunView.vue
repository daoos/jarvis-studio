<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12 offset-xs0>
        <HeaderDocView
          :viewId="runId"
          :runStatus="run.status"
          :activeHeader="activeHeader"
          viewType="run"
        />
        <ParametersList
          groupTitle="Run Details"
          description="Details of the Storage to Storage run"
          :paramItems="paramItems"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeaderDocView from "@/components/widgets/parameters/HeaderDocView.vue";
import ParametersList from "@/components/widgets/parameters/ParametersList.vue";
export default {
  components: {
    HeaderDocView,
    ParametersList
  },
  props: {
    run: {
      type: Object,
      default: undefined
    },
    runId: {
      type: String,
      default: "Run ID"
    },
    activeHeader: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({}),
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  computed: {
    paramItems() {
      return [
        { id: "account", label: "Account", value: this.run.account },
        {
          id: "environment",
          label: "Environnement",
          value: this.run.environment
        },
        {
          id: "matching_filename_template",
          label: "Filename Matched",
          value: this.run.matching_filename_template
        },
        {
          id: "triggering_file",
          label: "File Triggered",
          value: this.run.triggering_file
        },
        {
          id: "dag_id",
          label: "Configuration Type",
          value: this.run.dag_id
        },
        {
          id: "source_storage",
          label: "Source Storage",
          value: this.run.source_storage
        },
        {
          id: "job_id",
          label: "Job Id",
          value: this.run.job_id
        },
        {
          id: "dag_execution_date",
          label: "Execution Date",
          value: this.run.dag_execution_date
        },
        {
          id: "dag_run_id",
          label: "Dag Run Id",
          value: this.run.dag_run_id
        }
      ];
    }
  }
};
</script>

<style></style>
