<template>
  <div>
    <DataManagementHeader
      :tabsItems="tabsItems"
      :headerTitle="headerTitle"
    ></DataManagementHeader>
    <GbqToGbqConfs />
  </div>
</template>

<script>
import GbqToGbqConfs from "../components/GbqToGbqConfs";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    GbqToGbqConfs,
    DataManagementHeader
  },
  data() {
    return {
      headerTitle: "Tables to Tables",
      tabsItems: [
        { id: 1, title: "Runs", link: "/runs/gbqtogbq" },
        { id: 2, title: "Configurations", link: "/conf/gbqtogbq" },
        { id: 3, title: "Documentation", link: "" }
      ]
    };
  }
};
</script>
