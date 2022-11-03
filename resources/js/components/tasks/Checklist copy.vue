<template>
  <div>
    <div class="d-flex">
      <v-card-title>Checklist</v-card-title>
      <v-card-actions class="mt-0">
        <v-btn @click="addChecklistFocus" icon>
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
    <!-- <div v-for="checklist in checklists" :key="checklist.id">
      <v-text-field
        color="primary"
        v-model="checklist.name"
        @keypress.enter="show"
        class="ma-0 pa-0"
      >
        <template v-slot:append>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                tile
                icon
                color="secondary"
                class="ma-0"
                @click="markChecklistAsDone(checklist.done, checklist.id)"
              >
                <v-icon
                  color="primary"
                  v-if="checklist.done"
                  dark
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-check-circle-outline
                </v-icon>
                <v-icon v-else>mdi-circle-outline</v-icon>
              </v-btn>
            </template>
            <span>Mark as done</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                tile
                icon
                color="secondary"
                class="ma-0"
                @click="editChecklist(checklist.name, checklist.id)"
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
                @click="delRecord(checklist.id)"
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
    </div>-->

    <v-text-field
      ref="checklist"
      color="primary"
      label="+ Add New Checklist item.!.."
      v-model="newCheckList"
      @keypress.enter="addChecklist"
      class="ma-0 pa-0" dense
    ></v-text-field> 
    <ConfirmDlg ref="confirm" />

   <v-list dense>
      <!-- <v-subheader>REPORTS</v-subheader> -->
      <v-list-item-group
        color="primary"
        multiple
      >
        <v-list-item
          v-for="(item, i) in checklists"
          :key="i"
        >
          <!-- <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon> -->
          <template v-slot:default="{ active }">
            <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title v-text="item.name"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>

  </div>
</template>

<script>
export default {
  components: {
    ConfirmDlg: () => import("./confirmationDialog"),
  },
  props: ["checklists", "taskId"],
  data: () => ({
    newCheckList: "",
  }),
  methods: {
    addChecklistFocus() {
      this.$refs.checklist.focus();
    },
    addChecklist() {
      this.$store
        .dispatch("addChecklist", {
          name: this.newCheckList,
          task: this.taskId,
        })
        .then(() => {
          this.newCheckList = "";
          this.$store.dispatch("getProjects", this.$route.params.spaceId);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist item Added",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: error,
          });
        });
    },
    markChecklistAsDone(done, id) {
      if (!done) {
        done = 1;
      } else {
        done = 0;
      }

      this.$store
        .dispatch("markChecklistAsDone", {
          id: id,
          done: done,
        })
        .then(() => {
          this.checklists.find((x) => x.id === id).done = !this.checklists.find(
            (x) => x.id === id
          ).done;
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist Item Edited",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist Item Not Edited",
          });
        });
    },
    editChecklist(name, id) {
      this.$store
        .dispatch("editChecklist", {
          id: id,
          name: name,
        })
        .then(() => {
          this.$store.dispatch("getProjects"),
            this.$store.dispatch("setSnackBar", {
              showing: true,
              text: "Checklist Item Edited",
            });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist Not Item Edited",
          });
        });
    },
    removeChecklist(id) {
      this.$store
        .dispatch("deleteChecklist", {
          id: id,
        })
        .then(() => {
          let chkListIndex;
          this.checklists.forEach(function (chkitem, i) {
            if (chkitem.id == id) {
              chkListIndex = i;
            }
          });
          this.checklists.splice(chkListIndex, 1);
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist Item Deleted",
          });
        })
        .catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing: true,
            text: "Checklist Item Not Deleted",
          });
        });
    },
    async delRecord(id) {
      if (
        await this.$refs.confirm.open(
          "Confirm",
          "Are you sure you want to delete this Checklist Item?"
        )
      ) {
        this.removeChecklist(id);
      }
    },
    deleteRecord() {
      console.log("Record deleted.");
    },
  },
};
</script>
