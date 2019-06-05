<template>
<div>
  <DataManagementHeader
    :tabsItems="tabsItems"
    :headerTitle="headerTitle"
  ></DataManagementHeader>
  <GbqToGbqRuns />
</div>
</template>

<script>
import GbqToGbqRuns from "../components/GbqToGbqRuns";
import DataManagementHeader from "../components/widgets/layout/DataManagementHeader";

export default {
  components: {
    GbqToGbqRuns,
    DataManagementHeader
  },
  data() {
      return {
          headerTitle : "Tables to Tables",
          tabsItems: [
              {id: 1, title: 'Runs', link: '/runs/gbqtogbq'},
              {id: 2, title: 'Configurations', link: '/conf/gbqtogbq'},
              {id: 3, title: 'Documentation', link: ''}
          ]
      }
  }
};
</script>
