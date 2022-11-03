<template>
  <v-row dense v-bind:class="{ 'justify-center': isSideBar }" id="create_space">
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-if="iconsize" x-small color="#fff" v-bind="attrs" v-on="on" >
          <v-icon right dark class="mr-1"> mdi-plus </v-icon>
          New Space
        </v-btn>
        <v-btn v-else dark v-bind="attrs" v-on="on" class="ml-auto">
          + New Space
        </v-btn>
      </template>

      <v-stepper v-model="e6" vertical id="create-space-stepper">
        <v-stepper-step :complete="e6 > 1" step="1" @click="e6 = 1" color="#49d9a0">
          Create Space
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="lighten-1" class="mb-12" height="200px">
            <v-text-field
              v-model="name"
              label="Legal first name*"
              required
            ></v-text-field>
                <v-textarea
                  v-model="desc"
                  name="input-7-1"
                  label="Default style"
                  value=""
                  hint="Your project description"
                ></v-textarea>
          </v-card>
          <v-btn @click="e6 = 2" class="white--text theme-btn"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 2" step="2" @click="e6 = 2" color="#49d9a0">
          Project Details
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card color="lighten-1" class="mb-12 pt-6" height="200px">
            <v-row>
              <v-col cols="4"><span class="subtitle-3">Give your space a Color</span></v-col>
              <v-col cols="4"><span class="subtitle-3">Assign an Image to your space</span></v-col>
              <v-col cols="4"><span class="subtitle-3">OR Set a premade avatar</span></v-col>
              </v-row>
            <v-row justify="space-around" align="center" class="px-6">
              
              <v-col cols="4" 
                ><v-color-picker v-model="color" hide-canvas flat></v-color-picker
              ></v-col>
              <v-col cols="4" class="" 
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
              <v-col cols="4" class="preavatar-col"
                ><v-select
                  v-model="avatar"
                  :items="items"
                  label="Standard"
                  :messages="['Choose Project Avatar']"
                >
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
          </v-card>
          <v-btn @click="e6 = 3" class="white--text theme-btn"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step :complete="e6 > 3" step="3" @click="e6 = 3" color="#49d9a0">
          Privacy
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card color="lighten-1" class="mb-12" height="">
            <v-item-group
              v-model="privacy"
              mandatory
              @change="handleChange($event)"
            >
              <v-container>
                <v-row>
                  <v-col cols="6" md="6">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        :color="active ? '#49d9a0' : ''"
                        class="d-flex flex-column align-center pt-6"
                        height="180"
                        @click="toggle"
                      >
                        <v-icon x-large :class="active ? 'white--text' : ''">mdi-account-group-outline</v-icon>
                        <v-card-title :class="active ? 'white--text' : ''">Public</v-card-title>
                        <v-card-text class="text-center" :class="active ? 'white--text' : ''">
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
                  <v-col cols="6" md="6">
                    <v-item v-slot="{ active, toggle }">
                      <v-card
                        :color="active ? '#49d9a0' : ''"
                        class="d-flex flex-column align-center pt-6"
                        height="180"
                        @click="toggle"
                      >
                        <v-icon class="text-center" x-large :class="active ? 'white--text' : ''"
                          >mdi-lock-outline</v-icon
                        >
                        <v-card-title :class="active ? 'white--text' : ''">Private</v-card-title>
                        <v-card-text class="text-center" :class="active ? 'white--text' : ''">
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
          </v-card>
          <v-btn @click="e6 = 4" class="white--text theme-btn"> Continue </v-btn>
          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-step step="4" @click="e6 = 4" color="#49d9a0">
          View setup instructions
        </v-stepper-step>
        <v-stepper-content step="4">
          <v-card color="lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn @click="createSpace" class="white--text theme-btn"> Create </v-btn>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
          <!-- <v-btn
        color="primary"
        @click="e6 = 1"
      >
        Continue
      </v-btn>
      <v-btn text>
        Cancel
      </v-btn> -->
        </v-stepper-content>
      </v-stepper>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["iconsize", "isSideBar"],
  data: () => ({
    name: "",
    color: "",
    image: [],
    avatar: "",
    desc: "",
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
    e6: 1,
  }),
  methods: {
    handleChange(e) {
      console.log(this.privacy);
    },
    createSpace() {
      this.$store.dispatch("addSpace", {
        name: this.name,
        color: this.color,
        avatar:
          typeof this.avatar.icon === "undefined" ? "empty" : this.avatar.icon,
        desc: this.desc,
        privacy: this.privacy,
        space: this.$route.params.id,
      })
      .then(() => {
          this.$store.dispatch("getProjects", this.$route.params.spaceId);
          this.$emit('add-space', {
            name: this.name,
            // color: this.color,
            description: this.desc,
            privacy: this.privacy,
            space: this.$route.params.id,
          })
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Space Created",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Space Not Created",
          });
        });
      
    },
  },
};
</script>
<style lang="scss">
@import '../../../sass/_variables.scss';

.avatar-col{
  width:90%;
  height:154px;
  border-radius: 4px;
  contain: content;
  background-color: #fff;
  border-color: #fff;
  color: rgba(0,0,0,.87);
  box-shadow: 0 0 0 0 rgba(0,0,0,.2),0 0 0 0 rgba(0,0,0,.14),0 0 0 0 rgba(0,0,0,.12);
  max-width: 300px;
}

#create_space button, #create-space-stepper .theme-btn{
  background-color: $lantern;
}

.subtitle-3{
  font-size:13px;
}

</style>