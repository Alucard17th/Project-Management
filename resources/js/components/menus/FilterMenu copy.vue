
<template>
  <div>
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-btn color="indigo" dark v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
        <v-btn color="indigo" dark v-bind="attrs" v-on="on" icon>
        <v-icon>mdi-filter-variant</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
            </v-list-item-avatar>
            <v-list-item-content>
                <v-select :items="items" v-model="selectedFilter" label="Add New Filter" dense return-object>
                </v-select>
            </v-list-item-content>

            <v-list-item-action>
                <v-btn color="indigo" dark @click="addFilter" icon>
                <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item>
            <v-list-item-title>
              <ul v-for="filter in filters" :key="filter.name" class="d-flex">
                <li class="d-flex">
                  <v-subheader v-text="filter.name"></v-subheader>
                  <v-select label="Select" hint="Pick your favorite states" persistent-hint>
                  </v-select>
                </li>
              </ul>
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menu = false">
                Cancel
            </v-btn>
            <v-btn color="primary" text @click="menu = false">
                Save
            </v-btn>
        </v-card-actions>

          <!-- <div class="text-center">
              <v-menu v-model="submenu" :close-on-content-click="false" :nudge-width="200" down left>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="indigo" dark  v-bind="attrs" v-on="on" @click="filter">
                    Menu as Popover
                  </v-btn>
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-list-item-avatar>
                        <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John">
                      </v-list-item-avatar>
                      <v-list-item-content>
                        <v-list-item-title>John Leider</v-list-item-title>
                        <v-list-item-subtitle>Founder of Vuetify</v-list-item-subtitle>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-btn :class="fav ? 'red--text' : ''" icon @click="fav = !fav">
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>

                  <v-select :items="items" attach chips label="Chips" multiple></v-select>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="submenu = false">
                      Cancel
                    </v-btn>
                    <v-btn color="primary" text @click="submenu = false">
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-menu>
            </div> -->

      </v-card>
    </v-menu>
    </div>
</template>
<script>
export default {
    data(){
          return { 
            bgc: { backgroundColor: ''},
              hide:[],
              name:{},
              snackbar: false,
              submenu: false,
              snackbartext: '',
              fav: true,
              menu: false,
              message: false,
              hints: true,
              items: ['Status', 'Ending Date', 'Priority', 'Assigned to'],
              value: ['foo', 'bar', 'fizz', 'buzz'],
              stages:[],
              filters:
              [
              ],
              selectedFilter:{}
              }
        },
        created() {
            // axios.get('/projectstages/1')
            // .then(function (response) {
            //  this.stages = response.data[0].stages
            // })
            // .catch(function (error) {
            //   console.log(error);
            // })

            axios.get('/projectstages/1')
              .then(  (response) => {
                this.stages = response.data[0].stages
            })
              .catch()
        },
        computed:{
          // stages: function() {
          //   axios.get('/projectstages/1')
          //   .then(function (response) {
          //    return response.data[0].stages
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   })
          //   .then(function () {
          //     // always executed
          //   });
          // },
        },
         methods:{
            filter(){
              this.$store.dispatch('filterProjects', 'Starting')
            },
            addFilter(){
              console.log(this.selectedFilter)
              this.filters.push({name: this.selectedFilter})
              console.log(this.filters)
            }
          }
}
</script>
    