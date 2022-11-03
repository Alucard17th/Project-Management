<template>
  <div>
    <h2 class="text-center mb-3">Login</h2>
    <v-card
      class="d-flex justify-center align-center mx-auto pa-10"
      max-width="500"
    >
      <v-row>
        <v-col class="text-center">
          <span
            class="v-messages them--dark error--text subtitle-1"
            v-if="errors"
          >
            {{ errors }}
          </span>
          <v-form>
            <v-text-field
              v-model="form.email"
              label="E-mail"
              :rules="emailRules"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Password"
              @click:append="show = !show"
            ></v-text-field>

            <v-btn
              color="blue"
              class="mt-5"
              :disabled="form.processing || !form.email || !form.password"
              @click.prevent="login"
            >
              Login
            </v-btn>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
export default {
  components: { AppLayout },
  data() {
    return {
      errors: "",
      form: this.$inertia.form({
        email: "",
        password: "",
      }),
      show: false,
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "Password is required"],
    };
  },
  methods: {
    login() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        // Login...
        axios
          .post("/api/loginacc", this.form)
          .then((response) => {
            if (response.data.error) {
              console.log(response.data.error);
            } else {
              console.log("success");
              // this.$router.push("/dashboard")
              window.location.href = "/#/dashboard";
            }
          })
          .catch((error) => {
            this.errors = error.response.data.errors.errorMessage[0];
            console.log(error.response.data.errors.errorMessage[0]);
          });
      });
    },
  },
};
</script>
