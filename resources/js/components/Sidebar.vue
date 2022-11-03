<template>
  <div id="user_sidebar">
    <v-list nav dense rounded>
      <!-- <h4>{{ $can("delete", "Post") }}</h4> -->
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="get_avatar(currentUser.avatar)"></v-img>
        </v-list-item-avatar>

        <v-list-item-title
          ><router-link :to="{ name: 'profile' }"
            >{{ currentUser.name }}</router-link
          ></v-list-item-title
        >

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>

        <v-btn icon @click.stop="toggleDrawer">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item v-if="isHomeNavigationDrawerOpen">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-text-field
        v-else
        label="Search"
        prepend-inner-icon="mdi-magnify"
      ></v-text-field>

      <v-list-item>
        <v-list-item-icon>
          <v-icon
            color="#fff"
            style="background-color: rgb(73, 217, 160); border-radius: 50%"
            >mdi-home</v-icon
          >
        </v-list-item-icon>
        <v-list-item-title
          ><router-link :to="{ name: 'dashboard' }">
            Dashboard
          </router-link></v-list-item-title
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon
            color="#fff"
            style="background-color: rgb(73, 217, 160); border-radius: 50%"
            >mdi-bell-outline</v-icon
          >
        </v-list-item-icon>
        <v-list-item-title>
          <h4>Notifications</h4>
          <!-- <router-link :to="{ name: 'projects', params: { id: 1 } }"><h4>Projects</h4></router-link> -->
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon
            color="#fff"
            style="background-color: rgb(73, 217, 160); border-radius: 50%"
            >mdi-target</v-icon
          >
        </v-list-item-icon>
        <v-list-item-title>
          <h4>Objectifs</h4>
          <!-- <router-link :to="{ name: 'spaces' }"> <h4>Spaces</h4></router-link> -->
        </v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-group :value="false" id="user_spaces">
        <template v-slot:activator>
          <v-list-item-title>
            <div @click.stop><router-link :to="{ name: 'spaces' }"> <v-icon>mdi-toy-brick-outline</v-icon>  Spaces</router-link></div>
          </v-list-item-title>
        </template>

        <v-list-item class="justify-center">
          <add-space :iconsize="iconsize" :isSideBar="true"></add-space>
        </v-list-item>

        <v-list-group
          v-for="item in spaces"
          :key="item"
          :value="false"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title nav rounded>
                <router-link 
                  :to="{
                    name: 'projects',
                    params: { id: item.id, spaceName: item.name },
                  }"
                  >{{ item.name }}</router-link
                >
              </v-list-item-title>
            </v-list-item-content>
          </template>
      
          <v-list-item v-for="folder in item.folders" :key="folder" class="d-flex ma-auto">
            <v-list-item-title>
              <router-link :to="{ name: 'kanban', params: { spaceId:item.id, spaceName:item.name, id:folder.id } }"
              >{{ folder.name }}</router-link>
            </v-list-item-title>
            <!-- <v-list-item-icon>
              <v-btn icon color="#49d9a0"><v-icon>mdi-dots-vertical</v-icon></v-btn>
            </v-list-item-icon> -->
          </v-list-item>
        </v-list-group>
      </v-list-group>
    </v-list>

    <!-- DOCUMENTS -->
    <v-list nav dense>
      <v-list-group :value="false" id="user_spaces">
        <template v-slot:activator>
          <v-list-item-title>
            <div @click.stop><router-link :to="{ name: 'documents' }"> <v-icon>mdi-clipboard-file-outline</v-icon>  Documents</router-link></div>
          </v-list-item-title>
        </template>

        <v-list-item class="justify-center">
          add new document
        </v-list-item>
      </v-list-group>
    </v-list>

    <!-- TEAMS -->
    <v-list nav dense id="teams">
      <v-list-group :value="false">
        <template v-slot:activator>
          <v-list-item-title>
            <div @click.stop><router-link :to="{ name: 'teams' }"> <v-icon>mdi-account-group-outline</v-icon>  Teams</router-link></div>
          </v-list-item-title>
        </template>

        <v-list-item class="justify-center">
          add new team
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-divider></v-divider>

    <!-- <v-footer app inset style="left:0;">
      Test footer
    </v-footer> -->
  </div>
</template>
<script>
const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  components: {
  
  },
  data: () => ({
    drawer: false,
    active: [],
    group: null,
    projects: [],
    iconsize: "x-small",
    documents: [
      {
        id: 1,
        name: "Documents :",
        children: [
          { id: 1, name: "All" },
          { id: 2, name: "Assigned to me" },
          { id: 3, name: "Shared" },
          { id: 4, name: "Private" },
        ],
      },
    ],
  }),
  mounted() {
    this.$store.dispatch("getSpaces");
    console.log("GET SPACES MOUNTED THERE : ");
    console.log(this.$ability);
  },

  computed: {
    currentUser: function () {
      return this.$store.getters.getCurrentUser;
    },
    currentSpaceName() {
      return this.$route.params.spaceName;
    },
    currentSpaceID() {
      return this.$route.params.id;
    },
    items() {
      return [
        {
          name: "Projects",
          children: this.projects,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.projects.find((user) => user.id === id);
    },
    spaces() {
      return this.$store.getters.allSpaces;
    },
    isHomeNavigationDrawerOpen: function () {
      return this.$store.getters.getNavigationDrawer;
    },
  },

  watch: {
    // "$route.params.id": function (id) {
    //   this.$store.dispatch("getProjects", this.$route.params.id);
    // },
    group() {
      this.drawer = false;
    },
  },

  methods: {
    get_avatar(avatar) {
      let photo = "images/profile/" + avatar;
      return photo;
    },
    toggleDrawer() {
      this.$store.dispatch("TOGGLE_HOME_NAVIGATION_DRAWER");
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";

.v-expansion-panels {
  background: $body-bg !important;
}
.v-expansion-panel-content__wrap {
  padding: 0 !important;
}
.v-list-item__content {
  padding: 0 !important;
}
#sidebar-list-item {
  margin-top: -28px;
}
#sidebar-list-item > div.v-list-item__content > div {
  font-size: 14px;
}

div.px-2.v-list-item.theme--light > div.v-avatar.v-list-item__avatar {
  margin-left: -8px;
}

// Spaces Tab When Inactive
div.v-list-group__header.v-list-item.v-list-item--link.theme--light > div.v-list-item__title > div > a {
  color: rgba(0,0,0,.6);
  text-decoration: none;
}
// Spaces Tab When Active
.v-list-item.v-list-item--active.v-list-item--link.theme--light > div.v-list-item__title > div > a,
div.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  background-color: $lantern;
  color: #ffffff;
}
// SPACES TAB TEXT WHEN ACTIVE
.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light > div.v-list-item__title > div > a {
  color: #ffffff;
}

// FOLDERS LINK STYLE
#user_spaces  div.v-list-group__items > div > div.v-list-item__title > a > h2,
#user_spaces  div.v-list-group__items > div > div.v-list-item__title > a 
{
  text-decoration: unset;
  font-size: 14px;
  color: rgba(0,0,0,.6);

}

// TEAMS LINK STYLE NOT ACTIVE
#teams > div > div > div.v-list-item__title > a{
  text-decoration: unset;
  color: rgba(0,0,0,.6);
}
// TEAMS LINK WHEN ACTIVE
#teams > div > .v-list-item--active > div.v-list-item__title > a{
  color: #ffffff;
  font-size: 14px;
}
#teams{
  // padding:0px;
}
#teams .v-list-group > .v-list-group--active{
  background-color:$lantern;
}
  


// Folders Name when not active
div.v-list-item__content > div > a {
  color: rgba(0,0,0,.6);
  text-decoration: none;
}

// FOLDERS WHEN ACTIVE
.v-list-group--sub-group.primary--text
  > div.v-list-group__header.v-list-item.v-list-item--active.v-list-item--link.theme--light {
  background-color: $body-bg;
  color: $lantern;
}



</style>