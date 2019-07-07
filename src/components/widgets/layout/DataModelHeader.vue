<template>
  <v-toolbar dense tabs color="primary" dark>
    <v-toolbar-title class="pl-2 display-1">{{ headerTitle }}</v-toolbar-title>
    <template v-slot:extension>
      <v-breadcrumbs :items="tableItems" dark large>
        <template v-slot:divider>
          <v-icon>chevron_right</v-icon>
        </template>
      </v-breadcrumbs>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  components: {},
  props: {
    tableItems: Array,
    headerTitle: String
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.disabled
  color: black
  pointer-events: none
</style>
