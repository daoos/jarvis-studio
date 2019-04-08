<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app id="jarvis-console" dark>
        <v-toolbar
          app
          fixed
          :clipped-left="$vuetify.breakpoint.lgAndUp"
        >
          <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
          <v-btn icon large>
            <v-avatar size="32px" tile>
              <img
                src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                alt="Vuetify"
              >
            </v-avatar>
          </v-btn>
        </v-toolbar>
        <v-navigation-drawer
          v-model="drawer"
          :clipped="$vuetify.breakpoint.lgAndUp"
          fixed
          app
        >
          <v-list dense>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>dashboard</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Dashboard</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="">
              <v-list-tile-action>
                <v-icon>settings</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>Settings</v-list-tile-title>
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
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data () {
    return {
      drawer: null
    }
  }
}
</script>