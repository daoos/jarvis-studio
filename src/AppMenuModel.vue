<template>
  <div id="appRoot">
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="drawer.clipped"
      :fixed="drawer.fixed"
      :permanent="drawer.permanent"
      :mini-variant="drawer.mini"
      v-model="drawer.open"
      app
      dark
      class="blue-grey darken-4"
    >
      <v-list>
        <v-list-tile @click="toggleMiniDrawer">
          <v-list-tile-action><v-icon>aspect_ratio</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Mini Drawer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-divider></v-divider>
        
        <v-list-tile @click="">
          <v-list-tile-action><v-icon>dashboard</v-icon></v-list-tile-action>
          <v-list-tile-content><v-list-tile-title>Dashboard</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>
    
    <v-toolbar
      app
      :fixed="toolbar.fixed"
      :clipped-left="toolbar.clippedLeft"
    >
      <v-toolbar-side-icon v-if="!$vuetify.breakpoint.lgAndUp"
        @click.stop="toggleDrawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>Vuetify Drawer Example</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <v-flex shrink>
            <h2>Vuetify Drawer example</h2>
            <p>Showing how to set the navigation drawer into different positions and styles</p>
            <p>This took me a hour to comprehend properly, so this pen may save others some time</p>
            <p>As always, if you can do it better, then please fork it and let me know</p>
            <v-tooltip right>
              <v-btn
                icon
                large
                :href="source"
                target="_blank"
                slot="activator"
              >
                <v-icon large>code</v-icon>
              </v-btn>
              <span>Source</span>
            </v-tooltip>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer app :fixed="footer.fixed" :clipped-left="footer.clippedLeft">
      <span class="caption mx-3">&copy; 2018, MIT LICENSE - Free to use and learn from</span>
    </v-footer>
  </v-app>
</div>
</template>
<script>
import { mapState } from "vuex";
import Util from "@/util";
import DatamodelTreeview from "./components/widgets/datamodel/DatamodelTreeview";


export default {
  name: "App",
 data: () => ({
    drawer: {
      // sets the open status of the drawer
      open: true,
      // sets if the drawer is shown above (false) or below (true) the toolbar
      clipped: false,
      // sets if the drawer is CSS positioned as 'fixed'
      fixed: true,
      // sets if the drawer remains visible all the time (true) or not (false)
      permanent: true,
      // sets the drawer to the mini variant, showing only icons, of itself (true) 
      // or showing the full drawer (false)
      mini: false,
      //A temporary drawer sits above its application and uses a scrim (overlay) 
      //to darken the background
      temporary: false,
    },
    toolbar: {
      //
      fixed: true,
      // sets if the toolbar contents is leaving space for drawer (false) or not (true)
      clippedLeft: false
    },
    footer: {
      // sets the CSS position of the footer
      fixed: true,
      // sets if the footer is full width (true) or gives space to the drawer (false)
      clippedLeft: true
    }
  }),
  mounted() {
    this.makeDrawerResponsive ()
  },
  computed: {
  },
  watch: {
    "$vuetify.breakpoint.lgAndUp" (to, from) {
      //adjust the responsive drawer
      this.makeDrawerResponsive ();
    }
  },
  methods: {
    // make drawer esponsive
    makeDrawerResponsive () {
      if (!this.$vuetify.breakpoint.lgAndUp) {
        this.drawer.open = false;
        this.drawer.permanent = false;
        this.drawer.temporary = true;
        this.drawer.clipped= false,
        this.toolbar.clippedLeft = true;
      } else {
        this.drawer.open = true;
        this.drawer.permanent = true;
        this.drawer.temporary = false;
        this.drawer.clipped= false,
        this.toolbar.clippedLeft = false
      }
    },
    // changes the drawer to permanent
    makeDrawerPermanent () {
      this.drawer.permanent = true
      // set the clipped state of the drawer and toolbar
      this.drawer.clipped = false
      this.toolbar.clippedLeft = false
    },
    // toggles the drawer variant (mini/full)
    toggleMiniDrawer () {
      this.drawer.mini = !this.drawer.mini
    },
    // toggles the drawer type (permanent vs temporary) or shows/hides the drawer
    toggleDrawer () {
      this.drawer.open = !this.drawer.open
    }
  }
};
</script>
