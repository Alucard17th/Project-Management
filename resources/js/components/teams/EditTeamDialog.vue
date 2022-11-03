<template>
  <v-row
    dense
    v-bind:class="{ 'justify-center': isSideBar }"
    id="create_space"
    class="justify-end"
  >
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn icon fab small v-bind="attrs" v-on="on">
          <v-icon> mdi-pencil </v-icon>
        </v-btn>
        <v-hover v-slot="{ hover }">
          <v-btn
            icon
            fab
            small
            @click="delRecord(task.id)"
            :class="{ 'show-btns': hover }"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-hover> -->

        <v-menu offset-y>
          <template slot="activator">
            <v-btn color="primary" icon activator>
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title><v-btn v-bind="attrs" v-on="on">Edit</v-btn></v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>Delete...</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <v-stepper v-model="e6" vertical id="create-space-stepper">
        <v-stepper-step
          :complete="e6 > 1"
          step="1"
          @click="e6 = 1"
          color="#49d9a0"
        >
          Edit Team
          <small>Summarize if needed</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card color="lighten-1" class="mb-12" height="200px">
            <v-text-field
              v-model="name"
              label="Your great team name*"
              required
            ></v-text-field>
            <v-textarea
              v-model="desc"
              name="input-7-1"
              label="A description about your fantastic team"
              value=""
              hint="Your project description"
            ></v-textarea>
          </v-card>

          <v-card color="lighten-1" class="mb-12" height="200px"></v-card>
          <v-btn @click="createSpace" class="white--text theme-btn">
            Create
          </v-btn>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
        </v-stepper-content>
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
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../sass/_variables.scss";

.avatar-col {
  width: 90%;
  height: 154px;
  border-radius: 4px;
  contain: content;
  background-color: #fff;
  border-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.14),
    0 0 0 0 rgba(0, 0, 0, 0.12);
  max-width: 300px;
}

#create_space button,
#create-space-stepper .theme-btn {
  background-color: $lantern;
}

.subtitle-3 {
  font-size: 13px;
}
</style>