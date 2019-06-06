  <template>
  <v-toolbar
          dense
          tabs
          color="primary"
          dark
  >
      <v-toolbar-title class="pl-2 display-1">{{ headerTitle }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-tabs
              v-model="tabs"
              color="transparent"
              slider-color="white"
              slot="extension"
      >
          <v-tab
                  v-for="tabsItem in tabsItems"
                  :key="tabsItem.id"
                  :to="tabsItem.link"
          >
              <span class="pl-2 pr-2">{{ tabsItem.title }}</span>
          </v-tab>
      </v-tabs>
  </v-toolbar>
</template>

<script>
export default {
    components: {},
    props: {
        tabsItems: Array,
        headerTitle: String
    },
    data() {
      return {
          tabs: null
      }
  }
};
</script>

<style lang="stylus" scoped>
  .disabled
    color: black
    pointer-events: none
</style>