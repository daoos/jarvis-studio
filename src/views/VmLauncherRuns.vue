<template>
  <div>
    <DataManagementHeader
      :tabsItems="tabsItems"
      :headerTitle="headerTitle"
    ></DataManagementHeader>
    <VmLauncherRuns />
  </div>
</template>

<script>
import VmLauncherRuns from "../components/VmLauncherRuns";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    VmLauncherRuns,
    DataManagementHeader
  },
  data() {
    return {
      headerTitle: "VM Launcher",
      tabsItems: [
        { id: 1, title: "Runs", link: "/runs/vmlauncher" },
        { id: 2, title: "Configurations", link: "/conf/vmlauncher" },
        { id: 3, title: "Documentation", link: "" }
      ]
    };
  }
};
</script>
