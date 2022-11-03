<template>
  <div>
    <div class="d-flex">
      <v-card-title>Subtasks</v-card-title>
      <v-card-actions class="mt-0">
        <v-btn @click="addSubtaskFocus" icon>
          <v-icon small>mdi-plus-circle-outline</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon small>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon small>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-card-actions>
    </div>
    <div v-for="subtask in subtasks" :key="subtask.id">
      <v-text-field
        color="primary"
        v-model="subtask.name"
        @keypress.enter="show"
        class="ma-0 pa-0"
      >
        <v-icon color="green" v-if="subtask.task_done"
          >mdi-check-circle-outline</v-icon
        >
        <v-icon v-else>mdi-circle-outline</v-icon>
        <template v-slot:prepend>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                tile
                icon
                color="secondary"
                class="ma-0"
                @click="markSubtaskAsDone(subtask.task_done, subtask.id)"
              >
                <v-icon
                  color="primary"
                  v-if="subtask.task_done"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-checkbox-marked-outline
                </v-icon>
                <v-icon color="primary" v-else>mdi-checkbox-blank-outline</v-icon>
              </v-btn>
            </template>
            <span>Mark as done</span>
          </v-tooltip>
        </template>

        <template v-slot:append>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                tile
                icon
                color="secondary"
                class="ma-0"
                @click="editSubtask(subtask.name, subtask.id)"
              >
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  mdi-circle-edit-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Edit Subtask</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                tile
                icon
                color="secondary"
                class="ma-0"
                @click="delRecord(subtask.id)"
              >
                <v-icon color="primary" dark v-bind="attrs" v-on="on">
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
            <span>Delete Task</span>
          </v-tooltip>
        </template>
      </v-text-field>
    </div>

    <v-text-field
      ref="newtask"
      color="primary"
      label="+ Add New Subtask..."
      v-model="newSubTask"
      @keypress.enter="addSubtask"
      class="ma-0 pa-0"
    ></v-text-field>
    <ConfirmDlg ref="confirm" />
  </div>
</template>

<script>
export default {
  components: {
    ConfirmDlg: () => import("./confirmationDialog"),
  },
  props: ["subtasks", "taskId"],
  data: () => ({
    newSubTask: "",
  }),
  methods: {
    addSubtaskFocus() {
      this.$refs.newtask.focus();
    },
    addSubtask() {
      this.$store
        .dispatch("addSubtask", {
          name: this.newSubTask,
          task: this.taskId,
        })
        .then(() => {
          // this.$store.dispatch("getProjects"),
          console.log("added subtask yes");
          this.subtasks.push({
            name: this.newSubTask,
          });
          this.newSubTask = "";
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Added",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Not Added",
          });
        });
    },
    markSubtaskAsDone(done, id) {
      if (!done) {
        done = 1;
      } else {
        done = 0;
      }

      console.log(this.subtasks.find((x) => x.id === id).done);
      this.$store
        .dispatch("markSubtaskAsDone", {
          id: id,
          done: done,
        })
        .then(() => {
          this.subtasks.find((x) => x.id === id).task_done =
            !this.subtasks.find((x) => x.id === id).task_done;
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Edited",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Not Edited",
          });
        });
    },
    editSubtask(name, id) {
      console.log("Task Name : " + name + " - Task ID : " + id);
      this.$store
        .dispatch("editSubtask", {
          id: id,
          name: name,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            this.$store.dispatch("setSnackBar", {
              showing: true,
              text: "Subtask Edited",
            });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Not Edited",
          });
        });
    },
    removeSubtask(id) {
      console.log("DELETE CHECKLIST");
      this.$store
        .dispatch("deleteSubtask", {
          id: id,
        })
        .then(() => {
          let subTaskIndex;
          this.subtasks.forEach(function (subtask, i) {
            if (subtask.id == id) {
              subTaskIndex = i;
            }
          });
          this.subtasks.splice(subTaskIndex, 1);

          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Deleted",
          });
        })
        .catch((error) => {
          console.log(error);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Subtask Not Deleted",
          });
        });
    },
    async delRecord(id) {
      if (
        await this.$refs.confirm.open(
          "Confirm",
          "Are you sure you want to delete this Subtask?"
        )
      ) {
        this.removeSubtask(id);
      }
    },
    deleteRecord() {
      console.log("Record deleted.");
    },
  },
};
</script>
