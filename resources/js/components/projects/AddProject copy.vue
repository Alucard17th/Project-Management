<template>
  <v-row dense>
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          + Folder
        </v-btn>
      </template>

      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step editable :complete="e1 > 1" step="1">
            Create Project
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step editable :complete="e1 > 2" step="2">
            Project Details
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step editable :complete="e1 > 3" step="3">
            Privacy
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step editable step="4"> Finish </v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-img
              height="100%"
              width="100%"
              src="/images/undraw_scrum_board_re_wk7v.svg"
            ></v-img>
            <v-text-field
              v-model="name"
              label="Legal first name*"
              required
            ></v-text-field>
            <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
            <v-btn text @click="dialog = false"> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-row justify="space-around" align="center">
              <v-col cols="12">
                <v-textarea
                  v-model="desc"
                  name="input-7-1"
                  label="Default style"
                  value=""
                  hint="Hint text"
                ></v-textarea>
              </v-col>
              <v-col cols="4"
                ><v-color-picker v-model="color" flat></v-color-picker
              ></v-col>
              <v-col cols="4"
                ><v-file-input
                  v-model="image"
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  prepend-icon="mdi-camera"
                  label="Avatar"
                  :messages="['Upload Project Image']"
                ></v-file-input
              ></v-col>
              <v-col cols="1">OR</v-col>
              <v-col cols="3"
                ><v-select v-model="avatar" :items="items" label="Standard" :messages="['Choose Project Avatar']">
                  <template v-slot:selection="{ item }">
                    <v-icon>{{ item.icon }}</v-icon
                    >{{ item.name }}</template
                  >
                  <template v-slot:item="{ item }"
                    ><v-icon>{{ item.icon }}</v-icon
                    >{{ item.name }}</template
                  >
                </v-select>
              </v-col>
            </v-row>
            <v-btn color="primary" @click="e1 = 1"> Previous </v-btn>
            <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
            <v-btn text @click="dialog = false"> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="3">
            <!-- <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card> -->
            <v-img
              height="30%"
              width="30%"
              src="/images/undraw_safe_re_kiil.svg"
            ></v-img>
            <v-item-group
              v-model="privacy"
              mandatory
              @change="handleChange($event)"
            >
              <v-container>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        :color="active ? 'primary' : ''"
                        class="d-flex flex-column align-center pt-6"
                        height="200"
                        @click="toggle"
                      >
                        <v-icon x-large>mdi-account-group-outline</v-icon>
                        <v-card-title>Public</v-card-title>
                        <v-card-text class="text-center">
                          You can share this projects and all it's components
                          with others.
                        </v-card-text>
                        <v-scroll-y-transition>
                          <div
                            v-if="active"
                            class="text-h2 flex-grow-1 text-center"
                          ></div>
                        </v-scroll-y-transition>
                      </v-card>
                    </v-item>
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        :color="active ? 'primary' : ''"
                        class="d-flex flex-column align-center pt-6"
                        height="200"
                        @click="toggle"
                      >
                        <v-icon class="text-center" x-large
                          >mdi-lock-outline</v-icon
                        >
                        <v-card-title>Private</v-card-title>
                        <v-card-text class="text-center">
                          Only you can access to this project.
                        </v-card-text>
                        <v-scroll-y-transition>
                          <div
                            v-if="active"
                            class="text-h2 flex-grow-1 text-center"
                          ></div>
                        </v-scroll-y-transition>
                      </v-card>
                    </v-item>
                  </v-col>
                </v-row>
              </v-container>
            </v-item-group>
            <v-btn color="primary" @click="e1 = 4"> Continue </v-btn>
            <v-btn text @click="dialog = false"> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-content step="4">
            haych ma
            <v-btn color="primary" @click="createProject"> Create </v-btn>
            <v-btn text @click="dialog = false"> Cancel </v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    name: "",
    color: "",
    image: [],
    avatar: "",
    desc:"",
    privacy: "",
    rules: [],
    dialog: false,
    e1: 1,
    items: [
      { name: "Foo", icon: "mdi-home" },
      { name: "Bar", icon: "mdi-domain" },
      { name: "Hoo", icon: "mdi-airballoon-outline" },
      { name: "Coo", icon: "mdi-avatar" },
    ],
  }),
  methods: {
    handleChange(e) {
      console.log(this.privacy);
    },
    createProject() {
      this.$store.dispatch("addProject", {
        name: this.name,
        color: this.color,
        avatar:
          typeof this.avatar.icon === "undefined" ? "empty" : this.avatar.icon,
        desc: this.desc,
        privacy: this.privacy,
        space: this.$route.params.id
      });
    },
  },
};
</script>
<style scoped>

</style>