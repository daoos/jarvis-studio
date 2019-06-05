<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="jarvis-console">
        <v-toolbar flat dark  app fixed :clipped-left="$vuetify.breakpoint.lgAndUp">
          <v-toolbar-side-icon
            @click.stop="drawer = !drawer"
          ></v-toolbar-side-icon>
          <v-toolbar-title style="width: 240px" class="ml-0 pl-3">
            <span class="hidden-sm-and-down">JARVIS</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            flat
            solo-inverted
            hide-details
            prepend-inner-icon="search"
            label="Search"
            class="hidden-sm-and-down"
          ></v-text-field>
          <v-btn icon>
            <v-icon>apps</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>notifications</v-icon>
          </v-btn>
          <v-menu
            offset-y
            origin="center center"
            :nudge-bottom="10"
            transition="scale-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn icon large v-on="on">
                <v-avatar size="32px" v-if="isAuthenticated">
                  <img :src="user.photoURL" :alt="user.displayName" />
                </v-avatar>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in userSettingsItems"
                :key="index"
                :href="item.href"
                @click="item.click"
                :disabled="item.disabled"
                :target="item.target"
                rel="noopener"
              >
                <v-list-tile-action v-if="item.icon">
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-btn icon @click="handleFullScreen()">
            <v-icon>fullscreen</v-icon>
          </v-btn>
        </v-toolbar>
        <v-navigation-drawer
          v-model="drawer"
          :clipped="$vuetify.breakpoint.lgAndUp"
          fixed
          app
          floating
          class="transparent pl-4"
        >
          <v-list dense>
            <v-subheader class="mt-4 subheading">Data Models</v-subheader>
            <DatamodelTreeview></DatamodelTreeview>
            <v-divider class="transparent"></v-divider>
            <v-subheader class="mt-4 subheading">Configurations</v-subheader>
            <v-list-tile :to="{ path: '/conf/gcstogcs' }"> 
              <v-list-tile-action>
                <v-icon>swap_horiz</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GCS to GCS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/conf/gcstogbq' }">
              <v-list-tile-action>
                <v-icon>vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GCS to GBQ</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile :to="{ path: '/conf/gbqtogbq' }">
              <v-list-tile-action>
                <v-icon>device_hub</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GBQ to GBQ</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile :to="{ path: '/conf/gbqtogcs' }">
              <v-list-tile-action>
                <v-icon>file_copy</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GBQ to GCS</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
             <v-list-tile :to="{ path: '/conf/vmlauncher' }">
              <v-list-tile-action>
                <v-icon>dns</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>VM Launcher</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/conf/workflow' }">
              <v-list-tile-action>
                <v-icon>power</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Workflow</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider class="transparent"></v-divider>
            <v-subheader class="mt-4 subheading" >Runs</v-subheader>
            <v-list-tile :to="{ path: '/runs/gcstogcs' }">
              <v-list-tile-action>
                <v-icon>swap_horiz</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GCS to GCS Runs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/runs/gcstogbq' }">
              <v-list-tile-action>
                <v-icon>vertical_split</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GCS to GBQ Runs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/runs/gbqtogbq' }">
              <v-list-tile-action>
                <v-icon>device_hub</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GBQ to GBQ Runs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/runs/gbqtogcs' }">
              <v-list-tile-action>
                <v-icon>file_copy</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>GBQ to GCS Runs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/runs/vmlauncher' }">
              <v-list-tile-action>
                <v-icon>dns</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>VM Launcher Runs</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/status/workflow' }">
              <v-list-tile-action>
                <v-icon>power</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Workflow Status</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider class="transparent"></v-divider>
            <v-subheader class="mt-4 subheading">Settings</v-subheader>
            <v-list-tile :to="{ path: '/settings/accounts' }">
              <v-list-tile-action>
                <v-icon>business</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Accounts</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile :to="{ path: '/settings/gcpcloudfunctions' }">
              <v-list-tile-action>
                <v-icon>settings_ethernet</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title
                  >Clound Function Configurations</v-list-tile-title
                >
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-content>
          <router-view></router-view>
        </v-content>
      </v-app>
    </template>
    <template v-else>
      <transition>
        <keep-alive>
          <router-view :key="$route.fullpath"></router-view>
        </keep-alive>
      </transition>
    </template>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Util from "@/util";
import DatamodelTreeview from "./components/widgets/datamodel/DatamodelTreeview";


export default {
  name: "App",
  components: {
      DatamodelTreeview
  },
  data: () => ({
    drawer: null
  }),
  computed: {
    ...mapState({
      isAuthenticated: state => state.user.isAuthenticated,
      user: state => state.user.user
    }),
    userSettingsItems() {
      return [
        {
          title: "Settings",
          href: "#",
          icon: "account_circle",
          click: e => {
            this.$store.dispatch("userSignOut");
          }
        },
        {
          title: "Logout",
          href: "#",
          icon: "exit_to_app",
          click: e => {
            this.$store.dispatch("userSignOut");
          }
        }
      ];
    }
  },
  methods: {
    handleFullScreen() {
      Util.toggleFullScreen();
    }
  }
};
</script>
