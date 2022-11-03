<template>
  <v-row class="justify-end align-center">
    <v-dialog  v-model="dialog" max-width="600px">
    
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip >
            <template v-slot:activator="{ on: tooltip }">
                <v-btn  depressed tile icon color="secondary" class="ma-2" >
                    <v-icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">mdi-plus</v-icon>
                </v-btn>
            </template>
            <span>+ TEAMS</span>
        </v-tooltip>
      </template>
   
      <v-card>
        <v-card-title>
          <span class="text-h5">New Team</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field v-model='name' label="Team Name*" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-textarea v-model='name' label="Team Description"></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false" >
              Close
          </v-btn>
          <v-btn color="blue darken-1" text v-on="{ ...tooltip}" @click="dialog = false, addTeam(name, description)">
            Save
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    props: ['projectId'],
    data: () => ({
      dialog: false,
      tooltip:false,
      name:'',
      description:'',
      rules: {
                name: [val => (val || '').length > 0 || 'This field is required'],
              },
    }),
    created() {
     
    },
    methods:{
      addTeam(name, description){
        this.$store.dispatch('addTeam', {
            name: name,
            description: description
          })
        .then(() => {
            // this.$store.dispatch("getProjects"),
            this.$store.dispatch("getTeams");
        }).catch((error) => {
            
        })
      },
    }
  }
</script>