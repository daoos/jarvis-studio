<template>
  <div>
  <DataManagementHeader
    :tabsItems="tabsItems"
    :headerTitle="headerTitle"
  ></DataManagementHeader>
  <GcsToGcsConfs />
  </div>
</template>

<script>
import GcsToGcsConfs from "../components/GcsToGcsConfs";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    GcsToGcsConfs,
    DataManagementHeader
  },
  data() {
      return {
          headerTitle : "Storage to Storage",
          tabsItems: [
              {id: 1, title: 'Runs', link: '/runs/gcstogcs'},
              {id: 2, title: 'Configurations', link: '/conf/gcstogcs'},
              {id: 3, title: 'Documentation', link: ''}
          ]
      }
  }
};
</script>
