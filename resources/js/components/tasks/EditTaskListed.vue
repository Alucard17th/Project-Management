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
              <v-text-field color="primary" v-model="subtask.name" @keypress.enter="show" class="ma-0 pa-0"> 
                <template v-slot:prepend>
                  <v-icon color="green" v-if="subtask.task_done === '1'">mdi-check-circle-outline</v-icon>
                  <v-icon v-else>mdi-circle-outline</v-icon>
                </template>
                <template v-slot:append>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="markSubtaskAsDone(subtask.task_done,subtask.id)">
                        <v-icon color="primary" v-if="subtask.task_done === '1'" dark v-bind="attrs" v-on="on">
                          mdi-check-circle-outline
                        </v-icon>
                         <v-icon v-else>mdi-circle-outline</v-icon>

                      </v-btn>
                    </template>
                    <span>Mark as done</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="editSubtask(subtask.name,subtask.id)">
                        <v-icon color="primary" dark v-bind="attrs" v-on="on">
                          mdi-circle-edit-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Subtask</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="removeSubtask(subtask.id)">
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

          <v-text-field ref="newtask" color="primary" label="+ Add New Subtask..." 
          v-model="newSubTask" @keypress.enter="addSubtask" class="ma-0 pa-0"></v-text-field>
        
          <v-divider my-1></v-divider>
         
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
            <div v-for="checklist in task.checklist" :key="checklist.id">
              <v-text-field color="primary" v-model="checklist.name" @keypress.enter="show" class="ma-0 pa-0">
                <template v-slot:append>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="markChecklistAsDone(checklist.done,checklist.id)">
                        <v-icon color="primary" v-if="checklist.done" dark v-bind="attrs" v-on="on">
                          mdi-check-circle-outline
                        </v-icon>
                         <v-icon v-else>mdi-circle-outline</v-icon>
                      </v-btn>
                    </template>
                    <span>Mark as done</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="editChecklist(checklist.name,checklist.id)">
                        <v-icon color="primary" dark v-bind="attrs" v-on="on">
                          mdi-circle-edit-outline
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>Edit Subtask</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn depressed tile icon color="secondary" class="ma-0" @click="removeChecklist(checklist.id)">
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
            <v-text-field ref="checklist" color="primary" label="+ Add New Checklist item.!.." 
            v-model="newCheckList" @keypress.enter="addChecklist" class="ma-0 pa-0"></v-text-field>
       

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
          // this.snackbar = true
          // this.snackbartext = 'Task Added'
      }).catch((error) => {
          // this.snackbar = true
          // this.snackbartext = 'Task Not Added'
          console.log('added subtask NOOO')
      })
    },
    markSubtaskAsDone(done, id){
      if(!done){
        done = 1
      }else{
        done = null
      }
      console.log(done)
      this.$store.dispatch('markSubtaskAsDone', {
          id: id,
          done: done,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('Edited subtask yes')
          // this.task.subtask.push({
          //   done: this.newSubTask,
          // })
          // this.newSubTask = '';
      }).catch((error) => {
          console.log('Edited subtask NOOO')
      })
    },
    editSubtask(name,id){
      console.log('Task Name : '+name+' - Task ID : '+id)
       this.$store.dispatch('editSubtask', {
          id: id,
          name: name,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('Edited subtask yes')
      }).catch((error) => {
          console.log('Edited subtask NOOO')
      })
    },
    removeSubtask(id) {
      console.log('DELETE CHECKLIST')
      this.$store.dispatch('deleteSubtask', {
          id: id,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('Edited subtask yes')
      }).catch((error) => {
          console.log('Edited subtask NOOO')
      })
    },
    // removeSubtask(index) {
    //   this.task.subtask.splice(index,1)
    // },
    addChecklistFocus(){
      this.$refs.checklist.focus()
    },
    addChecklist() {
      this.$store.dispatch('addChecklist', {
        name: this.newCheckList,
        task: this.task.id
      })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('added Checklist yes')
          this.task.checklist.push({
            name: this.newCheckList,
          })
          this.newCheckList = '';
          // this.snackbar = true
          // this.snackbartext = 'Task Added'
      }).catch((error) => {
          // this.snackbar = true
          // this.snackbartext = 'Task Not Added'
          console.log('added Checklist NOOO')
      })
    },
    markChecklistAsDone(done,id){
      console.log('AS DONE : '+ done)
      if(!done){
        done = 1
      }else{
        done = 0
      }
      console.log(done)
      this.$store.dispatch('markChecklistAsDone', {
          id: id,
          done: done,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('DONE checklist yes')
      }).catch((error) => {
          console.log('DONE checklist NOOO')
      })
    },
    editChecklist(){
      this.$store.dispatch('editChecklist', {
          id: id,
          name: name,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('Edited CHECKLIST yes')
      }).catch((error) => {
          console.log('Edited CHECKLIST NOOO')
      })
    },
    removeChecklist() {
      console.log('DELETE CHECKLIST')
      this.$store.dispatch('deleteChecklist', {
          id: id,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('DELETED checklist yes')
      }).catch((error) => {
          console.log('DELETED checklist NOOO')
      })
    },
    show(){
      
    },
    }
  }
</script>
<style scoped>
 .v-icon:hover {
    color: var(--v-primary-base);
  
  }
</style>