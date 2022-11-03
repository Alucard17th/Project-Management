<template>
  <div id="space_archive">
    <div class="d-flex align-center">
      <v-icon class="mr-4">mdi-toy-brick</v-icon>
      <h1>Spaces</h1>
      <add-space @add-space="addSpace"></add-space>
    </div>

    <!-- <v-btn @click="switchGridToList">switch</v-btn> -->
    <v-row dense align="stretch">
      <v-col
        :cols="GorL"
        v-for="element in allSpaces"
        :key="element.id"
        class="item"
      >
        <v-card :color="element.color" hover light outlined>
          <v-card-text>
            <router-link
              :to="{
                name: 'projects',
                params: { id: element.id, spaceName: element.name },
              }"
              ><h2 class="text-button">
                <v-icon class="mr-4">mdi-toy-brick-outline</v-icon
                >{{ element.name }}
              </h2></router-link
            >
            <p class="text-body-2">{{ element.description }}</p>
            <v-chip class="ma-2" color="#FF7956" text-color="white">
              Sales team
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <edit-space
              v-if="element.can_edit"
              :currentSpace="element"
              @update-space="updateSpace"
            ></edit-space>
          </v-card-actions>
        </v-card>
      </v-col>
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
      GridOrList: false,
      GorL: 4,
    };
  },
  computed: {
    allSpaces() {
      return this.$store.getters.allSpaces;
    },
  },
  mounted() {
    this.$store.dispatch("getSpaces");
    this.$store.dispatch("getCurrentUser");
  },
  methods: {
    addSpace(eventData) {
      this.allSpaces.push(eventData);
    },
    updateSpace(eventData) {
      this.allSpaces.find((space, i) => {
        if (space.id == eventData) {
          this.allSpaces.splice(i, 1);
          return true; // stop searching
        }
      });
    },
    editRecord(project) {},
    switchGridToList() {
      if (this.GridOrList) {
        this.GridOrList = !this.GridOrList;
        this.GorL = 3;
      } else {
        this.GridOrList = !this.GridOrList;
        this.GorL = 12;
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
#space_archive div div.v-card__text > a {
  color: $lantern;
  text-decoration: none;
}
</style>