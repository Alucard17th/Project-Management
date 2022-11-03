<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="85%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon fab small v-bind="attrs" v-on="on">
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
        </v-hover>
      </template>

      <v-card>
        <v-card-title>
          <v-text-field
            color="primary"
            v-model="task.name"
            @keypress.enter="show"
            class=""
          ></v-text-field>
        </v-card-title>

        <v-card-text>
          <v-textarea
            name="input-7-1"
            label="Label"
            auto-grow
            v-model="taskDesc"
          >
          </v-textarea>

          <v-divider color="#49d9a0"></v-divider>

          <!-- Subtasks -->
          <subtasks
            :subtasks="task.subtask"
            :taskId="task.id"
            class="pa-10"
          ></subtasks>

          <v-divider color="#49d9a0"></v-divider>

          <!-- Checklists  -->
          <checklist
            :checklists="task.checklist"
            :taskId="task.id"
            class="pa-10"
          ></checklist>

          <v-divider color="#49d9a0"></v-divider>

          <!-- Files -->
          <task-files :files="task.file"></task-files>

          <v-divider color="#49d9a0"></v-divider>

          <!-- Members -->
          <task-members :members="task.member"></task-members>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="editTask"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <ConfirmDlg ref="confirm" />
  </v-row>
</template>

<script>
import ConfirmDlg from "@Component/tasks/confirmationDialog.vue";
export default {
  components: {
    ConfirmDlg,
  },
  props: ["task"],
  data() {
    return {
      dialog: false,
      newSubTask: "",
      newCheckList: "",
      taskDesc: this.task.description,
    };
  },
  methods: {
    addSubtaskFocus() {
      this.$refs.newtask.focus();
    },
    editTask() {
      this.$store
        .dispatch("editTask", {
          task: this.task.id,
          description: this.taskDesc,
        })
        .then(() => {
          this.$store.dispatch("getProjects", this.$route.params.spaceId);
          // this.$store.dispatch("getProjects")
          // this.task.subtask.push({
          //   name: this.newSubTask,
          // });
          // this.newSubTask = "";
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Task Edited",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Task Not Edited",
          });
        });
      this.dialog = false;
    },
    addSubtask() {
      this.$store
        .dispatch("addSubtask", {
          name: this.newSubTask,
          task: this.task.id,
        })
        .then(() => {
          // this.$store.dispatch("getProjects"), console.log("added subtask yes");
          this.$store.dispatch("getProjects", this.$route.params.spaceId);
          // this.task.subtask.push({
          //   name: this.newSubTask,
          // });
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
        done = null;
      }
      console.log(done);
      this.$store
        .dispatch("markSubtaskAsDone", {
          id: id,
          done: done,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            console.log("Edited subtask yes");
          // this.task.subtask.push({
          //   done: this.newSubTask,
          // })
          // this.newSubTask = '';
        })
        .catch((error) => {
          console.log("Edited subtask NOOO");
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
            console.log("Edited subtask yes");
        })
        .catch((error) => {
          console.log("Edited subtask NOOO");
        });
    },
    removeSubtask(id) {
      console.log("DELETE CHECKLIST");
      this.$store
        .dispatch("deleteSubtask", {
          id: id,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            console.log("Edited subtask yes");
        })
        .catch((error) => {
          console.log("Edited subtask NOOO");
        });
    },
    // removeSubtask(index) {
    //   this.task.subtask.splice(index,1)
    // },
    addChecklistFocus() {
      this.$refs.checklist.focus();
    },
    addChecklist() {
      // this.$store
      //   .dispatch("addChecklist", {
      //     name: this.newCheckList,
      //     task: this.task.id,
      //   })
      //   .then(() => {
      //     this.$store.dispatch("getProjects"),
      //       console.log("added Checklist yes");
      //     this.task.checklist.push({
      //       name: this.newCheckList,
      //     });
      //     this.newCheckList = "";
      //     this.$store.dispatch("setSnackBar", {
      //       showing : true,
      //       text : 'Checklist item Added'
      //     })
      //   })
      //   .catch((error) => {
      //     this.$store.dispatch("setSnackBar", {
      //       showing : true,
      //       text : 'Checklist item Not Added'
      //     })
      //   });
    },
    markChecklistAsDone(done, id) {
      console.log("AS DONE : " + done);
      if (!done) {
        done = 1;
      } else {
        done = 0;
      }
      console.log(done);
      this.$store
        .dispatch("markChecklistAsDone", {
          id: id,
          done: done,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            console.log("DONE checklist yes");
        })
        .catch((error) => {
          console.log("DONE checklist NOOO");
        });
    },
    editChecklist() {
      this.$store
        .dispatch("editChecklist", {
          id: id,
          name: name,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            console.log("Edited CHECKLIST yes");
        })
        .catch((error) => {
          console.log("Edited CHECKLIST NOOO");
        });
    },
    removeChecklist() {
      console.log("DELETE CHECKLIST");
      this.$store
        .dispatch("deleteChecklist", {
          id: id,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            console.log("DELETED checklist yes");
        })
        .catch((error) => {
          console.log("DELETED checklist NOOO");
        });
    },
    deleteTask(task) {
      console.log(task);
      this.$store
        .dispatch("deleteTask", task)
        .then(() => {
          // this.$emit('delete-task', task)
          this.$store.dispatch("deleteStoreTask", task);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Task Deleted",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Task Not Deleted",
          });
          console.log(error);
        });
    },
    async delRecord(id) {
      if (
        await this.$refs.confirm.open(
          "Confirm",
          "Are you sure you want to delete this Task? <br>(all you data will be lost)"
        )
      ) {
        this.deleteTask(id);
      }
    },
  },
};
</script>
<style scoped>
.v-icon:hover {
  color: var(--v-primary-base);
}
.snackbar-wrap > .v-sheet {
  padding: 3% !important;
}
</style>