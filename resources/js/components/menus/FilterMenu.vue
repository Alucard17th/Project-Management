
<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on" icon>
          <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-container>
        <v-row align="center">
          <v-col cols="6" sm="6">
            <v-subheader>Statu</v-subheader>
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              v-model="stageFilterName"
              label="Select"
              hint="Pick your favorite states"
              :items="stagesNames"
              item-text="name"
              persistent-hint
              @input="getFilter"
              multiple
            >
            </v-select>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="6" sm="6">
            <v-subheader>Ending Date</v-subheader>
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              v-model="dateFilterName"
              label="Select"
              hint="Pick your favorite states"
              :items="stagesNames"
              item-text="name"
              persistent-hint
              @input="getFilter"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="6" sm="6">
            <v-subheader>Priority</v-subheader>
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              v-model="priorityFilterName"
              label="Select"
              hint="Pick your favorite states"
              :items="stagesNames"
              item-text="name"
              persistent-hint
              @input="getFilter"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="6" sm="6">
            <v-subheader>Assigned To</v-subheader>
          </v-col>
          <v-col cols="6" sm="6">
            <v-select
              v-model="assignFilterName"
              label="Select"
              hint="Pick your favorite states"
              :items="stagesNames"
              item-text="name"
              persistent-hint
              @input="getFilter"
            >
            </v-select>
          </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="menu = false"> Cancel </v-btn>
          <v-btn color="primary" text @click="menu = false"> Save </v-btn>
        </v-card-actions>
             
        </v-container>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bgc: { backgroundColor: "" },
      hide: [],
      name: {},
      snackbar: false,
      submenu: false,
      snackbartext: "",
      fav: true,
      menu: false,
      message: false,
      hints: true,
      items: ["Status", "Ending Date", "Priority", "Assigned to"],
      value: ["foo", "bar", "fizz", "buzz"],
      stages: [],
      stagesNames: [],
      stageFilterName: null,
      oldStageFilterName: null,
      dateFilterName: "",
      priorityFilterName: "",
      assignFilterName: "",
      filters: [
        { name: "Status" },
        { name: "Ending Date" },
        { name: "Priotity" },
        { name: "Assigned To" },
      ],
      selectedFilter: {},
    };
  },
  created() {
    axios
      .get("/projectstages/1")
      .then((response) => {
        this.stages = response.data[0].stages;
        console.log(this.stages);
        this.stages.forEach((element) =>
          this.stagesNames.push({ name: element.name })
        );
      })
      .catch();
  },
  computed: {},
  methods: {
    filter() {
      this.$store.dispatch("filterProjects", "Starting");
    },
    addFilter() {
      this.filters.push({ name: this.selectedFilter });
    },
    getFilter() {
      if(this.stageFilterName == '' && this.oldStageFilterName){
        this.$store.commit("SET_LIST_SEARCH", this.stageFilterName);
        this.$store.dispatch("filterProjects", {filter : this.stageFilterName,checker: false});  
      }else{
        this.$store.commit("SET_LIST_SEARCH", this.stageFilterName);
        this.$store.dispatch("filterProjects", {filter : this.stageFilterName,checker: true});     
      }

      this.oldStageFilterName = this.stageFilterName
      
      // this.$emit('filetProject', )
    },
  },
};
</script>
    