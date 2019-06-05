<template>
<div>
  <DataManagementHeader
    :tabsItems="tabsItems"
    :headerTitle="headerTitle"
  ></DataManagementHeader>
  <GbqToGcsConfs />
</div>
</template>

<script>
import GbqToGcsConfs from "../components/GbqToGcsConfs";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    GbqToGcsConfs,
    DataManagementHeader
  },
  data() {
      return {
          headerTitle : "Table to Storage",
          tabsItems: [
              {id: 1, title: 'Runs', link: '/runs/gbqtogcs'},
              {id: 2, title: 'Configurations', link: '/conf/gbqtogcs'},
              {id: 3, title: 'Documentation', link: ''}
          ]
      }
  }
};
</script>
