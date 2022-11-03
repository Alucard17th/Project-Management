<template>
    <div>   
      <div class="d-flex">
          <v-card-title>Files</v-card-title>
          <v-card-actions class="mt-0">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item link>
                  <v-list-item-title :loading="isSelecting" @click="onButtonClick">Click Me</v-list-item-title>
                  <input
                  :v-model="image"
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept="image/*"
                  @change="onFileChanged"
                  >
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Click Me</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>Click Me</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-card-actions>
        </div>

        <v-data-table
            :headers="headers"
            :items="files"
            :items-per-page="5"
            class="elevation-1"
        ></v-data-table>
        
        <ConfirmDlg ref="confirm" />

    </div>
</template>

<script>
 export default {
  components: {
      ConfirmDlg: () => import("./confirmationDialog"),
    },
  props:['files', 'taskId'],
  data: () => ({
      newSubTask:'',
      image:{},
      defaultButtonText: '画像をアップロード',
      selectedFile: null,
      isSelecting: false,
      headers: [
          {
            text: 'Name',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Edited', value: 'edited' },
          { text: 'By', value: 'by' },
          { text: 'Image', value: 'image' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            edited: 159,
            by: 6.0,
          },
          {
            name: 'Ice cream sandwich',
            edited: 237,
            by: 9.0,
          },
          {
            name: 'Eclair',
            edited: 262,
            by: 16.0,
          }]
    }),
  computed:{
    buttonText() {
    return this.selectedFile ? this.selectedFile.name : this.defaultButtonText
    }
  },
  methods:{
    onButtonClick() {
      this.isSelecting = true
      window.addEventListener('focus', () => {
        this.isSelecting = false
      }, { once: true })

      this.$refs.uploader.click()
    },
    onFileChanged(e) {
      this.selectedFile = e.target.files[0]
      // do something
      console.log(this.selectedFile)

      const formData = new FormData();
      formData.append('image', this.selectedFile)

      this.$store.dispatch('addFile', formData)
        .then(() => {
            this.$store.dispatch("getProjects"),
            console.log('added FILES yes')
            
        }).catch((error) => {
            //catch the error here
            console.log('added FILES NOOO')
        })
    },
    addSubtask() {
      this.$store.dispatch('addSubtask', {
          name: this.newSubTask,
          task: this.taskId
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
    editFile(name,id){
      console.log('Task Name : '+name+' - Task ID : '+id)
       this.$store.dispatch('editFile', {
          id: id,
          name: name,
        })
      .then(() => {
          this.$store.dispatch("getProjects"),
          console.log('Edited File yes')
      }).catch((error) => {
          console.log('Edited File NOOO')
      })
    },
    removeFile(id) {
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
    }
  }

 }
</script>
