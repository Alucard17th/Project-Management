<template>
  <div id="teams_archive">
    <div class="d-flex">
      <h1>Teams</h1>
      <add-team></add-team>
    </div>
    <v-row dense align="stretch">
      <v-col
        cols="6"
        v-for="element in allTeams"
        :key="element.id"
        class="item"
      >
        <v-card :color="element.color">
          <v-card-text>
            <div class="card-header d-flex justify-space-between">
              <router-link
                :to="{ name: 'team', params: { id: element.id, team:element } }"
                ><h2 class="text-button">{{ element.name }}</h2></router-link
              >
              <edit-team></edit-team>
            </div>
            <p color="49d9a0">{{ element.description }}</p>
            <p color="49d9a0">
              A sales team is the department responsible for meeting the sales
              goals of an organization. Led by the sales manager, this
              department consists of sales representatives, sales specialists,
              and customer service representatives who work in tandem to meet
              daily, monthly, quarterly, and annual sales goals.
            </p>
            <v-row>
              <!-- TEAM MEMBERS -->
              <v-col cols="6">
                <v-slide-group v-model="model" multiple show-arrows width="120">
                  <v-slide-item
                    v-for="n in 20"
                    :key="n"
                    v-slot="{ active, toggle }"
                  >
                    <v-avatar
                      content="user name"
                      v-tippy="{ placement: 'bottom', arrow: true }"
                      class="ma-4"
                      color="green"
                      size="48"
                      @click="toggle"
                    >
                    <img
                    alt="Avatar"
                    src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                  >
                      <v-row
                        class="fill-height"
                        align="center"
                        justify="center"
                      >
                        <v-scale-transition>
                          <v-icon
                            v-if="active"
                            color="white"
                            size="48"
                            v-text="'mdi-close-circle-outline'"
                          >
                          </v-icon>
                        </v-scale-transition>
                      </v-row>
                    </v-avatar>
                  </v-slide-item>
                </v-slide-group>
              </v-col>

              <!-- TEAM PROJECT -->
              <v-col cols="6">
                <v-list subheader two-line>
                  <v-subheader inset>Folders</v-subheader>

                  <v-list-item v-for="folder in folders" :key="folder.title">
                    <v-list-item-avatar>
                      <v-icon class="grey lighten-1" dark> mdi-folder </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title
                        v-text="folder.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="folder.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="grey lighten-1">mdi-information</v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-card-text>

          <v-btn @click="seeTeamFunction(element.id)"></v-btn>
          <v-card-text v-if="seeTeam == element.id">
            <v-item-group multiple class="pa-0">
              <v-container>
                <v-row>
                  <v-col v-for="n in 8" :key="n" cols="6" md="6">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        class="mx-auto"
                        max-width="344"
                        outlined
                        @click="toggle"
                        :color="active ? '#49d9a0' : ''"
                      >
                        <v-list-item three-line>
                          <v-list-item-content>
                            <div class="text-overline mb-4">OVERLINE</div>
                            <v-list-item-title class="text-h5 mb-1">
                              Headline 5
                            </v-list-item-title>
                            <v-list-item-subtitle
                              >Greyhound divisely hello coldly
                              fonwderfully</v-list-item-subtitle
                            >
                          </v-list-item-content>

                          <v-list-item-avatar
                            tile
                            size="80"
                            color="grey"
                          ></v-list-item-avatar>
                        </v-list-item>
                        <v-scroll-y-transition> </v-scroll-y-transition>

                        <v-card-actions>
                          <v-btn outlined rounded text> Button </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense align="stretch">
      <v-col cols="12" class="item"> </v-col>
    </v-row>

    <v-row>
      <v-col>
        <ConfirmDlg ref="confirm" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vuex from "vuex";
import ConfirmDlg from "@Component/tasks/confirmationDialog.vue";
export default {
  components: {
    ConfirmDlg,
  },
  data() {
    return {
      name: "",
      seeTeam: 0,
    };
  },
  created() {
    this.$store.dispatch("getTeams");
    
  },
  computed: {
    allTeams() {
      return this.$store.getters.getAllTeams;
    },
  },
  mounted() {},
  methods: {
    onEnter() {
      // this.$store.dispatch("addProject", this.name);
    },
    filterProjects() {
      // let fpro = this.$store.getters.filterProjectByName;
    },
    editRecord(project) {},
    seeTeamFunction(index) {
      if (this.seeTeam == index) {
        this.seeTeam = 0;
      } else {
        this.seeTeam = index;
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../sass/_variables.scss";
.show-btns {
  color: rgb(51, 45, 180) !important;
}

#teams_archive div.v-card__text > a {
  color: $lantern;
  text-decoration: none;
}

#teams_archive div.v-card__text > div > div.v-slide-group__wrapper span > span {
  // inset: auto auto calc(100% - 12px) calc(100% - 22px) !important;
}
.statut-avatar {
  right: 0px !important;
}
</style>
