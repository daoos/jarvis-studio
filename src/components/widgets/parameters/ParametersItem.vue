<template>
  <v-layout row>
    <v-flex xs2>
      <span class="subheading">{{ paramItem.label }}:</span>
    </v-flex>
    <v-flex xs4>
      <span class="subheading font-weight-bold">{{ paramItem.value }}</span>
    </v-flex>
    <v-flex xs6>
      <v-card flat> </v-card>
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
