<template>
  <v-container>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-row>
        <v-col cols="2">
          <input
            :v-model="currentUser.avatar"
            ref="uploader"
            id="fileUpload"
            class="d-none"
            type="file"
            accept="image/*"
            @change="upload_avatar"
          />
          <v-avatar
            ><v-img
              :src="get_avatar(currentUser.avatar)"
              @click="chooseFiles()"
            ></v-img
          ></v-avatar>
        </v-col>
        <v-col cols="10">
          <v-text-field
            v-model="currentUser.name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-text-field
        v-model="currentUser.email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        autocomplete="current-password"
        :value="userPassword"
        label="Enter password"
        hint="Your password passed! Password rules are not meant to be broken!"
        :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="() => (value = !value)"
        :type="value ? 'password' : 'text'"
        :rules="[rules.password]"
        @input="(_) => (userPassword = _)"
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[(v) => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Validate
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

      <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn> -->

      <v-btn color="succes" @click="updateUser"> Update </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 50) || "Name must be less than 50 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    checkbox: false,
    userPassword: "",
    valid: true,
    value: true,
    rules: {
      required: (value) => !!value || "Required.",
      password: (value) => {
        const pattern =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        return (
          pattern.test(value) ||
          "Min. 8 characters with at least one capital letter, a number and a special character."
        );
      },
    },
  }),
  computed: {
    currentUser: function () {
      return this.$store.getters.getCurrentUser;
    },
  },
  mounted() {
    this.$store.dispatch("getCurrentUser");
    this.name = this.currentUser.name;
    this.email = this.currentUser.email;
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    chooseFiles() {
      document.getElementById("fileUpload").click();
    },
    updateUser() {
      this.$store.dispatch("updateCurrentUser", {
        id: this.currentUser.id,
        name: this.currentUser.name,
        email: this.currentUser.email,
        password: this.currentUser.password,
        avatar: this.currentUser.avatar,
      });
    },
    upload_avatar(e) {
      let file = e.target.files[0];
      let reader = new FileReader();
      if (file["size"] < 2111775) {
        reader.onloadend = (file) => {
          //console.log('RESULT', reader.result)
          this.currentUser.avatar = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert("File size can not be bigger than 2 MB");
      }
    },
    get_avatar(avatar) {
      let photo = "images/profile/" + avatar;
      return photo;
    },
  },
};
</script>