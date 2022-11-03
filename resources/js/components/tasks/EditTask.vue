<template>
  <v-row>
    <v-dialog v-model="dialog" max-width="600px">

      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on">
          Open Dialog
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">{{task.name}}</span>
        </v-card-title>

        <v-card-text>
          <v-textarea name="input-7-1" label="Label" auto-grow :value='task.description'>
          </v-textarea>
          <v-card class="pa-2">
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

            <div v-for="subtask in task.subtask" :key="subtask.id">
              <v-text-field color="primary" v-model="subtask.name" @keypress.enter="show">
                <template v-slot:append>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </v-btn>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-circle-edit-outline</v-icon>
                  </v-btn>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <v-text-field ref="newtask" color="primary" label="+ Add New Subtask..." v-model="newSubTask" @keypress.enter="addSubtask"></v-text-field>
          </v-card>
        
          <v-divider my-1></v-divider>
      
          <v-card class="pa-2">
            <div class="d-flex">
              <v-card-title>Checklist</v-card-title>
              <v-card-actions class="mt-1">
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
            <div v-for="checklist in task.checklist" :key="checklist.id">
              <v-text-field color="primary" v-model="checklist.name" @keypress.enter="show">
                <template v-slot:append>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-check-circle-outline</v-icon>
                  </v-btn>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-circle-edit-outline</v-icon>
                  </v-btn>
                  <v-btn depressed tile icon color="secondary" class="ma-0" @click="show">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <v-text-field ref="checklist" color="primary" label="+ Add New Checklist item..." v-model="newCheckList" @keypress.enter="addChecklist"></v-text-field>
          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>

    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['task'],
    data: () => ({
      dialog: false,
      newSubTask:'',
      newCheckList:''
    }),
    methods: {
    addSubtaskFocus(){
      this.$refs.newtask.focus()
    },
    addSubtask() {
      this.$store.dispatch('addSubtask', {
          name: this.newSubTask,
          task: this.task.id
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('added subtask yes')
          this.task.subtask.push({
            name: this.newSubTask,
          })
          this.newSubTask = '';
          this.$store.dispatch("setSnackBar", {
            showing : true,
            text : 'Subtask Added'
          })
      }).catch((error) => {
          this.$store.dispatch("setSnackBar", {
            showing : true,
            text : 'Subtask Not Added'
          })
      })
    },
    removeSubtask(index) {
      this.task.subtask.splice(index,1)
    },
    addChecklistFocus(){
      this.$refs.checklist.focus()
    },
    addChecklist() {
      console.log("this.newCheckList,this.task.id ")
      // this.$store.dispatch('addChecklist', {
      //   name: this.newCheckList,
      //   task: this.task.id
      // })
      // .then(() => {
      //     this.$store.dispatch("getProjects"),
      //     console.log('added Checklist yes')
      //     this.task.checklist.push({
      //       name: this.newCheckList,
      //     })
      //     this.newCheckList = '';
      //     // this.snackbar = true
      //     // this.snackbartext = 'Task Added'
      // }).catch((error) => {
      //     // this.snackbar = true
      //     // this.snackbartext = 'Task Not Added'
      //     console.log('added Checklist NOOO')
      // })
    },
    }
  }
</script>
<style scoped>
 .v-icon:hover {
    color: var(--v-primary-base);
  
  }
</style>