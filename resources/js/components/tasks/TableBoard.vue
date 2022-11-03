<template>
  <div>
    <div class="d-flex justify-space-between">
      <h1>{{ projectData.name }}</h1>
      <add-stage
        :projectId="projectData.id"
        class="d-flex flex-row-reverse"
      ></add-stage>
      <filter-t></filter-t>
    </div>

    <!-- <v-data-table
      v-for="stage in project.stages"
      :key="stage.id"
      :headers="headers"
      :items="stage.task"
      :items-per-page="5"
      class="elevation-5 my-3"
      dense
      id="table-data-board"
    >
      <template v-slot:header>
        <thead>
          <tr>
            <th>
              <span>{{ stage.name }}</span>
              <v-btn
                class="mx-1"
                fab
                x-small
                width="20px"
                height="20px"
                color="#49d9a0"
                @click="toogleAddTaskField(stage.id)"
                ><v-icon color="white">mdi-plus</v-icon></v-btn
              >
              <v-text-field v-show="showAddTaskField == stage.id" v-on:keyup.enter="addTask(stage.id, $event.target)" label="+ Add New Task"></v-text-field>
            </th>
          </tr>
        </thead>
      </template>

      <template v-slot:[`item.description`]="{ item }">
        <span>{{showOnly30Char(item.description)}}</span>
      </template>

       <template v-slot:[`item.duration`]="{ item }">
        <span>{{addDaysString(item.duration)}}</span>
      </template>

      <template v-slot:[`item.percent`]="{ item }">
        <v-progress-linear v-model="item.percent" color="#49d9a0" height="25">
          <template v-slot:default="{ value }">
            <strong>{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </template>

   
      <template v-slot:[`item.created_at`]="{ item }">
        <span>{{extractDate(item.created_at)}}</span>
      </template>

      <template v-slot:[`item.priority`]="{ item }">
        <v-rating v-model="item.priority">
          <template v-slot:item="props">
            <v-icon
              :color="props.isFilled ? genColor(props.index) : 'grey lighten-1'"
              large
              @click="props.click"
              small
            >
              {{
                props.isFilled ? "mdi-star-circle" : "mdi-star-circle-outline"
              }}
            </v-icon>
          </template>
        </v-rating>
      </template>
    </v-data-table> -->

    <v-data-table
      v-for="stage in project.stages"
      :key="stage.id"
      :headers="headers"
      :items="stage.task"
      :loading="loading"
      item-key="id"
      :show-select="false"
      :disable-pagination="true"
      :hide-default-footer="true"
      class="elevation-2 my-3"
      dense
    >
    <template v-slot:header>
        <thead>
          <tr>
            <th>
              <span>{{ stage.name }}</span>
              <v-btn
                class="mx-1"
                fab
                x-small
                width="20px"
                height="20px"
                color="#49d9a0"
                @click="toogleAddTaskField(stage.id)"
                ><v-icon color="white">mdi-plus</v-icon></v-btn
              >
              <v-text-field v-show="showAddTaskField == stage.id" v-on:keyup.enter="addTask(stage.id, $event.target)" label="+ Add New Task"></v-text-field>
            </th>
          </tr>
        </thead>
      </template>
      <template v-slot:body="props">
        <draggable :list="props.items" tag="tbody" group="statuses">
          <tr v-for="(user, index) in props.items" :key="index">
            <td>
              <v-icon small class="page__grab-icon"> mdi-arrow-all </v-icon>
              {{ user.name }}
            </td>
            <td>{{ showOnly30Char(user.description) }}</td>
            <td>{{ addDaysString(user.duration) }}</td>
            <td>
              <v-progress-linear
                v-model="user.percent"
                color="#49d9a0"
                height="15"
              >
                <template v-slot:default="{ value }">
                  <strong>{{ Math.ceil(value) }}%</strong>
                </template>
              </v-progress-linear>
            </td>
            <td>{{ extractDate(user.created_at) }}</td>
            <td>
              <v-rating v-model="user.priority">
                <template v-slot:item="props">
                  <v-icon
                    :color="
                      props.isFilled ? genColor(props.index) : 'grey lighten-1'
                    "
                    large
                    @click="props.click"
                    small
                  >
                    {{
                      props.isFilled
                        ? "mdi-star-circle"
                        : "mdi-star-circle-outline"
                    }}
                  </v-icon>
                </template>
              </v-rating>
            </td>
            <td>
              <v-icon small @click="editUser(user.id)"> mdi-pencil </v-icon>
            </td>
          </tr>
        </draggable>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import draggable from "vuedraggable";
import Vuex from "vuex";
global.v = Vuex;
export default {
  components: {
    AppLayout,
    draggable,
  },
  props: ["id"],
  data() {
    return {
      bgc: {
        backgroundColor: "",
      },
      headers: [
        {
          text: "Task Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Description", value: "description" },
        { text: "Duration", value: "duration" },
        { text: "Progression", value: "percent" },
        { text: "Start Date", value: "created_at" },
        { text: "Priority", value: "priority" },
        // { text: "Done", value: "done" },
        { text: "User", value: "user_id" },
      ],
      tasks: [],
      showAddTaskField: 0,
      colors: ["green", "purple", "orange", "indigo", "red"],
    };
  },
  created() {
    this.$store.dispatch("getProjects", this.$route.params.spaceId);
  },
  computed: {
    project: function () {
      this.$store.dispatch("setCurrentProject", this.$route.params.id);
      return this.$store.getters.getCurrentProject;
    },
    projectData: function () {
      return this.$store.getters.getCurrentProjectData;
    },
  },
  mounted() {
    // this.$store.dispatch("getProjects", this.$route.params.spaceId)
  },
  methods: {
    genColor(i) {
      return this.colors[i];
    },
    extractDate(stringDate) {
      let dateStr = new Date(stringDate);
      // dateStr.toLocaleDateString()
      return dateStr.toLocaleDateString();
    },
    addDaysString(duration) {
      if (duration) {
        return duration + " Days";
      } else {
        return "";
      }
    },
    showOnly30Char(description) {
      let sliceDesc = "";
      if (description != "") {
        sliceDesc = description.split(" ").slice(0, 5).join(" ");
        sliceDesc = sliceDesc + "...";
      } else {
        sliceDesc = "";
      }

      return sliceDesc;
    },
    toogleAddTaskField(index) {
      if (this.showAddTaskField == index) {
        this.showAddTaskField = 0;
      } else {
        this.showAddTaskField = index;
      }
    },
    addTask(stage, name) {
      this.$store
        .dispatch("addTask", {
          name: name.value,
          stage: stage,
        })
        .then(() => {
          this.$store.dispatch("getProjects", this.$route.params.spaceId);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Task Added",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: error,
          });
        });
    },
  },
};
</script>

<style lang="scss">
#table-data-board
  > div.v-data-table__wrapper
  > table
  > thead:nth-child(2)
  > tr
  > th {
  border-left: 2px solid #49d9a0;
}
</style>
