<template>
    <div>   
      <div class="d-flex">
          <v-card-title>Members</v-card-title>
          <v-card-actions class="mt-0">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-account-plus-outline</v-icon>
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
      
        
        <ConfirmDlg ref="confirm" />

    </div>
</template>

<script>
 export default {
  components: {
      ConfirmDlg: () => import("./confirmationDialog"),
    },
  props:['members', 'taskId'],
  data: () => ({
      
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
