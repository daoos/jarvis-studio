<template>
  <div>
    <DataManagementHeader
      :tabsItems="tabsItems"
      :headerTitle="headerTitle"
    ></DataManagementHeader>
    <GcsToGbqRuns />
  </div>
</template>

<script>
import GcsToGbqRuns from "../components/GcsToGbqRuns";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    GcsToGbqRuns,
    DataManagementHeader
  },
  data() {
    return {
      headerTitle: "Storage to Table",
      tabsItems: [
        { id: 1, title: "Runs", link: "/runs/gcstogbq" },
        { id: 2, title: "Configurations", link: "/conf/gcstogbq" },
        { id: 3, title: "Documentation", link: "" }
      ]
    };
  }
};
</script>
