<template>
  <v-row dense>
    <v-dialog v-model="dialog" max-width="700px">
      <template v-slot:activator="{ on, attrs }">
        <v-hover v-slot="{ hover }">
          <v-btn
            class="mx-2"
            icon
            fab
            small
            :class="{ 'show-btns': hover }"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-btn
            class="mx-2"
            icon
            fab
            small
            @click="delRecord(currentProject.id)"
            :class="{ 'show-btns': hover }"
          >
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </v-hover>
      </template>
      <v-card class="pa-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="name"
            :counter="10"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="desc"
            label="Description"
            required
          ></v-text-field>

          <v-select
          v-model="e6"
          :items="states"
          :menu-props="{ maxHeight: '400' }"
          label="Select"
          multiple
          hint="Pick your favorite states"
          persistent-hint
        ></v-select>

          <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            color="success"
            class="mr-4"
            @click="editProject(currentProject)"
          >
            Validate
          </v-btn>

          <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <ConfirmDlg ref="confirm" />
  </v-row>
</template>

<script>
import ConfirmDlg from "@Component/tasks/confirmationDialog.vue";
export default {
  props: ["currentProject"],
  components: {
    ConfirmDlg,
  },
  data() {
    // opt. 1
    return {
      name: this.currentProject.name,
      color: this.currentProject.color,
      image: [],
      avatar: this.currentProject.avatar,
      desc: this.currentProject.description,
      privacy: this.currentProject.privacy,
      rules: [],
      dialog: false,
      e1: 1,
      myColor: "#ffffff",
      items: [
        { name: "Foo", icon: "mdi-home" },
        { name: "Bar", icon: "mdi-domain" },
        { name: "Hoo", icon: "mdi-airballoon-outline" },
        { name: "Coo", icon: "mdi-avatar" },
      ],
      states: [
          'Alabama', 'Alaska', 'American Samoa', 'Arizona',
          'Arkansas', 'California', 'Colorado', 'Connecticut',
          'Delaware', 'District of Columbia', 'Federated States of Micronesia',
          'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
          'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
          'Missouri', 'Montana', 'Nebraska', 'Nevada',
          'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
          'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
          'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
          'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
        ],
    };
  },
  // data: () => ({

  // }),
  methods: {
    validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    handleChange(e) {
      console.log(this.privacy);
    },
    editProject(project) {
      this.$store.dispatch("editProject", {
        id: project.id,
        name: this.name,
        // color: this.color,
        // avatar:
        //   typeof this.avatar.icon === "undefined" ? "empty" : this.avatar.icon,
        description: this.desc,
        // privacy: this.privacy,
      });
     
    },
    deleteProject(project) {
      console.log(project);
      this.$store
        .dispatch("deleteProject", project)
        .then(() => {
          this.$store.dispatch("deleteStoreProject", project);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Project Deleted",
          });
        })
        .catch((error) => {
          //catch the error here
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Project Not Deleted",
          });
        });
    },
    async delRecord(id) {
      if (
        await this.$refs.confirm.open(
          "Confirm",
          "Are you sure you want to delete this Project? <br>(all you data will be lost)"
        )
      ) {
        this.deleteProject(id);
      }
    },
    updateMyColor(event) {
      myColor = event.target.value.trim(); // Formatting example
    },
  },
};
</script>
<style scoped>
.show-btns {
  color: rgb(51, 45, 180) !important;
}
</style>