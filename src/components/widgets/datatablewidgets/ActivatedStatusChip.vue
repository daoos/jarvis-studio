<template>
  <v-chip
    :color="colorActivatedConfStatus"
    text-color="white"
    small
    class="text-lowercase"
    >{{ labelActivatedConfStatus }}</v-chip
  >
</template>

<script>
import Util from "@/util";

export default {
  components: {},
  props: {
    activatedConfStatus: Boolean
  },
  data: () => ({}),
  created() {},
  methods: {},
  computed: {
    colorActivatedConfStatus() {
      return Util.getActiveConfColor(this.activatedConfStatus);
    },
    labelActivatedConfStatus() {
      let label = "";
      switch (this.activatedConfStatus) {
        case true:
          label = "Activated";
          break;
        case false:
          label = "Disabled";
          break;
        default:
          label = "Not set";
          break;
      }
      return label;
    }
  }
};
</script>
