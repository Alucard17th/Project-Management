<template>
  <div>
    <!-- <h1>All Folders</h1> -->
    <!-- <add-project></add-project> -->
    <div class="d-flex align-center">
      <v-icon class="mr-4">mdi-folder-outline</v-icon>
      <h1>{{ currentSpaceName }}</h1>
      <add-project v-show="currentSpace.can_edit"></add-project>
    </div>
    
    <v-row dense align="stretch" id="folder_archive">
      <v-col
        cols="3"
        v-for="element in allFolders.folders"
        :key="element.id"
        class="item"
      >
        <v-card :color="element.color">
          <v-card-text>
            <router-link
              :to="{
                name: 'kanban',
                params: {
                  spaceId: currentSpaceID,
                  spaceName: currentSpaceName,
                  id: element.id,
                },
              }"
              ><h2 class="text-button">
                <v-icon class="mr-4">mdi-folder-outline</v-icon>{{ element.name }}
              </h2></router-link
            >
            <p class="text-body-2">{{ element.description }}</p>
          </v-card-text>

          <v-card-actions>
            <edit-project v-if="element.can_edit" :currentProject="element"></edit-project>
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
    };
  },
  computed: {
    allFolders() {
      this.$store.dispatch("setCurrentSpace", this.$route.params.id)
      return this.$store.getters.getCurrentSpace;
    },
    currentSpaceName() {
      return this.$route.params.spaceName;
    },
    currentSpaceID() {
      return this.$route.params.id;
    },
    currentSpace() {
      return this.$store.getters.getCurrentSpace;
    }
  },
  created() {
    this.$store.dispatch("getProjects", this.$route.params.id);
    this.$store.dispatch("getCurrentUser");
    
  },
  watch: {
    "$route.params.id": function (id) {
      this.$store.dispatch("getProjects", this.$route.params.id);
    },
  },
  methods: {
    onEnter() {
      this.$store.dispatch("addProject", this.name);
      console.log(this.name);
    },
    filterProjects() {
      let fpro = this.$store.getters.filterProjectByName;
      console.log(fpro);
    },
    editRecord(project) {},
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.show-btns {
  color: rgb(51, 45, 180) !important;
}

#folder_archive div div.v-card__text > a{
  color: $lantern;
  text-decoration: none;
}
</style>