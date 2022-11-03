<template>
  <v-app>
    <v-navigation-drawer
      app
      floating
      v-model="drawer"
      left
      :mini-variant.sync="isHomeNavigationDrawerOpen"
    >
      <div class="minifier">
        <v-btn icon @click="toggleNavDrawer">
          <v-icon v-if="isHomeNavigationDrawerOpen"> mdi-chevron-left </v-icon>
          <v-icon v-else> mdi-chevron-right </v-icon>
        </v-btn>
      </div>
      <!-- -->
      <Side />
      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="!isHomeNavigationDrawerOpen" block> Logout </v-btn>
          <v-icon v-else block class="ml-2"> mdi-power </v-icon>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app style="background: #fff" :elevation="0">
      <!-- -->
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <h1>{{ currentUser.name }}</h1>

      <div
        v-if="
          $route.name === 'kanban' ||
          $route.name === 'table' ||
          $route.name === 'gantt'
        "
      >
        <v-sw v-if="projectID" :id="projectID"></v-sw>
      </div>

      <div class="ml-auto">
        <router-link :to="{ name: 'login' }">
          <h4>Login</h4>
        </router-link>
        <router-link :to="{ name: 'register' }">
          <h4>Register</h4>
        </router-link>
      </div>

      <div
        v-if="
          $route.name === 'kanban' ||
          $route.name === 'table' ||
          $route.name === 'gantt' ||
          $route.name === 'projects' 
        "
        class="d-flex ml-auto"
      >
      <SearchBar/>
        <add-stage class="" :projectId="projectID"></add-stage>
        <v-btn @click="myTasksOnly"><v-icon>mdi-plus</v-icon></v-btn>
        <filter-t></filter-t>
      </div>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main class="main-wrap">
      <!-- Provides the application the proper gutter -->
      <v-container
        fluid
        class="full-cont"
        style="overflow-x: auto; position: absolute"
      >
        <slot></slot>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- <v-footer app>
     
    </v-footer> -->

    <v-snackbar
      v-model="snackbar.showing"
      color="black"
      text="true"
      :left="true"
    >
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="black"
          text
          v-bind="attrs"
          @click="snackbar.showing = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
// import Nav from '../components/Nav'
import Side from "../components/Sidebar";
import SearchBar from "../components/menus/SearchBar.vue"

export default {
  components: { Side, SearchBar },
  data() {
    return {
      mini: true,
      drawer: true,
      userTasksOnly: false,
    };
  },
  computed: {
    projectID: function () {
      return this.$route.params.id;
    },
    snackbar: function () {
      return this.$store.getters.getSnackBar;
    },
    isHomeNavigationDrawerOpen: function () {
      return this.$store.getters.getNavigationDrawer;
    },
    currentUser: function () {
      return this.$store.getters.getCurrentUser;
    },
    showUserTasks: function () {
      return this.$store.getters.userTasksOnlyBool;
    },
  },
  methods: {
    toggleNavDrawer() {
      this.$store.dispatch("TOGGLE_HOME_NAVIGATION_DRAWER");
    },
    myTasksOnly() {
      // SWITCH IF SHOW USER ASSIGNED TASKS OR ALL TASKS => BOOLEAN
      this.$store.dispatch("getUserProjects");
    },
  },
};
</script>

<style lang="scss">
.minifier {
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
}
.main-wrap {
  background: #eeeeee;
}
</style>