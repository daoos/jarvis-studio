<template>
  <div>
    <DataManagementHeader
      :tabsItems="tabsItems"
      :headerTitle="headerTitle"
    ></DataManagementHeader>
    <TablesToTablesConf />
  </div>
</template>

<script>
import TablesToTablesConf from "../components/TablesToTablesConf";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    TablesToTablesConf,
    DataManagementHeader
  },
  data() {
    return {
      headerTitle: "Tables to Tables",
      tabsItems: [
        { id: 1, title: "Runs", link: "/tablestotables/runs" },
        { id: 2, title: "Configurations", link: "/tablestotables/confs" },
        { id: 3, title: "Documentation", link: "" }
      ]
    };
  }
};
</script>
