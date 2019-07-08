<template>
  <v-layout row pl-5 pt-5 pr-5>
    <span class="display-1 font-weight-bold complementary--text">{{
      viewId
    }}</span>
    <v-spacer></v-spacer>
    <v-btn flat color="grey" @click="goBack()">
      Go Back
    </v-btn>
    <ActivatedStatusChip
      :smallChip="false"
      :activatedConfStatus="activatedConfStatus"
      chipTextClass="text-uppercase"
      :chipLabel="true"
    />
  </v-layout>
</template>

<script>
import ActivatedStatusChip from "@/components/widgets/datatablewidgets/ActivatedStatusChip.vue";

export default {
  components: {
    ActivatedStatusChip
  },
  data() {
    return {};
  },
  props: {
    viewId: {
      type: String,
      default: "View ID"
    },
    activatedConfStatus: {
      type: String,
      default: "Not Set"
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped></style>
