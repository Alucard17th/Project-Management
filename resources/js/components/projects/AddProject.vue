<template>
  <v-row dense>
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <!-- <v-btn color="primary" dark v-bind="attrs" v-on="on"> + Folder </v-btn> -->
        <v-btn color="#49d9a0" v-bind="attrs" v-on="on" class="ml-auto white--text">
          + Folder
        </v-btn>
      </template>

      <v-container class="file-creation">
        <h2>Create New Folder</h2>
        <v-form>
          <v-row>
            <v-col cols="12"
              ><v-text-field
                v-model="name"
                label="Legal first name*"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="desc"
                name="input-7-1"
                label="Default style"
                value=""
                hint="Hint text"
              ></v-textarea
            ></v-col>

            <v-col cols="12"
              ><v-color-picker hide-canvas v-model="color" flat></v-color-picker
            ></v-col>
          </v-row>

          <v-btn color="primary" @click="createProject"> Create </v-btn>
          <v-btn text @click="dialog = false"> Cancel </v-btn>
        </v-form>
      </v-container>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    name: "",
    color: "",
    desc: "",
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
        desc: this.desc,
        space: this.$route.params.id,
      });
    },
  },
};
</script>
<style lang="scss">
@import "../../../sass/_variables.scss";

.file-creation {
  background-color: #fff;
}

.btn-theme-primary{
  background-color: $lantern;
}
</style>