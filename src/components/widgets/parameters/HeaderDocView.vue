<template>
  <v-layout row pl-5 pt-4 pr-5 v-if="activeHeader">
    <span
      class="display-1 font-weight-black text-truncate complementary--text"
      >{{ viewId }}</span
    >
    <v-spacer></v-spacer>
    <v-btn flat color="grey" @click="goBack()">
      Go Back
    </v-btn>
    <ActivatedStatusChip
      v-if="viewType == 'conf'"
      :smallChip="false"
      :activatedConfStatus="activatedConfStatus"
      chipTextClass="text-uppercase"
      :chipLabel="true"
    />
    <RunStatusChip
      v-if="viewType == 'run'"
      :smallChip="false"
      :runStatus="runStatus"
      chipTextClass="text-uppercase"
      :chipLabel="true"
    />
  </v-layout>
  <v-layout row pl-5 pt-4 pr-5 v-else>
    <span class="display-1 font-weight-bold">{{ viewId }}</span>
  </v-layout>
</template>

<script>
import ActivatedStatusChip from "@/components/widgets/datatablewidgets/ActivatedStatusChip.vue";
import RunStatusChip from "@/components/widgets/datatablewidgets/RunStatusChip.vue";

export default {
  components: {
    ActivatedStatusChip,
    RunStatusChip
  },
  data() {
    return {};
  },
  props: {
    viewType: {
      type: String,
      default: "conf"
    },
    viewId: {
      type: String,
      default: "View ID"
    },
    activatedConfStatus: {
      type: Boolean,
      default: undefined
    },
    runStatus: {
      type: String,
      default: undefined
    },
    activeHeader: {
      type: Boolean,
      default: true
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
