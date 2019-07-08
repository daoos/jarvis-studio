<template>
  <v-layout row>
    <v-flex xs3>
      <span class="subheading">{{ paramItem.label }}:</span>
    </v-flex>
    <v-flex xs9>
      <span class="subheading font-weight-bold">{{ paramItem.value }}</span>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    paramItem: {
      type: Object,
      default() {
        return { id: "account", label: "Account", value: "000021" };
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
