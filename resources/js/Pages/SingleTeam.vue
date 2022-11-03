<template>
  <div id="single_team">
    <h1>Team</h1>
    <v-row dense align="stretch">
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="allTeamMembers"
          :items-per-page="5"
          class="elevation-1"
        ></v-data-table
      ></v-col>
    </v-row>
  </div>
</template>

<script>
import ConfirmDlg from "@Component/tasks/confirmationDialog.vue";
export default {
  components: {
    ConfirmDlg,
  },
  data() {
    return {
      name: "",
      seeTeam: 0,
      headers: [
        { text: "Member Name", value: "name" },
        { text: "Email", value: "email" },
        { text: "Projects", value: "percent" },
        { text: "Actions", value: "actions", sortable:false },
      ],
    };
  },
  created() {
    this.$store.dispatch("getTeamMembers", this.$route.params.id);
  },
  computed: {
    allTeamMembers() {
      return this.$store.getters.getTeamMembers;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss">
</style>
