<template>
  <div>
    {{showUserTasks}}
    <draggable
      v-model="projects.stages"
      group="statuses"
      @start="drag = true"
      @end="drag = false"
      class="row kanbanrow pa-1"
      @change="updateStatus(projects.stages)"
      style="flex-wrap: nowrap"
    >
      <v-col v-for="statu in projects.stages" :key="statu.id">
        <v-card
          min-height="100%"
          class="top-card"
          color="#eeeeee"
          outlined
          width="18vw"
        >
          <v-card-title
            class="py-1 color-l-border text-h6 justify-space-between"
          >
            {{ statu.name }}
            <v-btn class="mx-2" fab x-small color="#49d9a0" @click="toogleAddTaskField(statu.id)"
              ><v-icon dark>mdi-plus</v-icon></v-btn
            >
          </v-card-title>
          <v-text-field v-show="showAddTaskField == statu.id"
            v-on:keyup.enter="addTask(statu.id, $event.target)"
            label="+ Add New Task"
          ></v-text-field>
          <v-divider light></v-divider>

          <draggable
            v-model="statu.task"
            group="tasks"
            @start="drag = true"
            @end="drag = false"
            @change="updateTaskStatus($event, statu.task, statu.id)"
            tag="div"
          >
            <v-col v-for="task in statu.task" :key="task.id" class="pa-1">
              <v-card
                v-if="showUserTasksOnly(task.can_edit)"
                @mouseover="selectItem(task.id)"
                @mouseleave="unSelectItem()"
              >
                <v-card-title class="text-subtitle-2 justify-space-between"
                  >{{ task.name }}
                  <edit-t
                  v-if="task.can_edit"
                    v-bind="attrs"
                    v-on="on"
                    :task="task"
                    @delete-task="deleteTasks"
                    class="no-gutters d-flex flex-row-reverse"
                  ></edit-t>
                </v-card-title>

                <v-card-text v-if="task.description" class="py-0">
                  {{ task.description }}
                </v-card-text>

                <v-rating v-model="priority">
                  <template v-slot:item="props">
                    <v-icon
                      :color="
                        props.isFilled
                          ? genColor(props.index)
                          : 'grey lighten-1'
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

                <v-card-text v-show="task.id === selectedItem">
                  <v-chip class="accent-4 white--text" color="#49d9a0">{{
                    onlyDate(task.start_date)
                  }}</v-chip>

                  <v-chip class="accent-4 white--text" color="#49d9a0"
                    >{{ task.duration }} Days</v-chip
                  >
                </v-card-text>

                <v-card-text v-show="task.id === selectedItem">
                  <v-progress-linear
                    :reverse="$vuetify.rtl"
                    v-model="task.percent"
                    color="#49d9a0"
                    height="15"
                  >
                    <template v-slot:default="{ value }">
                      <strong>{{ Math.ceil(value) }}%</strong>
                    </template>
                  </v-progress-linear>
                </v-card-text>
              </v-card>
            </v-col>
          </draggable>

          <!-- <v-card-actions>
              <v-text-field
                v-on:keyup.enter="addTask(statu.id, $event.target)"
                label="+ Add New Task"
              ></v-text-field>
            </v-card-actions> -->
        </v-card>
      </v-col>
    </draggable>
    <!-- </vue-custom-scrollbar> -->
  </div>
</template>

<script>
import AppLayout from "../../Layouts/AppLayout";
import draggable from "vuedraggable";
import Vuex, { mapGetters } from "vuex";
import vueCustomScrollbar from "vue-custom-scrollbar";
import "vue-custom-scrollbar/dist/vueScrollbar.css";
global.v = Vuex;
export default {
  components: {
    AppLayout,
    draggable,
    vueCustomScrollbar,
  },
  props: ["id"],
  data() {
    return {
      // projects:{},
      bgc: { backgroundColor: "" },
      hide: [],
      name: {},
      fav: true,
      menu: false,
      message: false,
      hints: true,
      items: ["foo", "bar", "fizz", "buzz"],
      value: ["foo", "bar", "fizz", "buzz"],
      filter: [],
      filteringItems: {},
      renderProject: {},
      shown: false,
      settings: {
        suppressScrollY: false,
        suppressScrollX: true,
        wheelPropagation: true,
      },
      settingsB: {
        suppressScrollY: false,
        suppressScrollX: false,
      },
      items: [
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me" },
        { title: "Click Me 2" },
      ],
      colors: ["green", "purple", "orange", "indigo", "red"],
      priority: 3,
      selectedItem: 0,
      showAddTaskField : 0,
    };
  },
  created() {
    this.$store.dispatch("getProjects", this.$route.params.spaceId);
    // this.$store.dispatch("setCurrentProject", this.$route.params.id);
    console.log("KANBAN CREATED");
  },
  mounted() {
    console.log("KANBAN MOUNTED");
  },
  watch: {
    "$route.params.id": function (id) {
      this.$store.dispatch("getProjects", this.$route.params.spaceId);
      this.$store.dispatch("setCurrentProject", id);
    },
  },
  computed: {
    projects: function () {
      this.$store.dispatch("setCurrentProject", this.$route.params.id);
      return this.$store.getters.getCurrentProject;
    },
    projectData: function () {
      return this.$store.getters.getCurrentProjectData;
    },
    projectStagesList: function () {
      return ["Starting", "On going", "Cancelled"];
    },
    showUserTasks: function () {
      return this.$store.getters.userTasksOnlyBool;
    },
  },
  methods: {
    showUserTasksOnly(canEdit){
      if(this.showUserTasks){
        if(canEdit){
          return true
        }
        else{
          return false
        }
      }
      return true
    },
    updateStatus(statu) {
      this.$store
        .dispatch("updateStage", statu)
        .then(() => {
          console.log("updated STATUS yes");
        })
        .catch((error) => {
          console.log("updated STATUS NOOO");
        });
    },
    updateTaskStatus(event, sts, stsId) {
      // MOVING TASK IN THE SAME STATUT
      if (event.moved) {
        this.$store
          .dispatch("editTaskStatu", sts)
          .then(() => {
            console.log("updated Tasks ORDER yes");
          })
          .catch((error) => {
            console.log("updated Tasks ORDER NOOO");
          });
      }

      // MOVING TASK FROM STATUT TO STATUT
      if (event.added) {
        this.$store
          .dispatch("editTaskStage", { tasks: sts, stageID: stsId })
          .then(() => {
            console.log("updated Tasks ORDER yes");
          })
          .catch((error) => {
            console.log("updated Tasks ORDER NOOO");
          });
      }
    },
    filterTasks() {
      this.$store.dispatch("filterProjects", this.filter);
      this.$store.commit("SET_LIST_SEARCH", this.filter);
    },
    sortTasks() {
      this.$store.dispatch("sortTasks");
    },
    scrollHanle(evt) {
      // console.log(evt);
    },
    addStage() {
      this.$store
        .dispatch("addStage", {
          name: name.value,
          stage: stage,
        })
        .then(() => {
          this.$store.dispatch("getProjects"), console.log("added Stage yes");
        })
        .catch((error) => {
          console.log("added Stage NOOO");
        });
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
            text: "Task Not Added",
          });
        });
    },
    onlyDate(thedate) {
      var date = new Date(thedate);
      return date.toISOString().split("T")[0];
    },
    genColor(i) {
      return this.colors[i];
    },
    selectItem(item) {
      this.selectedItem = item;
    },
    unSelectItem(item) {
      this.selectedItem = false;
    },
    deleteTasks(eventData) {
      this.$store.dispatch("getProjects", this.$route.params.spaceId);
    },
    toogleAddTaskField(index) {
      if (this.showAddTaskField == index) {
        this.showAddTaskField = 0;
      } else {
        this.showAddTaskField = index;
      }
    }
  },
};
</script>
<style scoped>
.fill-width {
  /* overflow-x: auto; */
  flex-wrap: nowrap;
}
.scroll-area {
  position: relative;
  margin: auto;
  width: 100%;
  /* height: 87vh; */
}
.scroll-area-second {
  position: relative;
  margin: auto;
  width: 100%;
  /* height: 79vh; */
}
#app
  > div
  > main
  > div
  > div
  > div
  > section
  > div.row.kanbanrow.pa-1
  > div:nth-child(1)
  > div {
  max-height: "";
  /* height: 89vh; */
}
.scroll-area-second > div {
  /* height: 100px; */
}
.color-l-border {
  border: 3px solid #eeeeee;
  border-top-color: #49d9a0;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hidden::-webkit-scrollbar {
  /* display: none; */
}

/* Hide scrollbar for IE, Edge add Firefox */
.scrollbar-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */
}
</style>
